extends Control

const FONT = preload("res://assets/fonts/WorkshopSans.ttf")
const CREAM = Color("f7f2e5")
const INK = Color("263e34")
const MUTED = Color("7f8774")
const TEAL = Color("396954")
const LINE = Color("d8d8c8")

var levels: Array = []
var session := GameSession.new()
var store := ProgressStore.new()
var level_index: int = 0
var board: WorkshopBoard
var target_board: WorkshopBoard
var navigation: Array = []
var move_buttons: Dictionary = {}
var labels: Dictionary = {}
var undo_button: Button
var redo_button: Button
var restart_button: Button
var hint_button: Button
var next_button: Button
var sound_button: Button
var motion_button: Button
var hint_stage: int = 0
var busy: bool = false
var overlay: Control
var overlay_title: Label
var overlay_body: Label
var overlay_button: Button
var overlay_action: Callable
var effect: AudioStreamPlayer
var win_effect: AudioStreamPlayer
var save_clock: float = 0.0
var completion_pending: bool = false
var save_path_override: String = ""
var test_mode: bool = false
var export_dialog: FileDialog

func _ready() -> void:
	levels = LevelCatalog.load_levels()
	if save_path_override != "":
		store.path = save_path_override
	elif OS.get_cmdline_user_args().has("--test-profile"):
		store.path = "user://automated-test-progress.json"
		test_mode = true
	store.load_progress(levels)
	var theme_resource := Theme.new()
	theme_resource.default_font = FONT
	theme_resource.default_font_size = 16
	theme = theme_resource
	build_interface()
	set_level(int(store.data["current"]))
	get_window().min_size = Vector2i(960, 600)
	if store.last_error != "":
		labels["status"].text = store.last_error
	if OS.get_cmdline_user_args().has("--capture"):
		capture_preview.call_deferred()

func style(bg: Color, border: Color = Color.TRANSPARENT, radius: int = 12) -> StyleBoxFlat:
	var result := StyleBoxFlat.new()
	result.bg_color = bg
	result.border_color = border
	result.set_border_width_all(1 if border.a > 0 else 0)
	result.set_corner_radius_all(radius)
	result.content_margin_left = 14
	result.content_margin_right = 14
	return result

func panel(rect: Rect2, color: Color, border: Color = Color.TRANSPARENT, radius: int = 16, parent: Node = self) -> Panel:
	var control := Panel.new()
	control.position = rect.position
	control.size = rect.size
	control.add_theme_stylebox_override("panel", style(color, border, radius))
	control.mouse_filter = Control.MOUSE_FILTER_IGNORE
	parent.add_child(control)
	return control

func label_at(key: String, text: String, rect: Rect2, font_size: int = 16, color: Color = INK, parent: Node = self) -> Label:
	var control := Label.new()
	control.text = text
	control.position = rect.position
	control.size = rect.size
	control.add_theme_font_size_override("font_size", font_size)
	control.add_theme_color_override("font_color", color)
	control.mouse_filter = Control.MOUSE_FILTER_IGNORE
	control.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	parent.add_child(control)
	if key != "":
		labels[key] = control
	return control

func button_at(text: String, rect: Rect2, callback: Callable, primary: bool = false, parent: Node = self) -> Button:
	var button := Button.new()
	button.text = text
	button.position = rect.position
	button.size = rect.size
	button.mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND
	button.add_theme_font_size_override("font_size", 14)
	button.add_theme_color_override("font_color", CREAM if primary else INK)
	button.add_theme_color_override("font_hover_color", CREAM if primary else INK)
	button.add_theme_color_override("font_pressed_color", CREAM if primary else INK)
	button.add_theme_color_override("font_focus_color", CREAM if primary else INK)
	button.add_theme_color_override("font_disabled_color", Color("adb29f"))
	button.add_theme_stylebox_override("normal", style(TEAL if primary else Color("f9f6ec"), Color.TRANSPARENT if primary else LINE, 10))
	button.add_theme_stylebox_override("hover", style(Color("477b61") if primary else Color("e9eddb"), Color("759e7e"), 10))
	button.add_theme_stylebox_override("pressed", style(Color("2d5643") if primary else Color("dde5ce"), Color("759e7e"), 10))
	button.add_theme_stylebox_override("disabled", style(Color("e5e6d9"), Color("dadccc"), 10))
	var focus_style := style(Color.TRANSPARENT, Color("c68e44"), 10)
	focus_style.set_border_width_all(2)
	button.add_theme_stylebox_override("focus", focus_style)
	button.pressed.connect(callback)
	parent.add_child(button)
	return button

