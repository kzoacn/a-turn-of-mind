class_name WorkshopBoard
extends Control

signal move_requested(code: String)
signal animation_finished

const INK = Color("233f37")
const PAPER = Color("faf4df")
const LEFT = Color("8dc9b2")
const RIGHT = Color("e6bd79")
const CENTERS = {"A": Vector2(218, 190), "B": Vector2(442, 190)}
const RADIUS = 112.0
const PALETTE = {
	"sun": Color("efc46c"), "leaf": Color("aec99b"), "drop": Color("8bc7c7"),
	"bloom": Color("e9a48d"), "gem": Color("c0afd2"), "moon": Color("a2b9d9"), "star": Color("e9dcb8")
}

var font: Font
var miniature: bool = false
var state: Array = []
var target: Array = []
var cycles: Dictionary = {}
var preview: String = ""
var show_target: bool = false
var motion: String = ""
var before: Array = []
var progress: float = 1.0
var speed: float = 0.32
var completed: bool = false
var celebration: float = 0.0
var reduced_motion: bool = false

func _ready() -> void:
	mouse_filter = Control.MOUSE_FILTER_IGNORE if miniature else Control.MOUSE_FILTER_STOP
	mouse_exited.connect(func(): set_preview(""))

func positions() -> Array:
	return [Vector2(218, 302), Vector2(106, 190), Vector2(218, 78), Vector2(330, 190), Vector2(442, 78), Vector2(554, 190), Vector2(442, 302)]

func configure(new_state: Array, new_target: Array, new_cycles: Dictionary) -> void:
	state = new_state.duplicate()
	target = new_target.duplicate()
	cycles = new_cycles.duplicate(true)
	before.clear()
	motion = ""
	progress = 1.0
	completed = state == target
	preview = ""
	celebration = 0.0
	queue_redraw()

func transition(old_state: Array, new_state: Array, code: String) -> void:
	before = old_state.duplicate()
	state = new_state.duplicate()
	motion = code
	progress = 0.0
	preview = ""
	completed = false
	queue_redraw()

func set_preview(code: String) -> void:
	preview = code if progress >= 1.0 and not completed else ""
	queue_redraw()

func _process(delta: float) -> void:
	if progress < 1.0:
		progress = minf(1.0, progress + delta / (0.05 if reduced_motion else speed))
		queue_redraw()
		if progress >= 1.0:
			completed = state == target
			if completed:
				celebration = 1.3
			animation_finished.emit()
	if celebration > 0:
		celebration = maxf(0.0, celebration - delta)
		queue_redraw()

func local_canvas_point(point: Vector2) -> Vector2:
	var scale_factor: float = minf(size.x / 660.0, size.y / 380.0)
	return (point - (size - Vector2(660, 380) * scale_factor) / 2) / scale_factor

func _gui_input(event: InputEvent) -> void:
	if miniature or progress < 1.0 or completed:
		return
	if event is InputEventMouseMotion:
		var point: Vector2 = local_canvas_point(event.position)
		var code: String = ""
		for ring in cycles:
			if point.distance_to(CENTERS[ring]) < 38:
				code = ring + ("-" if event.shift_pressed else "+")
		set_preview(code)
		mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND if code != "" else Control.CURSOR_ARROW
	if event is InputEventMouseButton and event.pressed and event.button_index in [MOUSE_BUTTON_LEFT, MOUSE_BUTTON_RIGHT]:
		var point: Vector2 = local_canvas_point(event.position)
		for ring in cycles:
			if point.distance_to(CENTERS[ring]) < 38:
				move_requested.emit(ring + ("-" if event.button_index == MOUSE_BUTTON_RIGHT or event.shift_pressed else "+"))
				accept_event()

