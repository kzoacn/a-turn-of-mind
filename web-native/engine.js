(function (root) {
  'use strict';
  const palette = [
    { color: '#edc66d', name: '琥珀', glyph: 'sun' },
    { color: '#84c8bc', name: '青瓷', glyph: 'wave' },
    { color: '#e99c86', name: '珊瑚', glyph: 'flower' },
    { color: '#91b6e0', name: '晴蓝', glyph: 'drop' },
    { color: '#b7a1d3', name: '紫藤', glyph: 'diamond' },
    { color: '#bad38d', name: '新叶', glyph: 'leaf' },
    { color: '#d991b5', name: '莓粉', glyph: 'star' },
    { color: '#f0e2c7', name: '月白', glyph: 'moon' }
  ];

  function permutation(operation, n, direction = 1) {
    const map = Array.from({ length: n }, (_, i) => i);
    for (const cycle of operation.cycles) {
      cycle.forEach((source, i) => { map[source] = cycle[(i + direction + cycle.length) % cycle.length]; });
    }
    return map;
  }
  function apply(state, operation, direction = 1) {
    return applyMap(state, permutation(operation, state.length, direction));
  }
  function applyMap(state, map) {
    const next = state.slice();
    state.forEach((token, source) => { next[map[source]] = token; });
    return next;
  }
  const equal = (a, b) => a.length === b.length && a.every((value, i) => value === b[i]);
  const key = state => state.join(',');
  function movesFor(level) {
    return level.ops.flatMap(op => (op.order === 2 ? [1] : [1, -1]).map(direction => ({ op: op.id, direction })));
  }
  function solve(start, target, level, limit = 60000) {
    if (equal(start, target)) return { found: true, moves: [], visited: 1 };
    const queue = [start.slice()], startKey = key(start), targetKey = key(target);
    const parents = new Map([[startKey, null]]), moves = movesFor(level);
    const transitions = moves.map(move => ({ move, map: permutation(level.ops.find(op=>op.id===move.op), start.length, move.direction) }));
    let cursor = 0;
    while (cursor < queue.length && parents.size <= limit) {
      const state = queue[cursor++], parentKey = key(state);
      for (const {move,map} of transitions) {
        const next = applyMap(state, map), nextKey = key(next);
        if (parents.has(nextKey)) continue;
        parents.set(nextKey, { from: parentKey, move });
        if (nextKey === targetKey) {
          const path = [];
          for (let trace = nextKey; trace !== startKey;) {
            const step = parents.get(trace); path.unshift(step.move); trace = step.from;
          }
          return { found: true, moves: path, visited: parents.size };
        }
        queue.push(next);
      }
    }
    return { found: false, moves: [], visited: parents.size, exhausted: cursor >= queue.length };
  }
  class Session {
    constructor(level, saved = []) {
      this.level = level; this.state = level.initial.slice(); this.history = []; this.future = [];
      this.ops = Object.fromEntries(level.ops.map(op => [op.id, op]));
      if (Array.isArray(saved)) {
        for (const move of saved.slice(0, 5000)) {
          if (!this.valid(move) || this.solved) break;
          this.state = apply(this.state, this.ops[move.op], move.direction);
          this.history.push({ op: move.op, direction: move.direction });
        }
      }
    }
    valid(move) { return !!move && !!this.ops[move.op] && (move.direction === 1 || move.direction === -1); }
    get solved() { return equal(this.state, this.level.target); }
    get matched() { return this.state.filter((token, i) => token === this.level.target[i]).length; }
    move(move) {
      if (!this.valid(move) || this.solved) return null;
      const before = this.state.slice();
      this.state = apply(this.state, this.ops[move.op], move.direction);
      this.history.push({ ...move }); this.future = [];
      return { before, after: this.state.slice(), move: { ...move } };
    }
    undo() {
      if (!this.history.length) return null;
      const move = this.history.pop(), reverse = { op: move.op, direction: -move.direction };
      const before = this.state.slice(); this.state = apply(this.state, this.ops[reverse.op], reverse.direction);
      this.future.push(move);
      return { before, after: this.state.slice(), move: reverse };
    }
    redo() {
      if (!this.future.length || this.solved) return null;
      const move = this.future.pop(), before = this.state.slice();
      this.state = apply(this.state, this.ops[move.op], move.direction); this.history.push(move);
      return { before, after: this.state.slice(), move: { ...move } };
    }
    restart() { this.state = this.level.initial.slice(); this.history = []; this.future = []; }
  }
  const api = { palette, permutation, apply, equal, key, movesFor, solve, Session };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Workshop = api;
})(globalThis);