func build_interface() -> void:
	panel(Rect2(32, 28, 48, 48), INK, Color.TRANSPARENT, 14)
	label_at("", "借", Rect2(39, 31, 34, 39), 25, CREAM).horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label_at("", "借位工坊", Rect2(96, 24, 220, 35), 27)
	label_at("", "B O R R O W E D   M O V E S", Rect2(97, 60, 290, 20), 10, MUTED)
	label_at("", "两枚把手，一点巧思。", Rect2(400, 38, 290, 30), 15, MUTED)
	sound_button = button_at("", Rect2(911, 34, 98, 38), toggle_sound)
	motion_button = button_at("", Rect2(1018, 34, 108, 38), toggle_motion)
	button_at("怎么玩  ?", Rect2(1135, 34, 112, 38), show_help)
	panel(Rect2(32, 126, 208, 620), Color("f8f5eb"), LINE)
	label_at("", "今日的修理单", Rect2(50, 146, 175, 26), 18)
	label_at("progress", "", Rect2(50, 180, 168, 25), 12, MUTED)
	for i in range(8):
		var index: int = i
		var nav: Button = button_at("", Rect2(44, 225 + i * 52, 184, 44), func(): set_level(index))
		nav.alignment = HORIZONTAL_ALIGNMENT_LEFT
		navigation.append(nav)
	label_at("", "卡住时，换一件也可以。", Rect2(50, 664, 170, 23), 12, MUTED)
	button_at("导出试玩记录", Rect2(48, 696, 176, 32), export_report)
	label_at("chapter", "", Rect2(276, 120, 500, 23), 12, TEAL)
	label_at("title", "", Rect2(272, 151, 720, 43), 30)
	label_at("subtitle", "", Rect2(274, 193, 920, 23), 14, MUTED)
	panel(Rect2(272, 230, 664, 380), Color("253f35"), Color("45604c"), 20)
	board = WorkshopBoard.new()
	board.name = "Board"
	board.font = FONT
	board.position = Vector2(274, 230)
	board.size = Vector2(660, 380)
	board.move_requested.connect(do_move)
	board.animation_finished.connect(on_animation_finished)
	add_child(board)
	panel(Rect2(956, 230, 292, 380), Color("f9f6eb"), LINE, 18)
	label_at("", "修复图样", Rect2(978, 246, 200, 28), 18)
	label_at("", "让大徽章与这里的位置一致", Rect2(978, 280, 250, 22), 12, MUTED)
	target_board = WorkshopBoard.new()
	target_board.name = "Target"
	target_board.miniature = true
	target_board.font = FONT
	target_board.position = Vector2(970, 306)
	target_board.size = Vector2(264, 165)
	add_child(target_board)
	label_at("matched", "", Rect2(978, 474, 248, 28), 15, TEAL)
	var target_note: Label = label_at("target_note", "", Rect2(978, 508, 247, 48), 13, MUTED)
	target_note.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	next_button = button_at("", Rect2(978, 554, 248, 38), next_level, true)
	label_at("", "左环", Rect2(282, 628, 56, 22), 14)
	label_at("", "A / D", Rect2(485, 628, 100, 22), 11, MUTED)
	label_at("", "右环", Rect2(624, 628, 56, 22), 14)
	label_at("", "← / →", Rect2(827, 628, 100, 22), 11, MUTED)
	var move_specs: Array = [["A-", "逆时针", 272], ["A+", "顺时针", 438], ["B-", "逆时针", 614], ["B+", "顺时针", 780]]
	for spec in move_specs:
		var code: String = spec[0]
		var button: Button = button_at(spec[1], Rect2(spec[2], 658, 156, 46), func(): do_move(code), code.ends_with("+"))
		button.mouse_entered.connect(func(): board.set_preview(code))
		button.mouse_exited.connect(func(): board.set_preview(""))
		button.focus_entered.connect(func(): board.set_preview(code))
		button.focus_exited.connect(func(): board.set_preview(""))
		move_buttons[code] = button
	panel(Rect2(956, 626, 292, 120), Color("e9eddd"), Color("d5deca"), 14)
	label_at("hint_title", "工坊便笺", Rect2(973, 637, 245, 24), 13, TEAL)
	var hint_label: Label = label_at("hint", "", Rect2(973, 666, 255, 64), 13, Color("5f7159"))
	hint_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	hint_label.vertical_alignment = VERTICAL_ALIGNMENT_TOP
	undo_button = button_at("撤销  Z", Rect2(272, 721, 103, 34), undo_move)
	redo_button = button_at("重做  Y", Rect2(384, 721, 103, 34), redo_move)
	restart_button = button_at("重来  R", Rect2(496, 721, 103, 34), restart_level)
	hint_button = button_at("一点提示  H", Rect2(608, 721, 125, 34), request_hint)
	label_at("moves", "", Rect2(749, 721, 184, 32), 13, MUTED).horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	label_at("status", "进度自动保存 · 按住空格叠看目标", Rect2(272, 771, 685, 19), 11, MUTED)
	button_at("原理札记", Rect2(1138, 763, 110, 29), show_note)
	label_at("", "第一间工坊 · 试玩版", Rect2(36, 768, 200, 22), 11, MUTED)
	build_overlay()
	effect = AudioStreamPlayer.new()
	effect.stream = preload("res://assets/audio/turn.wav")
	effect.volume_db = -9
	add_child(effect)
	win_effect = AudioStreamPlayer.new()
	win_effect.stream = preload("res://assets/audio/complete.wav")
	win_effect.volume_db = -12
	add_child(win_effect)

