extends SceneTree

var game: Control
var assertions: int = 0
var failures: Array = []
const PROFILE = "user://ui-test-progress.json"

func check(condition: bool, message: String) -> void:
	assertions += 1
	if not condition:
		failures.append(message)
		push_error(message)

func _initialize() -> void:
	run.call_deferred()

func wait_motion() -> void:
	await create_timer(0.39).timeout

func click_at(point: Vector2, mouse_button: int = MOUSE_BUTTON_LEFT) -> void:
	var motion := InputEventMouseMotion.new()
	motion.position = point
	motion.global_position = point
	root.push_input(motion, true)
	await process_frame
	var down := InputEventMouseButton.new()
	down.position = point
	down.global_position = point
	down.button_index = mouse_button
	down.button_mask = MOUSE_BUTTON_MASK_LEFT if mouse_button == MOUSE_BUTTON_LEFT else MOUSE_BUTTON_MASK_RIGHT
	down.pressed = true
	root.push_input(down, true)
	await process_frame
	var up := down.duplicate()
	up.pressed = false
	up.button_mask = 0
	root.push_input(up, true)
	await process_frame

func key(code: Key, pressed: bool = true) -> void:
	var event := InputEventKey.new()
	event.keycode = code
	event.physical_keycode = code
	event.pressed = pressed
	root.push_input(event)
	await process_frame

func run() -> void:
	DirAccess.remove_absolute(PROFILE)
	var scene: PackedScene = load("res://main.tscn")
	game = scene.instantiate()
	game.save_path_override = PROFILE
	root.add_child(game)
	await process_frame
	await process_frame
	check(game.level_index == 0, "Fresh game opens directly on level one")
	check(game.move_buttons["B+"].disabled, "Second ring is visibly disabled in tutorial")
	check(game.undo_button.disabled, "Undo starts disabled")
	await click_at(Vector2(510, 681))
	check(game.busy, "Real button input starts a turn animation")
	check(game.board.before != game.board.state, "Animation retains distinct source and destination")
	await key(KEY_D)
	check(game.session.history.size() == 1, "Rapid repeated input cannot overrun a turn")
	await wait_motion()
	check(game.session.solved() and game.next_button.visible, "First puzzle completes from an actual button click")
	check(game.store.data["completed"].size() == 1, "Completion is recorded")
	await key(KEY_Z)
	await wait_motion()
	check(not game.session.solved() and game.session.history.is_empty(), "Undo after winning restores playable state")
	await key(KEY_Y)
	await wait_motion()
	check(game.session.solved(), "Keyboard redo restores completion")
	game.restart_level()
	await click_at(Vector2(492, 420))
	await wait_motion()
	check(game.session.solved(), "Clicking the central handle rotates clockwise")
	await click_at(Vector2(1090, 570))
	check(game.level_index == 1, "Next button advances to the next lesson")
	await key(KEY_SPACE)
	check(game.board.show_target, "Holding space shows target overlay")
	await key(KEY_SPACE, false)
	check(not game.board.show_target, "Releasing space restores current state")
	await key(KEY_A)
	await wait_motion()
	check(game.session.solved(), "Inverse-direction lesson is playable by keyboard")
	game.restart_level()
	await click_at(Vector2(492, 420), MOUSE_BUTTON_RIGHT)
	await wait_motion()
	check(game.session.solved(), "Right-clicking the central handle rotates counterclockwise")
	await click_at(Vector2(125, 225 + 4 * 52 + 22))
	check(game.level_index == 4, "Player can choose another puzzle at any time")
	await key(KEY_H)
	await key(KEY_H)
	await key(KEY_H)
	check(game.hint_stage == 2 and game.board.preview != "", "Layered hints end with a move from the current state")
	var suggested: String = game.board.preview
	game.do_move(suggested)
	await wait_motion()
	await key(KEY_H)
	var solution: Dictionary = Permutation.solve(game.session.state, game.session.level["target"], game.session.level["cycles"])
	check(game.board.preview == solution["moves"][0], "Further hint is recomputed after the player moves")
	await click_at(Vector2(1192, 53))
	check(game.overlay.visible, "Help opens from the UI")
	var history_size: int = game.session.history.size()
	await key(KEY_D)
	check(game.session.history.size() == history_size, "Dialog prevents moves behind it")
	await key(KEY_ESCAPE)
	check(not game.overlay.visible, "Escape closes help")
	game.restart_level()
	game.do_move("A+")
	game.set_level(5)
	await wait_motion()
	check(game.level_index == 5 and not game.busy and game.board.state == game.session.state, "Switching puzzles mid-animation cancels the old transition")
	for index in range(game.levels.size()):
		game.set_level(index)
		game.restart_level()
		var certificate: Array = game.levels[index]["certificate"]
		for move in certificate:
			var rect: Rect2 = game.move_buttons[move].get_global_rect()
			await click_at(rect.get_center())
			await wait_motion()
		check(game.session.solved(), "Level %d completes through on-screen controls" % (index + 1))
	check(game.store.data["completed"].size() == 8, "All eight completions survive level changes")
	game.next_level()
	check(game.overlay.visible and game.overlay_title.text.contains("亮"), "Final level has a completion screen")
	game.overlay.hide()
	game.toggle_sound()
	var sound: bool = game.store.data["sound"]
	game.set_level(3)
	game.restart_level()
	game.do_move("A+")
	await wait_motion()
	var saved: Array = game.session.state.duplicate()
	game.persist()
	game.queue_free()
	await process_frame
	game = scene.instantiate()
	game.save_path_override = PROFILE
	root.add_child(game)
	await process_frame
	check(game.level_index == 3 and game.session.state == saved, "Closing and reopening resumes the exact unfinished puzzle")
	check(game.store.data["completed"].size() == 8 and game.store.data["sound"] == sound, "Completed puzzles and preferences survive reopening")
	var before_export: Array = game.session.state.duplicate()
	game.export_report()
	await process_frame
	check(is_instance_valid(game.export_dialog) and game.export_dialog.visible, "Desktop report opens a save dialog")
	await key(KEY_R)
	check(game.session.state == before_export, "Typing in the save dialog does not trigger game shortcuts")
	game.export_dialog.hide()
	game.export_dialog.queue_free()
	await process_frame
	var exported: Variant = JSON.parse_string(game.store.report())
	check(exported is Dictionary and exported["stats"].size() == 8, "Playtest export contains all visited levels")
	game.queue_free()
	await process_frame
	DirAccess.remove_absolute(PROFILE)
	print("GAME TESTS: %d assertions, %d failures" % [assertions, failures.size()])
	quit(0 if failures.is_empty() else 1)
