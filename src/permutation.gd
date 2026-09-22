class_name Permutation
extends RefCounted
## Pure state transformations. Equal symbols are intentionally indistinguishable.

static func apply_move(state: Array, cycles: Dictionary, move: String) -> Array:
	var result: Array = state.duplicate()
	var ring: String = move.left(1)
	if not cycles.has(ring):
		return result
	var cycle: Array = cycles[ring]
	var direction: int = 1 if move.ends_with("+") else -1
	for i in range(cycle.size()):
		result[int(cycle[posmod(i + direction, cycle.size())])] = state[int(cycle[i])]
	return result

static func inverse(move: String) -> String:
	return move.left(1) + ("-" if move.ends_with("+") else "+")

static func available_moves(cycles: Dictionary) -> Array:
	var result: Array = []
	for ring in ["A", "B"]:
		if cycles.has(ring):
			result.append(ring + "+")
			result.append(ring + "-")
	return result

static func state_key(state: Array) -> String:
	return "|".join(PackedStringArray(state))

static func solve(start: Array, target: Array, cycles: Dictionary, limit: int = 6000) -> Dictionary:
	if start == target:
		return {"found": true, "moves": [], "visited": 1}
	var queue: Array = [start.duplicate()]
	var start_key: String = state_key(start)
	var goal_key: String = state_key(target)
	var previous: Dictionary = {start_key: {"from": "", "move": ""}}
	var cursor: int = 0
	var moves: Array = available_moves(cycles)
	while cursor < queue.size() and previous.size() <= limit:
		var state: Array = queue[cursor]
		cursor += 1
		var key: String = state_key(state)
		for move in moves:
			var next: Array = apply_move(state, cycles, move)
			var next_key: String = state_key(next)
			if previous.has(next_key):
				continue
			previous[next_key] = {"from": key, "move": move}
			if next_key == goal_key:
				var path: Array = []
				var trace: String = next_key
				while trace != start_key:
					path.push_front(previous[trace]["move"])
					trace = previous[trace]["from"]
				return {"found": true, "moves": path, "visited": previous.size()}
			queue.append(next)
	return {"found": false, "moves": [], "visited": previous.size(), "exhausted": cursor >= queue.size()}