func build_overlay() -> void:
	overlay = Control.new()
	overlay.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(overlay)
	var shade := ColorRect.new()
	shade.color = Color(0.06, 0.14, 0.11, 0.72)
	shade.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	overlay.add_child(shade)
	panel(Rect2(330, 190, 620, 420), CREAM, Color("c9ceb8"), 22, overlay)
	label_at("", "B O R R O W E D   M O V E S", Rect2(370, 223, 520, 20), 11, TEAL, overlay)
	overlay_title = label_at("", "", Rect2(370, 267, 520, 45), 27, INK, overlay)
	overlay_body = label_at("", "", Rect2(370, 330, 530, 180), 16, Color("62705c"), overlay)
	overlay_body.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	overlay_body.vertical_alignment = VERTICAL_ALIGNMENT_TOP
	overlay_button = button_at("继续修理", Rect2(370, 536, 190, 44), close_overlay, true, overlay)
	button_at("关闭  Esc", Rect2(748, 536, 160, 44), func(): overlay.hide(), false, overlay)
	overlay.hide()

func _draw() -> void:
	draw_rect(Rect2(Vector2.ZERO, size), Color("eeede3"))
	for x in range(0, int(size.x), 24):
		for y in range(0, int(size.y), 24):
			draw_circle(Vector2(x + 10, y + 10), 0.65, Color(0.45, 0.51, 0.39, 0.09))
	draw_line(Vector2(32, 102), Vector2(1248, 102), LINE, 1)

