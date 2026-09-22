#!/usr/bin/env python3
"""Authored collections with exhaustive permutation-group certificates."""
from collections import deque
import json
import math
from pathlib import Path
if __package__:
    from .web_collection_two import collection_two
    from .web_collection_three import collection_three
    from .web_collections_four_five import collections_four_five
    from .web_collections_six_ten import collections_six_ten
else:
    from web_collection_two import collection_two
    from web_collection_three import collection_three
    from web_collections_four_five import collections_four_five
    from web_collections_six_ten import collections_six_ten

ROOT = Path(__file__).resolve().parents[1]


def circle(cx, cy, radius, count, start=-math.pi / 2):
    return [[round(cx + radius * math.cos(start + i * math.tau / count), 3),
             round(cy + radius * math.sin(start + i * math.tau / count), 3)] for i in range(count)]


def op(key, title, caption, cycles, motion='curve', **extra):
    order = math.lcm(*(len(c) for c in cycles))
    return dict(id=key, title=title, caption=caption, cycles=cycles, motion=motion, order=order, **extra)


def apply(state, operation, direction=1):
    result = list(state)
    for cycle in operation['cycles']:
        for i, source in enumerate(cycle):
            result[cycle[(i + direction) % len(cycle)]] = state[source]
    return tuple(result)


def explore(initial, operations):
    initial = tuple(initial)
    queue = deque([initial])
    previous = {initial: None}
    distance = {initial: 0}
    while queue:
        state = queue.popleft()
        for operation in operations:
            for direction in ([1] if operation['order'] == 2 else [1, -1]):
                result = apply(state, operation, direction)
                if result not in previous:
                    previous[result] = (state, dict(op=operation['id'], direction=direction))
                    distance[result] = distance[state] + 1
                    queue.append(result)
    return previous, distance


def notation(cycles):
    return ''.join('(' + ' '.join(str(i + 1) for i in c) + ')' for c in cycles)