func _draw() -> void:
	if state.size() != 7:
		return
	var factor: float = minf(size.x / 660.0, size.y / 380.0)
	draw_set_transform((size - Vector2(660, 380) * factor) / 2, 0.0, Vector2.ONE * factor)
	var points: Array = positions()
	for ring in ["A", "B"]:
		var center: Vector2 = CENTERS[ring]
		var tint: Color = LEFT if ring == "A" else RIGHT
		var active: bool = cycles.has(ring)
		if miniature:
			draw_arc(center, RADIUS, 0, TAU, 80, Color("c7c5b5"), 3.5, true)
		else:
			draw_circle(center + Vector2(0, 4), RADIUS + 5, Color(0.03, 0.12, 0.09, 0.3))
			draw_circle(center, RADIUS + 3, Color(0.12, 0.24, 0.20, 0.65))
			draw_arc(center, RADIUS + 3, 0, TAU, 100, tint * Color(1, 1, 1, 0.18 if not active else 0.42), 2.0, true)
			draw_arc(center, RADIUS - 3, 0, TAU, 100, Color("162e27"), 2.0, true)
			for tick in range(32):
				var angle: float = tick * TAU / 32.0
				var v: Vector2 = Vector2.from_angle(angle)
				draw_line(center + v * (RADIUS + 10), center + v * (RADIUS + 14), Color(0.8, 0.83, 0.68, 0.16), 1, true)
			if preview.begins_with(ring):
				draw_arc(center, RADIUS, 0, TAU, 100, tint, 4.0, true)
				draw_move_arrows(center, tint, preview.ends_with("+"))
			draw_handle(center, ring, active, preview.begins_with(ring))
	if not miniature:
		for i in range(points.size()):
			var p: Vector2 = points[i]
			draw_circle(p + Vector2(0, 3), 31, Color("132b25"))
			draw_circle(p, 30, Color("344d41"))
			draw_arc(p, 30, 0, TAU, 40, Color("73846a") if i == 3 else Color("536855"), 1.5, true)
		if font:
			draw_string(font, Vector2(300, 147), "共用插槽", HORIZONTAL_ALIGNMENT_CENTER, 60, 10, Color("9eae95"))
			draw_line(Vector2(330, 153), Vector2(330, 155), Color("9eae95"), 1)
	var rendered: Array = target if show_target else (before if progress < 1.0 else state)
	for i in range(rendered.size()):
		var p: Vector2 = points[i]
		if progress < 1.0 and not show_target and motion != "":
			var ring: String = motion.left(1)
			if cycles[ring].has(i):
				var center: Vector2 = CENTERS[ring]
				var eased: float = progress * progress * (3.0 - 2.0 * progress)
				var angle: float = (p - center).angle() + (PI / 2.0) * eased * (1 if motion.ends_with("+") else -1)
				p = center + Vector2.from_angle(angle) * RADIUS
		draw_token(p, str(rendered[i]), 24 if not miniature else 27, not miniature)
		if not miniature and progress >= 1.0 and not show_target and state[i] == target[i]:
			draw_circle(p + Vector2(22, 20), 5, Color("bed3a7"))
			draw_line(p + Vector2(20, 20), p + Vector2(22, 22), INK, 1.5, true)
			draw_line(p + Vector2(22, 22), p + Vector2(25, 18), INK, 1.5, true)
	if not miniature and font:
		var caption: String = "指向把手或按钮，先看看它会带动哪里"
		if completed:
			caption = "每一枚，都找到了位置。"
		elif show_target:
			caption = "正在叠看目标 · 松开空格，继续修理"
		draw_string(font, Vector2(0, 362), caption, HORIZONTAL_ALIGNMENT_CENTER, 660, 12, Color("a8b9a1"))
	if celebration > 0 and not reduced_motion:
		for i in range(14):
			var phase: float = 1.3 - celebration
			var p: Vector2 = Vector2(55 + i * 42, 130 + sin(float(i) * 4.0) * 100 - phase * 35)
			var color: Color = RIGHT
			color.a = minf(1.0, celebration) * 0.8
			draw_line(p - Vector2(3, 0), p + Vector2(3, 0), color, 1.5, true)
			draw_line(p - Vector2(0, 3), p + Vector2(0, 3), color, 1.5, true)