func set_level(index: int) -> void:
	if levels.is_empty():
		return
	if not session.level.is_empty():
		store.data["sessions"][session.level["id"]] = session.history.duplicate()
	level_index = clampi(index, 0, levels.size() - 1)
	var level: Dictionary = levels[level_index]
	session.setup(level, store.data["sessions"].get(level["id"], []))
	store.data["current"] = level_index
	store.record(level["id"], "visits")
	hint_stage = 0
	busy = false
	completion_pending = false
	board.show_target = false
	board.configure(session.state, level["target"], level["cycles"])
	target_board.configure(level["target"], level["target"], level["cycles"])
	labels["chapter"].text = "%02d / 08     ·     %s" % [level_index + 1, level["chapter"]]
	labels["title"].text = level["title"]
	labels["subtitle"].text = level["subtitle"]
	labels["hint_title"].text = "工坊便笺"
	labels["hint"].text = "随时撤销，大胆试试。正确的徽章也可以暂时借个位置。" if level_index > 1 else "先试试绿色的顺时针按钮。也可以直接点击环中央的把手。" if level_index == 0 else "同一枚把手，也可以向相反的方向转动。"
	refresh()
	persist()

func refresh() -> void:
	var won: bool = session.solved()
	for i in range(navigation.size()):
		var nav: Button = navigation[i]
		var done: bool = store.data["completed"].has(levels[i]["id"])
		nav.text = ("✓ " if done else "%02d " % (i + 1)) + levels[i]["title"]
		nav.add_theme_stylebox_override("normal", style(Color("e0e8d5") if i == level_index else Color("f8f5eb"), Color("acbea0") if i == level_index else Color.TRANSPARENT, 9))
		nav.add_theme_color_override("font_color", TEAL if i == level_index or done else MUTED)
	labels["progress"].text = "%d / 8 件已修好" % store.data["completed"].size()
	labels["matched"].text = "修好了！" if won else "%d / 7 枚徽章已归位" % session.matched_count()
	labels["target_note"].text = session.level["insight"] if won else "位置只需在最后吻合。\n途中可以暂时打乱。"
	labels["moves"].text = "%d 次拨动" % session.history.size()
	next_button.visible = won
	next_button.disabled = busy
	next_button.text = "收好这份巧思  →" if level_index == 7 else "修理下一件  →"
	undo_button.disabled = busy or session.history.is_empty()
	redo_button.disabled = busy or session.redo_moves.is_empty() or won
	restart_button.disabled = busy or session.history.is_empty()
	hint_button.disabled = busy or won
	for code in move_buttons:
		move_buttons[code].disabled = busy or won or not session.level["cycles"].has(code.left(1))
	sound_button.text = "声音  开" if store.data["sound"] else "声音  关"
	motion_button.text = "动画  舒缓" if store.data["reduced_motion"] else "动画  标准"
	board.reduced_motion = store.data["reduced_motion"]

func do_move(code: String) -> void:
	if busy or overlay.visible:
		return
	var before: Array = session.state.duplicate()
	if not session.move(code):
		return
	store.record(session.level["id"], "moves", code)
	start_transition(before, code)

func start_transition(before: Array, code: String) -> void:
	busy = true
	board.show_target = false
	board.transition(before, session.state, code)
	if store.data["sound"]:
		effect.pitch_scale = 0.90 if code.begins_with("A") else 1.13
		effect.play()
	completion_pending = session.solved()
	if completion_pending:
		var id: String = session.level["id"]
		if not store.data["completed"].has(id) or int(store.data["completed"][id]["moves"]) > session.history.size():
			store.data["completed"][id] = {"moves": session.history.size()}
		store.record(id, "completed")
	persist()
	refresh()

func on_animation_finished() -> void:
	busy = false
	if completion_pending:
		if store.data["sound"]:
			win_effect.play()
		labels["hint_title"].text = "收下这份发现"
		labels["hint"].text = session.level["insight"]
		completion_pending = false
	refresh()

