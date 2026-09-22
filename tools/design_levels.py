#!/usr/bin/env python3
"""Authored setups plus independent BFS certificates for the eight prototype levels."""
import json
from collections import deque
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CYCLES = {'A': [0, 1, 2, 3], 'B': [3, 4, 5, 6]}
TARGET = ['sun', 'leaf', 'drop', 'bloom', 'gem', 'moon', 'star']


def apply(state, cycles, move):
    output = list(state)
    cycle = cycles[move[0]]
    direction = 1 if move[1] == '+' else -1
    for i, slot in enumerate(cycle):
        output[cycle[(i + direction) % len(cycle)]] = state[slot]
    return tuple(output)


def solve(start, target, cycles):
    queue = deque([tuple(start)])
    parent = {tuple(start): None}
    while queue:
        state = queue.popleft()
        if state == tuple(target):
            path = []
            while parent[state] is not None:
                state, move = parent[state]
                path.append(move)
            return list(reversed(path)), len(parent)
        for ring in cycles:
            for direction in '+-':
                move = ring + direction
                next_state = apply(state, cycles, move)
                if next_state not in parent:
                    parent[next_state] = (state, move)
                    queue.append(next_state)
    raise ValueError('Unreachable authored target')


def main():
    levels = [
        dict(id='first_click', title='第一声咔哒', chapter='初来工坊', subtitle='轻轻拨动左环，让徽章回到图样中的位置。', scramble=['A-'], rings=['A'], hints=['观察右侧的修复图样。每次拨动，左环上的四枚徽章一起走一格。', '图样中的太阳在左环下方。看看它现在在哪里，再选转动方向。'], insight='一次小小的转动，能让整圈徽章一起回家。', math_title='一起移动的位置', math='机关每次都按同一条路线移动徽章。这样的可逆位置变换，叫作置换。'),
        dict(id='other_way', title='换个方向', chapter='初来工坊', subtitle='把手也可以反着转。选一条更顺手的路。', scramble=['A+'], rings=['A'], hints=['两个箭头分别让左环顺时针、逆时针转动。', '试试逆时针，让刚走过的一格退回来。'], insight='同一个把手，两个方向。你已经会让动作倒着发生了。', math_title='动作的逆向', math='一次转动之后，再做它的逆操作，就回到原来的状态。群论里，这对应逆元。'),
        dict(id='meeting', title='相遇的齿轮', chapter='两个把手', subtitle='右环也醒来了。中间的插槽，属于两个环。', scramble=['A+', 'B+'], rings=['A', 'B'], hints=['共用的插槽是两环交换徽章的地方。先观察哪些徽章还在另一边。', '先用右环把徽章送回交点，再用左环接住它。'], insight='共用一个位置，两个简单的机关就能合作。', math_title='几个动作的组合', math='把一串置换接起来，整体仍是一个置换。所有基本机关能组合出的变换，构成它们生成的群。'),
        dict(id='borrow_path', title='借一条路', chapter='两个把手', subtitle='先借一个位置，用完，再送回去。', scramble=['A+', 'B+', 'A-'], rings=['A', 'B'], hints=['有时需要先动左环，才能让右环接到想要的徽章。', '试试：左环送过去，右环处理，再把左环送回来。'], insight='把对象送到工具旁，再送回来，事情就变简单了。', math_title='把作用搬到别处', math='借位、操作、还位，是共轭的一种直观体验。先改变位置，再使用工具，最后恢复位置关系。'),
        dict(id='only_three', title='留下三枚', chapter='借位的巧思', subtitle='只有三枚错位。允许途中打乱，最后归位就好。', scramble=['A+', 'B+', 'A-', 'B-'], rings=['A', 'B'], hints=['正确的徽章可以暂时离开插槽。只需要在最后恢复它们。', '两边各动一次，再依次把两边反向转回来。留意交点附近的变化。'], insight='一串大动作，最后只留下了一个小小的变化。', math_title='把副作用抵消', math='两个动作与它们的逆向按特定顺序组合，会留下顺序不交换所产生的差异。这样的组合与交换子有关。'),
        dict(id='move_the_trick', title='把巧思搬家', chapter='借位的巧思', subtitle='熟悉的小技巧，这次要在另一个位置发生。', scramble=['A+', 'A+', 'B+', 'A-', 'B-', 'A-'], rings=['A', 'B'], hints=['你已经会只改变少数徽章。先想想，应该把哪几枚送到交点旁。', '把左环先拨一格，使用上一件的局部变化，再还回借走的位置。'], insight='技巧可以搬家。你拥有的办法，比把手更多。', math_title='组合自己的工具', math='一段操作本身也能看成一个置换。把它与借位组合起来，就能在另一处产生局部作用。'),
        dict(id='same_shape', title='相同的模样', chapter='工坊的小秘密', subtitle='同样的徽章可以互相替代。让图案吻合就好。', scramble=['A+', 'B+', 'A-', 'B-', 'A+', 'B+'], rings=['A', 'B'], target=['sun', 'leaf', 'sun', 'drop', 'leaf', 'drop', 'sun'], hints=['所有太阳徽章都一样。不必记住每一枚最初来自哪里。', '先让一侧的图样接近目标，再借交点调整另一侧。'], insight='你修复的是一幅图案。相同的徽章，都能成为答案。', math_title='图案的对称', math='当相同符号可以互换时，某些非平凡的位置变化仍会保留整个图案。保持图案不变的群元素构成它的稳定子。'),
        dict(id='last_light', title='最后一盏灯', chapter='工坊的小秘密', subtitle='把学会的办法拼在一起，为工坊点亮最后一盏灯。', scramble=['A+', 'B+', 'A-', 'B-', 'A+', 'A+', 'B+', 'A-', 'B-', 'A-'], rings=['A', 'B'], hints=['先找出哪些徽章真的需要改变。把问题拆成两个小变化。', '先完成一次局部调整，再借位处理余下的错位。已经正确的区域可以暂时经过。'], insight='你用两个把手，找到了自己的办法。工坊又亮了一点。', math_title='从规则到解法', math='初始图案和目标图案，是定义在位置集合上的字符串。寻找允许的置换把前者变成后者，就是这间工坊与 String Isomorphism 的联系。'),
    ]
    report = []
    for index, level in enumerate(levels):
        level['number'] = index + 1
        target = level.setdefault('target', TARGET[:])
        level['cycles'] = {ring: CYCLES[ring] for ring in level.pop('rings')}
        initial = tuple(target)
        for move in level.pop('scramble'):
            initial = apply(initial, level['cycles'], move)
        level['initial'] = list(initial)
        witness, visited = solve(initial, target, level['cycles'])
        level['certificate'] = witness
        level['shortest'] = len(witness)
        report.append({'level': index + 1, 'id': level['id'], 'shortest': len(witness), 'certificate': witness, 'search_states': visited})
    (ROOT / 'data/levels.json').write_text(json.dumps(levels, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'docs/level-validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    for row in report:
        print(row['level'], row['id'], row['shortest'], ' '.join(row['certificate']))


if __name__ == '__main__':
    main()
