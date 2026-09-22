class_name ProgressStore
extends RefCounted
## Local-only progress and voluntary playtest export; no network or personal data.

var path: String = "user://progress.json"
var data: Dictionary = fresh()
var last_error: String = ""

static func fresh() -> Dictionary:
	return {"version": 1, "current": 0, "sessions": {}, "completed": {}, "stats": {}, "events": [], "sound": true, "reduced_motion": false}

func load_progress(levels: Array) -> void:
	data = fresh()
	if not FileAccess.file_exists(path):
		return
	var file: FileAccess = FileAccess.open(path, FileAccess.READ)
	if file == null or file.get_length() > 4000000:
		last_error = "存档暂时无法读取，已打开新的修理单。"
		return
	var parser := JSON.new()
	if parser.parse(file.get_as_text()) != OK:
		last_error = "存档格式无法识别，已打开新的修理单。"
		return
	var parsed: Variant = parser.data
	if parsed is not Dictionary or parsed.get("version", 0) != 1:
		last_error = "存档格式无法识别，已打开新的修理单。"
		return
	if parsed.get("current") is float or parsed.get("current") is int:
		data["current"] = clampi(int(parsed["current"]), 0, levels.size() - 1)
	for option in ["sound", "reduced_motion"]:
		if parsed.get(option) is bool:
			data[option] = parsed[option]
	for level in levels:
		var id: String = level["id"]
		if parsed.get("sessions") is Dictionary and parsed["sessions"].get(id) is Array:
			var allowed: Array = Permutation.available_moves(level["cycles"])
			var moves: Array = []
			for move in parsed["sessions"][id].slice(0, 10000):
				if move is not String or not allowed.has(move):
					break
				moves.append(move)
			data["sessions"][id] = moves
		if parsed.get("completed") is Dictionary and parsed["completed"].get(id) is Dictionary:
			var record: Dictionary = parsed["completed"][id]
			if (record.get("moves") is float or record.get("moves") is int) and record["moves"] > 0:
				data["completed"][id] = {"moves": clampi(int(record["moves"]), 1, 10000)}
		if parsed.get("stats") is Dictionary and parsed["stats"].get(id) is Dictionary:
			var stats: Dictionary = {}
			for key in ["moves", "undos", "redos", "restarts", "hints", "seconds", "visits"]:
				var value: Variant = parsed["stats"][id].get(key, 0)
				stats[key] = clampf(float(value), 0, 1e8) if value is float or value is int else 0
			data["stats"][id] = stats
	if parsed.get("events") is Array:
		for event in parsed["events"].slice(-500):
			if event is Dictionary and event.get("level") is String and event.get("action") is String:
				data["events"].append({"level": event["level"].left(60), "action": event["action"].left(40), "move": str(event.get("move", "")).left(4)})

func ensure_stats(id: String) -> Dictionary:
	if not data["stats"].has(id):
		data["stats"][id] = {"moves": 0, "undos": 0, "redos": 0, "restarts": 0, "hints": 0, "seconds": 0.0, "visits": 0}
	return data["stats"][id]

func record(id: String, action: String, move: String = "") -> void:
	var stats: Dictionary = ensure_stats(id)
	if stats.has(action):
		stats[action] += 1
	data["events"].append({"level": id, "action": action, "move": move})
	if data["events"].size() > 500:
		data["events"].pop_front()

func save() -> bool:
	var file: FileAccess = FileAccess.open(path + ".tmp", FileAccess.WRITE)
	if file == null:
		last_error = "暂时无法保存进度，请检查文件夹权限。"
		return false
	file.store_string(JSON.stringify(data))
	file.flush()
	file.close()
	var error: Error = DirAccess.rename_absolute(path + ".tmp", path)
	if error != OK:
		last_error = "暂时无法保存进度，请检查文件夹权限。"
		return false
	last_error = ""
	return true

func report() -> String:
	return JSON.stringify({"game": "Borrowed Moves", "build": "phase1-0.1.0", "completed": data["completed"], "stats": data["stats"], "recent_events": data["events"], "note": "Local playtest data only. Completion by automated tests does not establish player enjoyment."}, "  ")