func undo_move() -> void:
	if busy or overlay.visible:
		return
	var before: Array = session.state.duplicate()
	var code: String = session.undo()
	if code == "":
		return
	store.record(session.level["id"], "undos", code)
	start_transition(before, code)

func redo_move() -> void:
	if busy or overlay.visible:
		return
	var before: Array = session.state.duplicate()
	var code: String = session.redo()
	if code == "":
		return
	store.record(session.level["id"], "redos", code)
	start_transition(before, code)

func restart_level() -> void:
	if busy or overlay.visible:
		return
	session.restart()
	store.record(session.level["id"], "restarts")
	board.show_target = false
	board.configure(session.state, session.level["target"], session.level["cycles"])
	hint_stage = 0
	labels["hint_title"].text = "重新试试"
	labels["hint"].text = "可以先观察，也可以先动一下。撤销会一直在这里。"
	persist()
	refresh()

func request_hint() -> void:
	if busy or session.solved() or overlay.visible:
		return
	store.record(session.level["id"], "hints")
	var hints: Array = session.level["hints"]
	if hint_stage < hints.size():
		labels["hint_title"].text = "一点提示 · %d" % (hint_stage + 1)
		labels["hint"].text = hints[hint_stage]
		hint_stage += 1
	else:
		var solution: Dictionary = Permutation.solve(session.state, session.level["target"], session.level["cycles"])
		labels["hint_title"].text = "从现在的位置，再走一小步"
		if solution["found"] and not solution["moves"].is_empty():
			var code: String = solution["moves"][0]
			labels["hint"].text = "%s%s拨一格。之后再观察，或再次点击提示。" % ["左环" if code.begins_with("A") else "右环", "顺时针" if code.ends_with("+") else "逆时针"]
			board.set_preview(code)
		else:
			labels["hint"].text = "先撤销几步，回到你熟悉的位置，再重新观察。"
	persist()

func next_level() -> void:
	if busy:
		return
	if level_index < 7:
		set_level(level_index + 1)
	else:
		var count: int = store.data["completed"].size()
		show_overlay("工坊，又亮了一点。", "你修好了 %d 件机关。\n\n哪一次发现让你最开心？哪一处让你开始乱试？\n把这些感受留给我们，就能让下一间工坊更好玩。\n\n可以继续修理、重玩喜欢的关卡，或导出本地试玩记录。" % count, "回到工坊")

func show_overlay(title: String, body: String, action_text: String = "继续修理", action: Callable = Callable()) -> void:
	board.show_target = false
	board.queue_redraw()
	overlay_title.text = title
	overlay_body.text = body
	overlay_button.text = action_text
	overlay_action = action
	overlay.show()
	overlay_button.grab_focus()

func close_overlay() -> void:
	overlay.hide()
	if overlay_action.is_valid():
		overlay_action.call()
		return
	move_buttons["A+"].grab_focus()

func show_help() -> void:
	show_overlay("借个位置，用完再还。", "让桌面上的徽章，与右侧的修复图样位置一致。\n点击方向按钮，或点击环中央把手顺转、右键逆转。\n左环：A / D　右环：← / →\n撤销：Z　重做：Y　重来：R　提示：H\n按住空格叠看目标；F11 切换全屏。\n\n只需最后归位。卡住时，可以换一件机关。")

func show_note() -> void:
	var body: String = session.level["math"]
	if not session.solved() and not store.data["completed"].has(session.level["id"]):
		body = "这页札记会解释本关的小技巧，可能提前揭开谜底。\n\n" + body
	show_overlay(session.level["math_title"], body, "收好札记")

func toggle_sound() -> void:
	store.data["sound"] = not store.data["sound"]
	if not store.data["sound"]:
		effect.stop()
		win_effect.stop()
	persist()
	refresh()

