class_name GameSession
extends RefCounted

var level: Dictionary
var state: Array = []
var history: Array = []
var redo_moves: Array = []

func setup(data: Dictionary, saved_moves: Array = []) -> void:
	level = data
	state = level["initial"].duplicate()
	history.clear()
	redo_moves.clear()
	var allowed: Array = Permutation.available_moves(level["cycles"])
	for move in saved_moves.slice(0, 10000):
		if move is not String or not allowed.has(move):
			break
		state = Permutation.apply_move(state, level["cycles"], move)
		history.append(move)

func move(code: String) -> bool:
	if not Permutation.available_moves(level["cycles"]).has(code) or solved():
		return false
	state = Permutation.apply_move(state, level["cycles"], code)
	history.append(code)
	redo_moves.clear()
	return true

func undo() -> String:
	if history.is_empty():
		return ""
	var code: String = history.pop_back()
	state = Permutation.apply_move(state, level["cycles"], Permutation.inverse(code))
	redo_moves.append(code)
	return Permutation.inverse(code)

func redo() -> String:
	if redo_moves.is_empty() or solved():
		return ""
	var code: String = redo_moves.pop_back()
	state = Permutation.apply_move(state, level["cycles"], code)
	history.append(code)
	return code

func restart() -> void:
	setup(level)

func solved() -> bool:
	return state == level["target"]

func matched_count() -> int:
	var count: int = 0
	for i in range(state.size()):
		if state[i] == level["target"][i]:
			count += 1
	return count

