class_name LevelCatalog
extends RefCounted

static func load_levels() -> Array:
	var parsed: Variant = JSON.parse_string(FileAccess.get_file_as_string("res://data/levels.json"))
	if parsed is not Array:
		push_error("The level catalog must be an array.")
		return []
	# JSON numbers are floats in Godot. Normalize slot indices before membership tests.
	for level in parsed:
		for ring in level["cycles"]:
			var slots: Array = []
			for value in level["cycles"][ring]:
				slots.append(int(value))
			level["cycles"][ring] = slots
		level["number"] = int(level["number"])
		level["shortest"] = int(level["shortest"])
	return parsed