func toggle_motion() -> void:
	store.data["reduced_motion"] = not store.data["reduced_motion"]
	persist()
	refresh()

func persist() -> void:
	if not session.level.is_empty():
		store.data["sessions"][session.level["id"]] = session.history.duplicate()
	if not store.save() and labels.has("status"):
		labels["status"].text = store.last_error

func export_report() -> void:
	persist()
	var report: String = store.report()
	if OS.has_feature("web"):
		var js: String = "const b=new Blob([%s],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='borrowed-moves-playtest.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);" % JSON.stringify(report)
		JavaScriptBridge.eval(js, true)
		labels["status"].text = "已导出本地试玩记录。"
	else:
		var dialog := FileDialog.new()
		export_dialog = dialog
		dialog.exclusive = true
		dialog.file_mode = FileDialog.FILE_MODE_SAVE_FILE
		dialog.access = FileDialog.ACCESS_FILESYSTEM
		dialog.title = "保存试玩记录"
		dialog.add_filter("*.json", "试玩记录")
		dialog.current_file = "borrowed-moves-playtest.json"
		dialog.size = Vector2i(780, 480)
		dialog.file_selected.connect(func(path: String):
			var file: FileAccess = FileAccess.open(path, FileAccess.WRITE)
			if file:
				file.store_string(report)
				labels["status"].text = "试玩记录已保存。谢谢你帮工坊变得更好。"
			else:
				labels["status"].text = "这个位置暂时无法写入，请换一个保存位置。"
			dialog.queue_free())
		dialog.canceled.connect(func(): dialog.queue_free())
		add_child(dialog)
		dialog.popup_centered()

func _process(delta: float) -> void:
	if session.level.is_empty():
		return
	if not overlay.visible and not session.solved() and get_window().has_focus():
		var stats: Dictionary = store.ensure_stats(session.level["id"])
		stats["seconds"] += minf(delta, 1.0)
	save_clock += delta
	if save_clock >= 5.0:
		save_clock = 0.0
		persist()

func _input(event: InputEvent) -> void:
	if event is not InputEventKey or event.echo:
		return
	if is_instance_valid(export_dialog) and export_dialog.visible:
		return
	if event.keycode == KEY_SPACE and not overlay.visible:
		board.show_target = event.pressed
		board.queue_redraw()
		get_viewport().set_input_as_handled()
		return
	if not event.pressed:
		return
	if event.keycode == KEY_ESCAPE:
		if overlay.visible:
			overlay.hide()
		else:
			show_help()
		get_viewport().set_input_as_handled()
		return
	if event.keycode == KEY_F11:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED if DisplayServer.window_get_mode() == DisplayServer.WINDOW_MODE_FULLSCREEN else DisplayServer.WINDOW_MODE_FULLSCREEN)
		get_viewport().set_input_as_handled()
		return
	if overlay.visible:
		return
	match event.keycode:
		KEY_A: do_move("A-")
		KEY_D: do_move("A+")
		KEY_LEFT: do_move("B-")
		KEY_RIGHT: do_move("B+")
		KEY_Z: undo_move()
		KEY_Y: redo_move()
		KEY_R: restart_level()
		KEY_H: request_hint()
		KEY_ENTER:
			if session.solved():
				next_level()
			else:
				return
		_: return
	get_viewport().set_input_as_handled()

func _notification(what: int) -> void:
	if what == NOTIFICATION_WM_CLOSE_REQUEST:
		persist()
	if what == NOTIFICATION_APPLICATION_FOCUS_OUT and board:
		board.show_target = false
		board.queue_redraw()

func capture_preview() -> void:
	await get_tree().create_timer(1.0).timeout
	set_level(4)
	await RenderingServer.frame_post_draw
	get_viewport().get_texture().get_image().save_png("res://build/preview.png")
	print("Preview saved to build/preview.png")
	get_tree().quit()