func draw_handle(center: Vector2, ring: String, active: bool, highlighted: bool) -> void:
	var color: Color = LEFT if ring == "A" else RIGHT
	if not active:
		color = Color("5c715f")
	draw_circle(center + Vector2(0, 4), 31, Color("152d25"))
	draw_circle(center, 30, Color("34594b") if ring == "A" else Color("65593c"))
	draw_arc(center, 30, 0, TAU, 48, color, 2.5 if highlighted else 1.3, true)
	draw_arc(center, 22, 0, TAU, 48, Color(0.8, 0.86, 0.65, 0.18), 1, true)
	if font:
		draw_string(font, center + Vector2(-16, 7), "左" if ring == "A" else "右", HORIZONTAL_ALIGNMENT_CENTER, 32, 19, color)
		draw_string(font, center + Vector2(-42, 54), ("A / D" if ring == "A" else "← / →") if active else "稍后开启", HORIZONTAL_ALIGNMENT_CENTER, 84, 11, Color("97aa93"))

func draw_move_arrows(center: Vector2, color: Color, clockwise: bool) -> void:
	for i in range(4):
		var start: float = i * PI / 2.0 + (0.42 if clockwise else 1.14)
		var end: float = start + (0.65 if clockwise else -0.65)
		draw_arc(center, RADIUS, minf(start, end), maxf(start, end), 20, color, 3, true)
		var point: Vector2 = center + Vector2.from_angle(end) * RADIUS
		var tangent: Vector2 = Vector2.from_angle(end + (PI / 2 if clockwise else -PI / 2))
		draw_line(point, point - tangent.rotated(0.5) * 9, color, 2.5, true)
		draw_line(point, point - tangent.rotated(-0.5) * 9, color, 2.5, true)

func draw_token(p: Vector2, kind: String, radius: float, shadow: bool) -> void:
	var color: Color = PALETTE.get(kind, PAPER)
	if shadow:
		draw_circle(p + Vector2(0, 3), radius, Color(0.02, 0.10, 0.06, 0.55))
	draw_circle(p, radius, color)
	draw_arc(p, radius - 2, PI, TAU, 20, color.lightened(0.2), 1.5, true)
	draw_arc(p, radius - 3, 0, PI, 20, color.darkened(0.14), 1.0, true)
	var r: float = radius * 0.46
	match kind:
		"sun":
			draw_circle(p, r * 0.53, INK)
			for i in range(8):
				var v: Vector2 = Vector2.from_angle(i * TAU / 8)
				draw_line(p + v * r * 0.8, p + v * r * 1.05, INK, 2, true)
		"leaf":
			var polygon := PackedVector2Array([p + Vector2(-r, r * 0.85), p + Vector2(-r * 0.8, -r * 0.4), p + Vector2(r, -r), p + Vector2(r * 0.7, r * 0.6), p + Vector2(-r * 0.3, r)])
			draw_colored_polygon(polygon, INK)
			draw_line(p + Vector2(-r * 0.55, r * 0.6), p + Vector2(r * 0.5, -r * 0.5), color, 1.5, true)
		"drop":
			draw_circle(p + Vector2(0, r * 0.3), r * 0.75, INK)
			draw_colored_polygon(PackedVector2Array([p + Vector2(0, -r * 1.15), p + Vector2(-r * 0.72, r * 0.13), p + Vector2(r * 0.72, r * 0.13)]), INK)
			draw_line(p + Vector2(r * 0.25, r * 0.2), p + Vector2(r * 0.25, r * 0.58), color, 1.5, true)
		"bloom":
			for i in range(5):
				draw_circle(p + Vector2.from_angle(i * TAU / 5 - PI / 2) * r * 0.62, r * 0.45, INK)
			draw_circle(p, r * 0.32, color)
		"gem":
			draw_colored_polygon(PackedVector2Array([p + Vector2(0, -r * 1.2), p + Vector2(r, 0), p + Vector2(0, r * 1.2), p + Vector2(-r, 0)]), INK)
			draw_line(p + Vector2(0, -r * 0.65), p + Vector2(0, r * 0.65), color, 1.5, true)
		"moon":
			draw_circle(p, r, INK)
			draw_circle(p + Vector2(r * 0.53, -r * 0.36), r * 0.85, color)
		"star":
			var polygon := PackedVector2Array()
			for i in range(10):
				polygon.append(p + Vector2.from_angle(i * PI / 5 - PI / 2) * r * (1.08 if i % 2 == 0 else 0.46))
			draw_colored_polygon(polygon, INK)
