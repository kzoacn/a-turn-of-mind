extends SceneTree

var failures: Array = []
var assertions: int = 0

func check(condition: bool, message: String) -> void:
	assertions += 1
	if not condition:
		failures.append(message)
		push_error(message)

func _initialize() -> void:
	var levels: Array = LevelCatalog.load_levels()
	check(levels.size() == 8, "Eight authored levels are included")
	for level in levels:
		var initial: Array = level["initial"]
		var target: Array = level["target"]
		var cycles: Dictionary = level["cycles"]
		var id: String = level["id"]
		var source_sorted: Array = initial.duplicate()
		var target_sorted: Array = target.duplicate()
		source_sorted.sort()
		target_sorted.sort()
		check(source_sorted == target_sorted, id + ": symbol multiset is preserved")
		check(initial != target, id + ": starts unsolved")
		for move in Permutation.available_moves(cycles):
			var turned: Array = Permutation.apply_move(initial, cycles, move)
			check(Permutation.apply_move(turned, cycles, Permutation.inverse(move)) == initial, id + ": inverse restores state")
			var four: Array = initial.duplicate()
			for i in range(4):
				four = Permutation.apply_move(four, cycles, move)
			check(four == initial, id + ": four quarter-turns restore state")
			var cycle: Array = cycles[move.left(1)]
			for i in range(initial.size()):
				if not cycle.has(i):
					check(turned[i] == initial[i], id + ": slots outside ring stay fixed")
		var solution: Dictionary = Permutation.solve(initial, target, cycles)
		check(solution["found"], id + ": reachable target")
		check(solution["moves"].size() == int(level["shortest"]), id + ": GDScript agrees with independent Python BFS")
		var game := GameSession.new()
		game.setup(level)
		for move in level["certificate"]:
			check(game.move(move), id + ": certificate move accepted")
		check(game.solved(), id + ": authored certificate solves through session API")
		check(not game.move("A+"), id + ": no accidental move after completion")
		for i in range(level["certificate"].size()):
			game.undo()
		check(game.state == initial and game.history.is_empty(), id + ": unlimited undo to initial state")
		for i in range(level["certificate"].size()):
			game.redo()
		check(game.solved(), id + ": redo restores solution")
		game.restart()
		check(game.state == initial and game.redo_moves.is_empty(), id + ": restart clears history")
		game.setup(level, level["certificate"])
		check(game.solved(), id + ": saved move replay restores exact progress")
	var rings: Dictionary = levels[4]["cycles"]
	var identity: Array = ["a", "b", "c", "d", "e", "f", "g"]
	var state: Array = identity.duplicate()
	for move in ["A+", "B+", "A-", "B-"]:
		state = Permutation.apply_move(state, rings, move)
	check(state == ["a", "b", "g", "c", "e", "f", "d"], "Advertised four-move trick changes only three slots")
	var ab: Array = Permutation.apply_move(Permutation.apply_move(identity, rings, "A+"), rings, "B+")
	var ba: Array = Permutation.apply_move(Permutation.apply_move(identity, rings, "B+"), rings, "A+")
	check(ab != ba, "Overlapping rings genuinely do not commute")
	var impossible: Dictionary = Permutation.solve(["a", "b", "a", "b"], ["a", "a", "b", "b"], {"A": [0, 1, 2, 3]})
	check(not impossible["found"] and impossible["exhausted"], "Unreachable pattern is distinguished from a solved pattern")
	var bounded: Dictionary = Permutation.solve(levels[7]["initial"], levels[7]["target"], rings, 1)
	check(not bounded["found"] and not bounded["exhausted"], "Budget exhaustion is not proof of impossibility")
	var repeated := GameSession.new()
	repeated.setup(levels[6])
	repeated.state = levels[6]["target"].duplicate()
	var first: Variant = repeated.state[0]
	repeated.state[0] = repeated.state[2]
	repeated.state[2] = first
	check(repeated.solved(), "Equal symbols do not carry hidden identity constraints")
	test_saves(levels)
	print("LOGIC TESTS: %d assertions, %d failures" % [assertions, failures.size()])
	quit(0 if failures.is_empty() else 1)

func test_saves(levels: Array) -> void:
	var path: String = "user://logic-test-progress.json"
	var store := ProgressStore.new()
	store.path = path
	store.data["current"] = 4
	store.data["sessions"][levels[4]["id"]] = levels[4]["certificate"]
	store.record(levels[4]["id"], "moves", "A+")
	check(store.save(), "Progress can be written atomically")
	store.data["sound"] = false
	check(store.save(), "Progress can replace an existing save")
	var loaded := ProgressStore.new()
	loaded.path = path
	loaded.load_progress(levels)
	check(loaded.data["current"] == 4 and not loaded.data["sound"], "Selected level and preferences survive reload")
	check(loaded.data["sessions"][levels[4]["id"]] == levels[4]["certificate"], "Move history survives reload")
	var malformed: FileAccess = FileAccess.open(path, FileAccess.WRITE)
	malformed.store_string('{"version":1,"current":"bad","sessions":{"first_click":["A+",123]},"stats":{"first_click":{"moves":"bad"}},"events":[1,null,{"level":"x","action":"test"}]}')
	malformed.close()
	loaded.load_progress(levels)
	check(loaded.data["current"] == 0, "Malformed current level is ignored")
	check(loaded.data["sessions"]["first_click"] == ["A+"], "Malformed history stops at last valid move")
	check(loaded.data["stats"]["first_click"]["moves"] == 0, "Malformed metrics cannot crash play")
	var corrupt: FileAccess = FileAccess.open(path, FileAccess.WRITE)
	corrupt.store_string('not json')
	corrupt.close()
	loaded.load_progress(levels)
	check(loaded.data["sessions"].is_empty(), "Corrupt save recovers to a playable default")
	DirAccess.remove_absolute(path)