def make_levels():
    wheel = circle(400, 235, 151, 5)
    twins = circle(240, 235, 108, 3) + circle(560, 235, 108, 3)
    corners = [[280, 115], [520, 115], [520, 355], [280, 355]]
    hub = [[400, 237], [400, 83], [235, 345], [565, 345]]
    overlap = [[260, 368], [130, 238], [260, 108], [390, 238], [520, 108], [650, 238], [520, 368]]
    ring5 = op('turn', '拨动风轮', '五枚徽章，一起走一格', [list(range(5))], 'orbit', centers=[[400, 235]], angles=[math.tau / 5])
    left3 = op('left', '左边开花', '只转动左侧的三枚徽章', [[0, 1, 2]], 'orbit', centers=[[240, 235]], angles=[math.tau / 3])
    right3 = op('right', '右边开花', '只转动右侧的三枚徽章', [[3, 4, 5]], 'orbit', centers=[[560, 235]], angles=[math.tau / 3])
    both = op('together', '同向的风', '左右两朵花，同向转动', [[0, 1, 2], [3, 4, 5]], 'orbit', centers=[[240, 235], [560, 235]], angles=[math.tau / 3, math.tau / 3])
    opposite = op('apart', '相背的风', '左边顺转，右边逆转', [[0, 1, 2], [3, 5, 4]], 'orbit', centers=[[240, 235], [560, 235]], angles=[math.tau / 3, -math.tau / 3])
    ring4 = op('turn', '转动表盘', '四枚徽章，顺转四分之一圈', [[0, 1, 2, 3]], 'orbit', centers=[[400, 235]], angles=[math.pi / 2])
    levels = [
        dict(id='first_breeze', title='第一缕风', chapter='风与镜', scene='wheel', tag='轻轻一拨', subtitle='让风轮上的颜色，落回右侧图样的位置。', points=wheel, ops=[ring5], scramble=[('turn', -1), ('turn', -1)], group='C₅', expected_order=5,
             hints=['每次转动，五枚徽章会一起前进。先盯住一枚颜色。', '正转和逆转都可以。找到图样中那枚颜色的位置，再试一小步。'], discovery='你拨动的，是整个图案。', math='一个五循环生成循环群 C₅。每次拨动走向下一个状态，五次之后回到原点。', intent='两次轻巧的转动建立手感。用悬停轨迹与单色追踪教规则。'),
        dict(id='mirror_bloom', title='镜里的花', chapter='风与镜', scene='mirror', tag='换一个看法', subtitle='风轮多了一面镜子。有些变化，要翻过来才看得到。', points=wheel, ops=[ring5, op('mirror', '穿过镜面', '沿中轴翻转，顶部位置不动', [[1, 4], [2, 3]], 'mirror')], scramble=[('turn', 1), ('turn', 1), ('mirror', 1)], group='D₅', expected_order=10,
             hints=['镜面两侧的位置会成对交换，最上面的位置不动。', '留意颜色在圆周上的顺序。转动保留顺序，镜面会把它反过来。'], discovery='转动改变朝向，镜子改变次序。', math='转动 r 与反射 s 满足 r⁵=s²=e、srs=r⁻¹，生成阶为 10 的二面体群 D₅。这里 D₅ 指正五边形的对称群。', intent='沿用上一关的五瓣轮，新增一个一眼能读懂的反射动作。'),
        dict(id='two_gardens', title='各自开花', chapter='两阵风', scene='twins', tag='各忙各的', subtitle='两朵花，各有一枚把手。先照顾哪边都可以。', points=twins, ops=[left3, right3], scramble=[('left', 1), ('right', -1)], group='C₃ × C₃', expected_order=9,
             hints=['左边的把手不会碰到右边。可以先完成其中一朵花。', '每边只需要对照自己的三个位置。完成的一边会一直等你。'], discovery='有些机关可以放心地分开处理。', math='两个互不相交的三循环 a=(1 2 3)、b=(4 5 6) 可交换，生成 C₃ × C₃，群阶为 9。', intent='一关舒展的独立控制，给下一关的联动反转建立直觉。'),
        dict(id='shared_breeze', title='同频与逆风', chapter='两阵风', scene='linked', tag='借来一阵风', subtitle='右边已经开好了。新把手却总会同时带动两边。', points=twins, ops=[both, opposite], initial=[2, 0, 1, 3, 4, 5], group='C₃ × C₃', expected_order=9,
             hints=['已经正确的一边可以暂时转走，只需最后回来。', '一次同向、一次相背：右边的变化会抵消，左边会继续前进。'], discovery='两种联动，拼出一次独立的变化。', math='操作群与上一关完全相同，生成元改成 ab 与 ab⁻¹。由于 a、b 的阶为 3，这两个联动操作仍生成全部 C₃ × C₃。', intent='相同位置、相同群、不同生成元。两步抵消带来第一处明确的巧思。', pair='two_gardens'),
        dict(id='three_leaf_knot', title='三叶结', chapter='借位的手艺', scene='triad', tag='三与二的小把戏', subtitle='把手每次轮换三枚。这一次，要让两对颜色各自交换。', points=corners, ops=[op('upper', '上叶回旋', '三个角轮换，左下角留下', [[0, 1, 2]]), op('lower', '下叶回旋', '三个角轮换，左上角留下', [[1, 2, 3]])], initial=[3, 2, 1, 0], group='A₄', expected_order=12,
             hints=['每次轮换三枚时，总有一个角留在原处。先看看是哪一个角。', '可以先做一次三枚的轮换，再让另一枚把手接上。试着让两种回旋交替发生。'], discovery='三枚一转，也能织出两对交换。', math='两个三循环 (1 2 3) 与 (2 3 4) 生成四次交错群 A₄，群阶 12。所有操作都是偶置换。本关目标 (1 4)(2 3) 也是偶置换，最短可以用三个三循环完成。', intent='用三枚轮换合成两对交换，体验操作合成的意外效果；三角丝带明确显示作用范围。'),
        dict(id='borrowed_scissors', title='借来的剪刀', chapter='借位的手艺', scene='dial', tag='把事情送过去', subtitle='剪刀只够得着上方。下方的两枚颜色，正等着换位。', points=corners, ops=[ring4, op('swap', '上方换位', '只交换最上面的两枚徽章', [[0, 1]])], initial=[0, 1, 3, 2], group='S₄', expected_order=24,
             hints=['先把想交换的两枚送到上方。剪刀一直留在原处。', '转过去、交换、再转回来。途中借走的位置，最后记得归还。'], discovery='工具够不到的地方，可以借着转盘送过来。', math='四循环 (1 2 3 4) 与相邻换位 (1 2) 生成 S₄。本关目标是 (3 4)，可以把换位共轭到下方，最短需要 5 次基本操作。', intent='固定交换工具配合全局转盘，构成可直觉理解的共轭。', pair='transfer_station'),
        dict(id='transfer_station', title='小小中转站', chapter='借位的手艺', scene='hub', tag='同一件事，另一种办法', subtitle='还是交换那两枚颜色。这次，可以借用中间的位置。', points=hub, ops=[op('north', '北边的小桥', '中央与上方交换', [[0, 1]]), op('west', '左边的小桥', '中央与左下交换', [[0, 2]]), op('east', '右边的小桥', '中央与右下交换', [[0, 3]])], initial=[0, 1, 3, 2], group='S₄', expected_order=24,
             hints=['中央的位置可以暂时寄存一枚颜色。最终再把它还回中央。', '走过一座桥，再走另一座桥，最后沿第一座桥回来。'], discovery='同一个目标，换一套把手，就有了另一种巧法。', math='星形换位 (1 2)、(1 3)、(1 4) 仍生成 S₄。与上一关的初态和目标完全相同，本关用 (1 3)(1 4)(1 3) 的操作次序交换外侧两点，最短 3 步。', intent='同一群、同一目标，换生成元与布局；5 步转盘题变成 3 步中转题。', pair='borrowed_scissors'),
        dict(id='moving_greenhouse', title='花房搬家', chapter='更大的小机关', scene='exchange', tag='整间屋子借过来', subtitle='转花的把手只有左边才有。试试让整间花房换个位置。', points=twins, ops=[left3, op('exchange', '交换花房', '两组三枚徽章，整组换边', [[0, 3], [1, 4], [2, 5]], 'exchange', centers=[[240, 235], [560, 235]], blocks=[[0, 1, 2], [3, 4, 5]])], initial=[0, 1, 2, 5, 3, 4], group='C₃ ≀ C₂', expected_order=18,
             hints=['这枚把手搬动的是整组。换边后，原来右侧的颜色就能碰到左侧的工具。', '搬过来，转一格，再搬回去。'], discovery='有时，要借的是一整间屋子。', math='左侧三循环与整组交换生成 (C₃ × C₃) ⋊ C₂，即 C₃ ≀ C₂，群阶 18。两组三点构成块系统；交换把左侧局部操作共轭为右侧操作。', intent='把借位扩大到整组结构；整间花房沿相反的圆弧交换，保持组内朝向。'),
        dict(id='far_side_moon', title='月的背面', chapter='更大的小机关', scene='quaternion', tag='殊途，同一轮月', subtitle='两道月门，两条不同的路。让星位重新吻合。', points=circle(400, 235, 164, 4) + circle(400, 235, 84, 4, -math.pi / 4), ops=[op('moon', '绕月而行', '内外两圈，一起顺转', [[0, 1, 2, 3], [4, 5, 6, 7]], 'orbit', centers=[[400, 235], [400, 235]], angles=[math.pi / 2, math.pi / 2]), op('tide', '穿过潮门', '两条交织的路径，各前进一站', [[0, 4, 2, 6], [1, 7, 3, 5]])], initial=[2, 3, 0, 1, 6, 7, 4, 5], group='Q₈', expected_order=8,
             hints=['先连续使用同一枚把手，看看两次之后发生什么。', '修好之后，也可以重来，换另一枚把手试两次。'], discovery='走两次月门，或两次潮门，竟会抵达同一处。', math='生成元 i=(1 2 3 4)(5 6 7 8)、j=(1 5 3 7)(2 8 4 6) 满足 i²=j²≠e、i⁴=e、jij⁻¹=i⁻¹，生成八阶四元数群 Q₈。此关是有意安排的两步休息关，可用两种不同把手完成。', intent='八枚独色徽章的繁复外观藏着两步解，作为终关前的轻巧惊喜；不以群阶制造难度。'),
        dict(id='only_a_breeze', title='只留一阵风', chapter='工坊的压轴', scene='overlap', tag='让多余的变化散去', subtitle='只有三枚颜色错了。让两阵风经过，再把多余的变化带走。', points=overlap, ops=[op('left', '左边的风', '左环四枚徽章走一格', [[0, 1, 2, 3]], 'orbit', centers=[[260, 238]], angles=[math.pi / 2]), op('right', '右边的风', '右环四枚徽章走一格', [[3, 4, 5, 6]], 'orbit', centers=[[520, 238]], angles=[math.pi / 2])], scramble=[('left', 1), ('right', 1), ('left', -1), ('right', -1)], group='S₇', expected_order=5040,
             hints=['中间的位置属于两个环。四枚已经正确的颜色，也可以暂时离开。', '两边各动一次，再依次反向拨回。留意为什么最后只有交点附近发生了变化。'], discovery='两阵风来过，留下的变化恰好够用。', math='两个只共享一个位置的四循环 (1 2 3 4)、(4 5 6 7) 生成 S₇。适当组合两者与逆操作，可以留下一个三循环，这就是交换子的局部效果。', intent='以可见的局部变化收束全篇；7! 个可达状态中的四步小魔术。'),
    ]
    levels.extend(collection_two(circle, op))
    levels.extend(collection_three(circle, op))
    levels.extend(collections_four_five(circle, op))
    levels.extend(collections_six_ten(circle, op))
    for index, level in enumerate(levels):
        level['number'] = index + 1
        level['revision'] = 1
        level['target'] = list(range(len(level['points'])))
        if 'scramble' in level:
            state = tuple(level['target'])
            operations = {operation['id']: operation for operation in level['ops']}
            for key, direction in level.pop('scramble'):
                state = apply(state, operations[key], direction)
            level['initial'] = list(state)
        previous, distances = explore(level['initial'], level['ops'])
        assert len(previous) == level['expected_order'], (level['id'],len(previous))
        goal = tuple(level['target'])
        assert goal in previous and goal != tuple(level['initial'])
        certificate = []
        state = goal
        while previous[state] is not None:
            state, move = previous[state]
            certificate.append(move)
        level['certificate'] = list(reversed(certificate))
        level['shortest'] = len(certificate)
        level['group_order'] = level.pop('expected_order')
        level['diameter'] = max(distances.values())
        for operation in level['ops']:
            operation['notation'] = notation(operation['cycles'])
    return levels


def main():
    levels = make_levels()
    data = json.dumps(levels,ensure_ascii=False,indent=2)
    (ROOT / 'web-native/levels.js').write_text('(function(root){\nconst levels = ' + data + ';\nif(typeof module === "object" && module.exports) module.exports = levels;\nelse root.WorkshopLevels = levels;\n})(globalThis);\n')
    report = [{key:level[key] for key in ['number','id','group','group_order','shortest','diameter','certificate','intent']} for level in levels]
    (ROOT / 'docs/native-level-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    for level in levels:
        print(f"{level['number']:02} {level['title']} | {level['group']} order={level['group_order']} | shortest={level['shortest']} diameter={level['diameter']}")


if __name__ == '__main__':
    main()
