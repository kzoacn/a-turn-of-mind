"""Fifty authored mechanisms: rhythm, reflections, gardens, stars and a finale.

Every starting position is chosen for a visible effect.  Group orders and
distances are checked independently by design_web_levels.py and the JS tests.
"""
import math
from copy import deepcopy

if __package__:
    from .web_collection_two import cycles_of
    from .web_collection_three import collection_three
    from .web_collections_four_five import collections_four_five
else:
    from web_collection_two import cycles_of
    from web_collection_three import collection_three
    from web_collections_four_five import collections_four_five


def collections_six_ten(circle, op):
    levels = []

    def add(key, title, room, scene, points, operations, group, order, subtitle,
            hints, discovery, math_note, *, initial=None, word=None, **extra):
        assert initial is not None or word
        item = dict(id=key, title=title, chapter=room, scene=scene,
                    points=points, ops=operations, group=group, expected_order=order,
                    subtitle=subtitle, tag=discovery, hints=hints,
                    discovery=discovery, math=math_note, intent=subtitle, **extra)
        if initial is not None:
            item['initial'] = initial
        else:
            item['scramble'] = word
        levels.append(item)
        return item

    def perm(key, title, caption, mapping, **kwargs):
        return op(key, title, caption, cycles_of(mapping), **kwargs)

    def wheel(key, title, cycle, center, step=1):
        n = len(cycle)
        mapping = list(range(max(cycle)+1))
        for i, source in enumerate(cycle):
            mapping[source] = cycle[(i+step) % n]
        cs = cycles_of(mapping)
        return op(key, title, f'这一圈的颜色前进{step}格', cs, 'orbit',
                  centers=[center for _ in cs], angles=[math.tau*step/n for _ in cs])

    def linked(key, title, cycles, centers, steps):
        cs, pivots, angles = [], [], []
        for cycle, center, step in zip(cycles, centers, steps):
            part = wheel(key, title, cycle, center, step)
            cs += part['cycles']; pivots += part['centers']; angles += part['angles']
        return op(key, title, '几处颜色按各自节拍一起走', cs, 'orbit', centers=pivots, angles=angles)

    def beats(counts, centers, radii):
        points, cycles, dials = [], [], []
        for n, center, radius in zip(counts, centers, radii):
            cycles.append(list(range(len(points),len(points)+n)))
            points += circle(*center, radius, n)
            dials.append(dict(center=center, radius=radius, count=n))
        return points, cycles, dials

    def beat_level(key, title, counts, centers, radii, ops_fn, group, order,
                   subtitle, hints, discovery, note, **extra):
        points, cycles, dials = beats(counts, centers, radii)
        return add(key, title, '第六间 · 合拍', 'beat_garden', points, ops_fn(cycles),
                   group, order, subtitle, hints, discovery, note, dials=dials, **extra)

    twin_centers = [[240,235],[560,235]]
    beat_level('five_beat_echo', '五拍与回声', [2,5], twin_centers, [72,112],
        lambda c:[linked('two','拨过两拍',c,twin_centers,[2,2]),linked('three','拨过三拍',c,twin_centers,[3,3])],
        'C₁₀',10,'两拍的小铃与五拍的花，想要一起向前走一拍。',
        ['每枚把手都把两边带走相同的拍数，绕满一圈就会回来。','先借三拍，再退回两拍，便各自留下一拍。'],
        '不同的周期，也能借同一拍。','设 g=(1 2)(3 4 5 6 7)，阶为 10。把手是 g²、g³，生成 C₁₀，g³g⁻²=g。',
        initial=[1,0,3,4,5,6,2])
    beat_level('twelve_hour_duet','十二时二重奏',[3,4],twin_centers,[104,104],
        lambda c:[linked('same','一起顺行',c,twin_centers,[1,1]),linked('opposite','花逆钟顺',c,twin_centers,[-1,1])],
        'C₁₂',12,'花已经开对了，时钟却差半圈。让两阵风替它独自走完。',
        ['两种把手对花的影响相反，对钟的影响相同。','各用一次，花的来回相消，钟留下半圈。'],
        '两阵风合拍，花便停在原处。','互不相交的三循环 a 与四循环 b 生成 C₃×C₄≅C₁₂。两把手 ab、a⁻¹b 的乘积为 b²。',
        initial=[0,1,2,5,6,3,4])
    beat_level('bell_borrows_quarter','铃借一刻',[2,4],twin_centers,[72,106],
        lambda c:[linked('both','铃钟同走',c,twin_centers,[1,1]),wheel('bell','只拨小铃',c[0],twin_centers[0])],
        'C₂ × C₄',8,'时钟只差一格。小铃会跟着动，但也有自己的归途。',
        ['先让时钟走到想要的位置。','再把顺带交换的小铃还回来。'],
        '借走的一声铃，可以单独归还。','把手 ab 与 a 生成 C₂×C₄。用 a 抵消联动中的二循环，只留下四循环 b。',
        initial=[0,1,5,2,3,4])
    triple_centers=[[200,235],[400,235],[600,235]]
    beat_level('three_linked_bells','三盏联动铃',[2,2,2],triple_centers,[66,66,66],
        lambda c:[linked('west','前两盏一起',c[:2],triple_centers[:2],[1,1]),linked('east','后两盏一起',c[1:],triple_centers[1:],[1,1]),linked('all','三盏齐响',c,triple_centers,[1,1,1])],
        'C₂ × C₂ × C₂',8,'只有最左边错了。把总会一起响的铃，拼成一声独奏。',
        ['一次拨动可以暂时带走正确的两盏。','三盏齐响之后，再让后两盏一起回来。'],
        '合声减去合声，留下最左的一盏。','三个位置轨道各有两点。生成元 ab、bc、abc 生成 C₂³，(abc)(bc)=a；与八点立体翻转采用不同的作用。',
        initial=[1,0,2,3,4,5])
    beat_level('two_fast_windows','两扇快慢窗',[4,4],twin_centers,[98,98],
        lambda c:[linked('left_fast','左快右慢',c,twin_centers,[2,1]),linked('right_fast','左慢右快',c,twin_centers,[1,2])],
        'C₄ × C₄',16,'快的走半圈，慢的走一格。让右边归还，左边独自前行。',
        ['两次左快右慢，会让左边转满一圈。','从这两次变化中减去一次左慢右快，看看右边是否相消。'],
        '两种快慢，仍能织出独行。','把手 a²b 与 ab² 在模 4 指数空间中的行列式为 3，可逆，故生成 C₄×C₄。',
        initial=[3,0,1,2,4,5,6,7])
    beat_level('mirror_keeps_flower','借镜留花',[3,3],twin_centers,[108,108],
        lambda c:[linked('both','两花同转',c,twin_centers,[1,1]),op('mirror','左花照镜','只交换左花的下方两枚',[[1,2]],'mirror')],
        'S₃ × C₃',18,'右花想走一格，左花却会跟着走。让左侧镜面替它消掉这阵风。',
        ['照镜会把左花的转动方向反过来。','把镜面穿插在两次同转中，左边相消，右边留下变化。'],
        '镜子留住花，风继续向右。','同步三循环 ab 与左侧反射 s 生成 S₃×C₃。s(ab)s=a⁻¹b，两个联动相乘得到 b²。',
        initial=[0,1,2,4,5,3])
    tri_centers=[[240,235],[480,156],[625,305]]
    beat_level('season_two_bells','四季与两盏铃',[4,2,2],tri_centers,[102,57,57],
        lambda c:[linked('first','四季与上铃',[c[0],c[1]],[tri_centers[0],tri_centers[1]],[1,1]),linked('second','四季与下铃',[c[0],c[2]],[tri_centers[0],tri_centers[2]],[1,1]),linked('all','四季双铃',c,tri_centers,[1,1,1])],
        'C₄ × C₂ × C₂',16,'四季想前进一格，两盏铃都想留下。借三种联动来安排。',
        ['前两种联动相加时，四季走了两格，两盏铃各动一次。','再反拨一次四季双铃，多余的一格和两声铃一起消失。'],
        '三种联动，恰好留下一季。','把手 ab、ac、abc 生成 C₄×C₂²，(ab)(ac)(abc)⁻¹=a。',
        initial=[1,2,3,0,4,5,6,7])
    beat_level('flower_waits_fifth','花等第五拍',[3,5],twin_centers,[101,112],
        lambda c:[linked('same','两花同向',c,twin_centers,[1,1]),linked('apart','三顺五逆',c,twin_centers,[1,-1])],
        'C₁₅',15,'三瓣花绕回来时，五瓣花恰好要多走一格。',
        ['左花无论用哪枚把手，都按三拍走。','两次同向加一次三顺五逆，左边满圈，右边只留一格。'],
        '一边完整归来，一边刚好出发。','C₃×C₅≅C₁₅。把手 ab 与 ab⁻¹ 满足 (ab)²(ab⁻¹)=b，故三步可单独前进五瓣花。',
        initial=[0,1,2,4,5,6,7,3])
    beat_level('two_mirrors_one_bell','两面镜一声铃',[4,2],twin_centers,[106,72],
        lambda c:[wheel('turn','四季轮转',c[0],twin_centers[0]),op('first','第一面镜','方窗的左右两枚交换',[[1,3]],'mirror'),op('second','带铃的镜','方窗上下交换，小铃也一起响',[[0,2],[4,5]],'mirror')],
        'D₄ × C₂',16,'只把右边的小铃翻过来。两面镜留下的半圈，也记得收回。',
        ['两面镜合起来，会让方窗半转，并拨响小铃。','再用转轮消去方窗的半圈。'],
        '镜中多出来的半圈，也有归途。','两面相垂直的反射乘积为方窗半转。第二面镜同时带动独立二循环，生成 D₄×C₂，阶 16。',
        initial=[0,1,2,3,5,4])
    tri_centers=[[400,115],[232,285],[568,285]]
    beat_level('three_voice_concert','三声合奏',[2,3,3],tri_centers,[58,91,91],
        lambda c:[linked('left','铃与左花',[c[0],c[1]],tri_centers[:2],[1,1]),linked('right','铃与右花',[c[0],c[2]],[tri_centers[0],tri_centers[2]],[1,1])],
        'C₂ × C₃ × C₃',18,'两朵花各差一格，小铃也要换位。让长短不同的回程合在一起。',
        ['三瓣花正转一格，也可以反转两格。小铃却会数清你拨了几次。','让其中一朵花多走那条回程路，小铃就会留下需要的一次换位。'],
        '同一个终点，也能带回不同的回声。','两把手 ab 与 ac 生成 C₂×C₃²。三循环的两条等效路径长度奇偶不同，可改变二循环的净效果。',
        initial=[1,0,4,2,3,7,5,6])

    # Folded circular scales: the paths depict the actual permutations.
    def scale(n, key, title, mapping, motion='curve'):
        return perm(key,title,'沿预览中的刻度路线移动',mapping,motion=motion)
    ring7=circle(400,235,151,7); ring8=circle(400,235,151,8)
    add('seven_mirror_gallery','七面镜廊','第七间 · 折光','scale_mirror',ring7,
        [scale(7,'first','顶点镜面',[(-i)%7 for i in range(7)],'mirror'),scale(7,'second','斜向镜面',[(1-i)%7 for i in range(7)],'mirror')],
        'D₇',14,'这里只能照镜，却要让整个图案走过两格。',
        ['两面不同的镜子连用，会留下转动。','先找出两次照镜合成的一格，再把这段动作重复一次。'],
        '镜面接起镜面，脚步就绕过圆环。','两反射 x↦−x 与 x↦1−x 的乘积是模 7 平移，生成 D₇，阶 14。',
        initial=[5,6,0,1,2,3,4], mirrorAngles=[0,math.pi/7])
    eight_initial=[1,2,3,4,5,6,7,0]
    add('octagonal_lamp','八角灯罩','第七间 · 同一束光','scale_mirror',ring8,
        [wheel('stride','跨三格转',list(range(8)),[400,235],3),scale(8,'mirror','竖直镜面',[(-i)%8 for i in range(8)],'mirror')],
        'D₈',16,'灯罩只差一格，把手却一次跨三格。看看绕圈能借来多少。',
        ['八格是一整圈，多走一圈也会回到同一个朝向。','三次三格一共走九格，恰好多出一格。'],
        '绕过一整圈，仍只留下一格。','r³ 与 s 生成 D₈，因为 3 在模 8 下可逆。目标是一格平移，最短三步。',
        initial=eight_initial,pair='octagonal_two_mirrors',mirrorAngles=[0])
    add('octagonal_two_mirrors','双镜借八角','第七间 · 同一束光','scale_mirror',ring8,
        [scale(8,'first','第一面镜',[(-i)%8 for i in range(8)],'mirror'),scale(8,'second','第二面镜',[(1-i)%8 for i in range(8)],'mirror')],
        'D₈',16,'还是那一格。这次，让两面挨近的镜子替灯罩转过去。',
        ['两次翻转之后，图案的顺序会恢复。','先后试一下两面镜，顺序决定转动的方向。'],
        '同样的一格，换两面镜就近了。','与第 62 关同为 D₈，初态与目标相同。生成元改成两个反射，最短从三步变成两步。',
        initial=eight_initial,pair='octagonal_lamp',mirrorAngles=[0,math.pi/8])
    r8=wheel('turn','刻度走一格',list(range(8)),[400,235])
    fold3=scale(8,'fold','三折刻度',[3*i%8 for i in range(8)])
    fold5=scale(8,'fold','五折刻度',[5*i%8 for i in range(8)])
    add('threefold_scale','星盘三折','第七间 · 刻度里的暗道','folded_scale',ring8,[r8,fold3],
        'C₈ ⋊₍₃₎ C₂',16,'一格小步经过折路之后，会变成三格。借这条暗道还原星盘。',
        ['折路两次就会复原，但夹在中间的一格会改走别处。','试着把折路和一格移动交换先后，观察等效的是几格。'],
        '同一小步，穿过折路便走得更远。','r:x↦x+1，s:x↦3x（模 8），满足 srs=r³。生成阶 16 的半二面体群；下标 3 指该共轭作用。',
        word=[('turn',1),('fold',1)],foldFactors=[3])
    add('odd_marks_return','奇数刻度归来','第七间 · 刻度里的暗道','folded_scale',ring8,[r8,fold5],
        'C₈ ⋊₍₅₎ C₂',16,'这条折路只换走一半刻度。把它借到另一半，拼出整圈半转。',
        ['五折刻度交换奇数位置，偶数位置留下。','移一格后再折一次，便能照顾另一半，最后收回借位。'],
        '一半加上另一半，星盘转过半圈。','r:x↦x+1，s:x↦5x（模 8），满足 srs=r⁵。srsr⁻¹=r⁴；该阶 16 的半直积与上一关不同。',
        initial=[4,5,6,7,0,1,2,3],foldFactors=[5])
    fivefold=deepcopy(fold5);fivefold['id']='five'
    add('two_folds_make_mirror','两折成镜','第七间 · 刻度里的暗道','folded_scale',ring8,[r8,fold3,fivefold],
        'C₈ ⋊ (C₂ × C₂)',32,'没有镜面把手，却要把环上的次序翻过来。',
        ['两条折路的作用可以连着看。','三折之后再五折，每个刻度最终会走到相反编号。'],
        '两次不同的折路，合成一面镜。','模 8 的单位 3、5 生成 {1,3,5,7}。两折相乘为 x↦7x=−x，整体仿射群阶为 8×4=32。',
        initial=[(-i)%8 for i in range(8)],foldFactors=[3,5])

    page_points=[[cx+dx,235+dy] for cx in [240,560] for dx,dy in [(-75,-75),(75,-75),(75,75),(-75,75)]]
    panels=[[0,1,2,3],[4,5,6,7]]
    left_page=wheel('left','左页转动',panels[0],[240,235]);left_page['turnFrame']=True
    page_swap=op('pages','交换两页','两页整组换边，朝向保留',[[0,4],[1,5],[2,6],[3,7]],'exchange',centers=twin_centers,blocks=panels,spread=.7,turnFrame=True)
    both_pages=linked('both','两页同转',panels,twin_centers,[1,1]);both_pages['turnFrame']=True
    add('paired_pages_same_wind','双页同一阵风','第七间 · 页与镜','pages',page_points,[both_pages,page_swap],
        'C₄ × C₂',8,'两页需要一起半转，还要交换位置。把两件事分开安排。',
        ['同步转动不会改变哪一页在左边。','先转半圈再换页，或先换页再转，结果相同。'],
        '同转与换页，各有各的归途。','同步四循环与整页交换可交换，生成 C₄×C₂，采用八点正则作用。',
        word=[('both',1),('both',1),('pages',1)],panels=panels)
    horizontal=op('across','左页横镜','左页两对颜色左右交换',[[0,1],[2,3]],'mirror')
    vertical=op('down','左页纵镜','左页两对颜色上下交换',[[0,3],[1,2]],'mirror')
    add('cross_mirror_pages','双页十字镜','第七间 · 页与镜','pages',page_points,[horizontal,vertical,page_swap],
        '(C₂ × C₂) ≀ C₂',32,'左页要横翻，右页要半转。两面镜都只装在左边。',
        ['左右翻与上下翻合起来，就是一页的半转。','先整理左页，再借来右页照两面镜，最后换回。'],
        '两面小镜，也能替两页分工。','每页的横纵双换位生成 Klein 四元群 C₂²，整页交换得到 (C₂²)≀C₂，阶 4²×2=32。',
        initial=[1,0,3,2,6,7,4,5],panels=panels)
    page_goal=[3,0,1,2,4,7,6,5]
    page_reflect=op('mirror','左页对角镜','左页一对对角位置交换',[[1,3]],'mirror')
    add('mirror_page_windmill','镜页风车','第七间 · 两种页角工具','pages',page_points,[left_page,page_reflect,page_swap],
        'D₄ ≀ C₂',128,'左页要转一格，右页要照镜。把同一套工具借给两页。',
        ['工具只影响左页，整页交换能把右页送来。','一页转动，一页照镜，再把两页放回原处。'],
        '同一套工具，借给不同的一页。','局部方形对称 D₄ 与两页交换生成 D₄≀C₂，阶 8²×2=128。',
        initial=page_goal,pair='page_corner_scissors',panels=panels)
    add('page_corner_scissors','页角小剪刀','第七间 · 两种页角工具','pages',page_points,
        [left_page,op('cut','左页邻角换位','只交换左页上方相邻两枚',[[0,1]]),page_swap],
        'S₄ ≀ C₂',1152,'还是两页的同一个目标。对角镜换成了只能剪相邻页角的工具。',
        ['相邻换位可以拼出对角换位，但需要把中间的颜色借来。','先在一页上找到对角交换的短动作，再借给另一页使用。'],
        '一把小剪刀，能织出更多页内变化。','局部四循环与相邻换位生成 S₄，整页交换得到 S₄≀C₂，阶 24²×2=1152。与第 69 关同目标，群和基本工具均不同。',
        initial=page_goal,pair='mirror_page_windmill',pairNote='同一个目标，这次能任意排列每页的四枚颜色，但对角交换需要先用邻角工具拼出来。',panels=panels)

    corners=[[285,120],[515,120],[515,350],[285,350]]
    add('two_garden_gates','两扇对门','第八间 · 游园','garden_gates',corners,
        [op('side','横过花园','两行各自交换',[[0,1],[2,3]],'mirror'),op('rise','纵过花园','两列各自交换',[[0,3],[1,2]],'mirror')],
        'C₂ × C₂',4,'四位客人都去了对角。两扇小门，足够把他们送回来。',
        ['横过一次，再纵过一次，便会到达对角。','两扇门先后顺序不同，终点仍然相同。'],
        '一横一纵，正好抵达对角。','两种双换位生成 C₂²，在四个角上正则作用；第三个非平凡元素是对角双换位。',
        initial=[2,3,0,1])
    centers=circle(400,235,126,4)
    rooms=[[2*i,2*i+1] for i in range(4)]
    room_points=[[x+dx,y] for x,y in centers for dx in [-37,37]]
    room_orbit=op('tour','四室巡游','四间小屋顺行一站，屋内朝向保留',[[0,2,4,6],[1,3,5,7]],'carousel',blocks=rooms,centers=centers,pivot=[400,235],angle=math.pi/2)
    room_pair=op('pair','邻屋双铃','上方与右方小屋同时换座',[[0,1],[2,3]])
    room_opposite=op('pair','隔屋双铃','上方与下方小屋同时换座',[[0,1],[4,5]])
    all_rooms=[1,0,3,2,5,4,7,6]
    add('neighbor_room_bells','邻屋双铃','第八间 · 同一园路','room_parade',room_points,[room_orbit,room_pair],
        'C₂³ ⋊ C₄',32,'四间屋都要换座，但铃一次只照顾相邻两间。沿园路把它借出去。',
        ['修好两间后，另一对需要来到铃旁。','可以把修好的两间送到对面，再处理余下两间，最后归还朝向。'],
        '两间接着两间，整座花园归位。','旋转四间屋与相邻两屋换座生成偶数次局部翻转 C₂³，再与 C₄ 半直积，阶 32。',
        initial=all_rooms,pair='opposite_room_bells',rooms=rooms,centers=centers)
    add('opposite_room_bells','隔屋双铃','第八间 · 同一园路','room_parade',room_points,[room_orbit,room_opposite],
        '(C₂ × C₂) ⋊ C₄',16,'还是四间屋。这次铃照顾相对的两间，一次转向就能接上余下两间。',
        ['上下来过之后，左右需要同样的一声铃。','换座、转一站、再换座，最后把小屋转回来。'],
        '铃声隔屋相接，归途也短了一些。','相对两屋翻转的旋转共轭只生成 C₂²，C₄ 交换两个生成元，整体阶 16。与第 72 关同目标，子群与工具都不同。',
        initial=all_rooms,pair='neighbor_room_bells',pairNote='目标相同，铃从相邻两间改成相对两间，可达状态也从 32 个变成 16 个。',rooms=rooms,centers=centers)
    tree_points=[[134+i*76,336] for i in range(8)]
    add('upstairs_downstairs','上楼下楼','第八间 · 借一层位置','branch_tree',tree_points,
        [op('twig','一对叶子','最左边一对叶子交换',[[0,1]]),op('branch','两枝换边','左半边的两对叶子整组交换',[[0,2],[1,3]]),op('crown','两冠换边','左右各四枚整组交换',[[0,4],[1,5],[2,6],[3,7]])],
        'D₄ ≀ C₂',128,'工具在最左端，想换的却是最右端一对。借大枝，再借小枝。',
        ['先把右半棵树借到左边，目标仍在这一半的右端。','再借一次小枝，换好叶子后按相反次序归还两层。'],
        '借位可以一层一层，归还也一样。','三层二叉树的叶子置换保持逐层二点分块，生成三次 C₂ 迭代圈积，阶 2⁷=128，同构 D₄≀C₂。',
        initial=[0,1,2,3,4,5,7,6])
    room_exchange=op('rooms','两屋换站','上方与右方的整间屋交换',[[0,2],[1,3]])
    one_bell=op('bell','一屋换座','只交换最上方屋里的两枚',[[0,1]])
    opposite_seats=[1,0,2,3,5,4,6,7]
    add('four_rooms_everywhere','四室各有门','第八间 · 换一声铃','room_parade',room_points,[room_orbit,room_exchange,one_bell],
        'C₂ ≀ S₄',384,'相对两间需要换座。房间能沿路走，也能临时换站。',
        ['换站搬的是整间屋，换座只动屋里的一对。','两间分别送到上方处理，最后把它们的站位也恢复。'],
        '先安排房间，再安排房内的座位。','四个二点块可独立翻转，块间由四循环与相邻换位生成 S₄，因此群为 C₂≀S₄，阶 16×24=384。',
        initial=opposite_seats,pair='paired_doors',rooms=rooms,centers=centers)
    add('paired_doors','成双开门','第八间 · 换一声铃','room_parade',room_points,[room_orbit,room_exchange,room_pair],
        'C₂³ ⋊ S₄',192,'还是相对的两间。这次铃总成双响，把它们先并排送来。',
        ['先用换站或巡游，让要处理的两间占住相邻铃位。','成双换座之后，把房间送回原来的位置。'],
        '合适的两间并排，一声铃便足够。','双屋翻转的 S₄ 共轭生成偶重量子空间 C₂³，整体为 C₂³⋊S₄，阶 8×24=192，是上一关的指数 2 子群。',
        initial=opposite_seats,pair='four_rooms_everywhere',pairNote='初态和目标相同。这次只允许偶数间屋同时换座，合适的一次成双操作便能完成两份工作。',rooms=rooms,centers=centers)
    rail_points=[[154+i*82,235+(-1 if i%2 else 1)*53] for i in range(7)]
    rail_cut=op('cut','站口换位','只交换最左边相邻两站',[[0,1]])
    rail_goal=[0,3,2,1,4,5,6]
    add('alternating_shuttles','两班接驳车','第八间 · 同一封远信','shuttle_rail',rail_points,
        [op('odd','第一班车','三段不相接的站间桥同时交换',[[0,1],[2,3],[4,5]]),op('even','第二班车','错开一站的三段桥同时交换',[[1,2],[3,4],[5,6]]),rail_cut],
        'S₇',5040,'隔一站的两位客人想交换，接驳车却总带动三座桥。把其他旅客送回原站。',
        ['两班车交替可以让客人沿路走。站口的小桥可以只处理一对。','先把需要的变化借到站口，再沿原来的接驳次序返回。'],
        '一整班车，也能只留下两人的换位。','两组交错换位生成七点二面体作用，加入站口单换位后生成 S₇。',
        initial=rail_goal,pair='seven_stop_loop')
    add('seven_stop_loop','七站环线','第八间 · 同一封远信','shuttle_rail',rail_points,
        [op('route','环线一站','七站依次前行，末站回到站口',[list(range(7))]),rail_cut],
        'S₇',5040,'还是隔一站的两位客人，接驳车换成了一条完整环线。',
        ['小桥只交换相邻两枚，可以借中间的颜色接力。','把跨一站的交换拆成三次相邻交换，再用环线把小桥送到相应的位置。'],
        '同一封信，换条线路来送。','七循环与相邻换位生成 S₇，与第 77 关的初态、目标和可达状态完全相同，改变的是生成元。',
        initial=rail_goal,pair='alternating_shuttles')
    a=op('leaf','三叶回旋','左页前三角依次轮换',[[0,1,2]])
    linked_leaf=op('linked','花钟联动','左页后三角轮换，右钟同时走一格',[[1,2,3],[4,5,6,7]])
    add('three_leaves_one_quarter','三叶等一刻','第八间 · 园中的小停顿','petal_pages',page_points,[a,linked_leaf],
        'A₄ × C₄',48,'右边的钟差一格，左边的花想原样留下。让三叶先绕满一圈。',
        ['花钟联动的两侧，分别按三拍和四拍走。','连续反拨三次，左侧回到原处，右侧恰好等于顺走一格。'],
        '等花完整归来，时钟恰好走了一刻。','两个相交三循环生成左侧 A₄。联动三循环与右四循环因互素周期可分别取出，整体为 A₄×C₄，阶 48。',
        initial=[0,1,2,3,5,6,7,4],panels=panels)
    right_page=wheel('right','右页转动',panels[1],[560,235]);right_page['turnFrame']=True
    add('two_gardens_return','双园归席','第八间 · 两边都要归还','petal_pages',page_points,
        [left_page,right_page,op('cut','双园小剪刀','两页的上边各交换一对',[[0,1],[4,5]])],
        'S₄ × S₄',576,'两园的错位在不同位置，剪刀却总同时剪两边。让两边分别对齐。',
        ['左右转动可以独立安排，剪刀使用时要同时照顾两边。','把两园需要交换的边分别送到上方，一起处理，再分别归还。'],
        '两边各自借位，在同一刻归席。','两个独立四循环与同步相邻双换位生成 S₄×S₄，阶 576。目标可通过分别对齐、共同换位、分别归还实现。',
        initial=[0,1,3,2,4,6,5,7],panels=panels)

    def projective(q):
        points=circle(440,235,139,q)+[[225,235]]
        turn=wheel('orbit','星轮前行',list(range(q)),[440,235])
        inversion=[q if i==0 else (-pow(i,-1,q))%q for i in range(q)]+[0]
        bridge=perm('far','穿过远点','侧边远点与星轮一起按弧线换位',inversion)
        return points,turn,bridge

    p5,t5,j5=projective(5)
    add('five_stars_far_point','五星借远点','第九间 · 织星','projective_post',p5,[t5,j5],
        'A₅',60,'远点与星轮牵着两条桥。把整组换位借到另一段星路上。',
        ['先留意远点把手交换哪两对，又留下哪两枚。','转过两站，借用远点，再把星轮原路送回。'],
        '远点留下的路，也能沿星轮搬走。','六个位置标记射影直线 F₅∪{∞}。x↦x+1 与 x↦−1/x 生成 PSL(2,5)≅A₅；这是 A₅ 的六点作用。',
        word=[('orbit',1),('orbit',1),('far',1),('orbit',-1),('orbit',-1)],fieldPrime=5,haloCenter=[440,235],haloRadius=139)
    m5=perm('measure','换一把星尺','远点与零星留下，其余四枚重新轮换',[2*i%5 for i in range(5)]+[5])
    add('far_point_new_measure','远点换尺','第九间 · 织星','projective_post',p5,[t5,j5,m5],
        'S₅',120,'新星尺只留下两处不动。先借一格星轮，让它接住另一枚外星。',
        ['星轮能改变哪一枚外星停在尺子的起点。','先让星轮走一站，换尺，再把星轮原路归还。'],
        '尺子留下谁，也可以临时改变。','加入 x↦2x 后生成 PGL(2,5)≅S₅，阶 120，仍作用在六个位置上。',
        word=[('orbit',1),('measure',1),('orbit',-1)],fieldPrime=5,haloCenter=[440,235],haloRadius=139)
    p7,t7,j7=projective(7)
    m7=perm('measure','星尺双行','远点与零星留下，其余六枚分两路轮换',[2*i%7 for i in range(7)]+[7])
    # Both tools sets solve this particular conjugated scaling; no random scramble.
    far_target=list(range(8))
    for move,direction in [(j7,1),(t7,1),(m7,1),(t7,-1),(j7,1)]:
        next_state=far_target.copy()
        for cycle in move['cycles']:
            for i,source in enumerate(cycle):next_state[cycle[(i+direction)%len(cycle)]]=far_target[source]
        far_target=next_state
    add('seven_stars_far_voyage','七星远航','第九间 · 同一张星图','projective_post',p7,[t7,j7],
        'PSL(2,7)',168,'四座桥会一起动。把星轮与远点交替借来，接起两条三站路线。',
        ['目标只轮换六枚，另外两枚需要最后留下。','远点会改变星轮的落脚方式，尝试把短转动夹在两次远点之间。'],
        '星轮借过远点，织出另一种轮换。','射影直线 F₇∪{∞} 上，平移与负倒数生成 PSL(2,7)≅GL(3,2)，阶 168。与七星织网同构，但这里作用在八个位置上。',
        initial=far_target,pair='voyage_second_measure',fieldPrime=7,haloCenter=[440,235],haloRadius=139)
    add('voyage_second_measure','远航的另一把尺','第九间 · 同一张星图','projective_post',p7,[t7,j7,m7],
        'PSL(2,7)',168,'还是同一张星图。多出的一把尺，恰好能织出想要的两路轮换。',
        ['这把尺本来就沿两条三站路线走。','先借远点，再借星轮一站；换尺后把借来的两段位置依次归还。'],
        '合适的尺，把长路折成短路。','2 是模 7 的平方数，x↦2x 已在 PSL(2,7) 中。新增生成元不改变群、初态或目标，只改变最短操作距离。',
        initial=far_target,pair='seven_stars_far_voyage',fieldPrime=7,haloCenter=[440,235],haloRadius=139)
    old=collections_four_five(circle,op)
    field=old[7]
    def gf_mul(a,b):
        result=0
        for _ in range(3):
            if b&1:result^=a
            b>>=1;a=((a<<1)^(11 if a&4 else 0))&7
        return result
    square=perm('echo','星路回文','两枚留下，其余六枚分两路轮换',[gf_mul(i,i) for i in range(8)])
    add('eight_star_palindrome','八星回文','第九间 · 星路的另一种回声','semilinear_halo',field['points'],field['ops']+[square],
        'AΓL(1,8)',168,'新的回文路线留下两枚星。用星桥借来另一对，再让回文经过。',
        ['回文的两条三站路线会留下中心与一枚外星。','先用星桥与转轮借出这两个位置，回文经过后，再把借位收回来。'],
        '星桥换起点，回文便照顾另一片天。','在 F₈ 上加入 Frobenius 映射 x↦x²，得到 AΓL(1,8)，阶 8×7×3=168。它与前两关的 168 阶群不同。',
        word=[('bridges',1),('ring',1),('echo',1),('ring',-1),('bridges',1)],haloCenter=[400,235],haloRadius=148)
    fano=collection_three(circle,op)[5]
    shear_ops=[perm('first','第一道拨线','第一位跟随第二位翻转',[(i^(1 if i&2 else 0))-1 for i in range(1,8)]),
               perm('second','第二道拨线','第二位跟随第三位翻转',[(i^(2 if i&4 else 0))-1 for i in range(1,8)]),
               perm('third','第三道拨线','第三位跟随第一位翻转',[(i^(4 if i&1 else 0))-1 for i in range(1,8)])]
    add('seven_star_three_shears','七星三道线','第九间 · 借一条中间线','fano',fano['points'],shear_ops,
        'GL(3,2)',168,'想拨的那条线没有把手。借两条现成的线，再把多余的变化收回来。',
        ['两条拨线的先后顺序会影响结果。','两条线各拨一次，再按相同次序各拨一次，观察留下哪一小片变化。'],
        '借来的中间线，最后没有留下痕迹。','三个位坐标的循环初等剪切生成 GL(3,2)。[T₁₂,T₂₃] 给出缺少的 T₁₃，Fano 线关联始终保持。',
        initial=[(i^(1 if i&4 else 0))-1 for i in range(1,8)],lines=fano['lines'])
    window=old[5]; vectors=window['gridVectors']
    diagonal=perm('diagonal','斜向照镜','沿左上到右下的对角线交换位置',[vectors.index([y,x]) for x,y in vectors],motion='mirror')
    add('diagonal_mirror_window','斜镜转窗','第九间 · 旧窗的新把手','diagonal_window',window['points'],[diagonal,next(o for o in window['ops'] if o['id']=='wind')],
        'GL(2,3)',48,'熟悉的窗又换了把手。借斜镜，把横风送去另一个方向。',
        ['斜镜会交换横向和纵向的位置。','斜镜、横风、斜镜，可以拼出没有直接提供的纵风。'],
        '借一面斜镜，风就有了新的方向。','坐标交换与横向剪切仍生成 GL(2,3)。本关与第 36 关初态、目标相同，生成元改为两枚。',
        initial=window['initial'] if 'initial' in window else None,
        word=window.get('scramble'),gridVectors=vectors,pair='mirror_window_return')
    # The previous window uses authored moves; materialize its state before changing tools.
    if 'scramble' in levels[-1]:
        state=list(range(8)); by_id={o['id']:o for o in window['ops']}
        for key,direction in levels[-1].pop('scramble'):
            result=state.copy()
            for cycle in by_id[key]['cycles']:
                for i,source in enumerate(cycle):result[cycle[(i+direction)%len(cycle)]]=state[source]
            state=result
        levels[-1]['initial']=state
    cube=old[16]
    sky=cube['ops'][0]
    gate=perm('gate','折门带一层','左右受下半边控制，再把上下整层交换',[(i^(1 if i&2 else 0))^2 for i in range(8)])
    add('two_handles_star_cube','两把手的星格','第九间 · 一扇门的两次脚步','cube_shear',cube['points'],[sky,gate],
        'AGL(3,2)',1344,'折门一次会带走半边，两次却能只留下一个完整方向。借来上半边的工具。',
        ['连续使用两次折门，先看看它合成哪一种整体换位。','借转向把整体换位搬到需要的方向，再配合折门的局部影响。'],
        '同一扇门走两次，出现另一枚工具。','仿射门 (x,y,z)↦(x+y,y+1,z) 的平方为 x 方向平移。配合坐标轮换生成 AGL(3,2)，阶 1344。',
        initial=cube['initial'],vertices=cube['vertices'],edges=cube['edges'],faces=cube['faces'])
    add('one_gate_in_sky','星格开一扇门','第九间 · 八星之中的两枚','cube_shear',cube['points'],[sky,gate,op('single','一扇小门','只交换右下方深处的一对',[[6,7]])],
        'S₈',40320,'小门只接住一个角落，错位却在相反的角落。把那一小对借过来。',
        ['两把旧工具可以重新安排整片星空的方向。','先把目标边送到小门，交换之后，按相反次序把星格送回。'],
        '一扇小门，也能借到另一角。','在 AGL(3,2) 中加入单换位后生成 S₈。全局仿射工具与局部单门配合，可只改变所需的一对位置。',
        initial=[1,0,2,3,4,5,6,7],vertices=cube['vertices'],edges=cube['edges'],faces=cube['faces'],gateFace=[2,3,7,6])
    # Two regular pentagons share their facing edge, so both turns are true orbits.
    radius=132; left_center=[286,235]; right_center=[286+2*radius*math.cos(math.pi/5),235]
    left_points=circle(*left_center,radius,5,-math.pi/5)
    right_points=circle(*right_center,radius,5,-4*math.pi/5)
    joint_points=left_points+right_points[1:4]
    left_cycle=[0,1,2,3,4];right_cycle=[0,5,6,7,1]
    add('double_star_knot','双星交织','第九间 · 两枚相接的星','hinged_stars',joint_points,
        [wheel('left','左星轮转',left_cycle,left_center),wheel('right','右星轮转',right_cycle,right_center)],
        'A₈',20160,'两颗五星轮共用两枚颜色。让两阵风经过，再收回多余的脚步。',
        ['两处交接点会使来回转动留下局部变化。','试着把一段交接动作搬到另一边，再接回原来的星轮。'],
        '两处交接，织成一小段星结。','两个共享两点的五循环生成 A₈。每次转动都是偶置换，适当组合可只在交接附近留下变化。',
        word=[('left',1),('right',1),('left',-1),('right',-1),('left',1),('left',1),('right',1),('left',-1),('left',-1),('right',-1)],
        starWheels=[dict(center=left_center,radius=radius,cycle=left_cycle),dict(center=right_center,radius=radius,cycle=right_cycle)])

    five_points=circle(400,235,151,5); letter_goal=[0,3,1,2,4]
    add('circular_letter_route','环路寄信','第十间 · 归一','letter_ring',five_points,
        [wheel('turn','绕环前行',list(range(5)),[400,235]),op('bridge','站口小桥','只交换开头相邻两枚',[[0,1]])],
        'S₅',120,'三封信要依次换一个收件处，另外两封最后仍要留下。',
        ['三枚轮换可以拆成两次共享一个位置的交换。','让小桥依次接住两对需要交接的信，过程中可以顺路借位。'],
        '两次小交换，接起三封信。','五循环与相邻换位生成 S₅。本关目标为不经过位置 1 的三循环。',
        initial=letter_goal,pair='four_route_post')
    hub_points=[[400,235],[400,87],[552,235],[400,383],[248,235]]
    add('four_route_post','四路邮亭','第十间 · 同一袋信','post_hub',hub_points,
        [op(key,title,'中央与这一方向交换',[[0,i]]) for i,key,title in [(1,'north','北边邮路'),(2,'east','东边邮路'),(3,'south','南边邮路'),(4,'west','西边邮路')]],
        'S₅',120,'还是那三封信。这次借邮亭暂存一封，把交接连成一段。',
        ['中央颜色可以先寄存到一侧，最后再回来。','沿三个收件处走一遍，再回到开始的那条邮路。'],
        '一处暂存，接起四条邮路。','四个星形换位生成 S₅，与第 91 关初态、目标相同。外侧三循环可以用四次中央换位完成。',
        initial=letter_goal,pair='circular_letter_route')
    petal_ops=[op('la','左页上叶','左页前三角轮换',[[0,1,2]]),op('lb','左页下叶','左页后三角轮换',[[1,2,3]]),op('ra','右页上叶','右页前三角轮换',[[4,5,6]]),op('rb','右页下叶','右页后三角轮换',[[5,6,7]])]
    petal_goal=[3,2,1,0,7,6,5,4]
    add('two_three_leaf_letters','两张三叶笺','第十间 · 同一行笔迹','petal_pages',page_points,petal_ops,
        'A₄ × A₄',144,'两张笺都要交换两对颜色。先把一张写好，再照顾另一张。',
        ['每张笺都有两枚三叶把手，可先单独摸清一边。','一边找到的短动作，可以原样交给另一边使用。'],
        '一张笺上的发现，能写到另一张。','每页两个相交三循环生成 A₄，两页独立，整体 A₄×A₄，阶 144。',
        initial=petal_goal,pair='joined_three_leaf_letters',panels=panels)
    add('joined_three_leaf_letters','连笔三叶笺','第十间 · 同一行笔迹','petal_pages',page_points,
        [op('upper','两页上叶','两页前三角同时轮换',[[0,1,2],[4,5,6]]),op('lower','两页下叶','两页后三角同时轮换',[[1,2,3],[5,6,7]])],
        'A₄',12,'同样的两张笺，现在可以连笔写。让同一段动作同时照顾两页。',
        ['两边的错位完全对应，可以同步使用上一关的一段短动作。','两页共用把手，每次都留下同样的笔迹。'],
        '一段发现，两张笺同时归位。','两套同步三循环生成对角 A₄，阶 12。它是上一关 A₄×A₄ 的子群，同一目标可由六步缩为三步。',
        initial=petal_goal,pair='two_three_leaf_letters',pairNote='初态和目标相同。这次两页只能同步动作，生成对角 A₄；一段笔迹恰好可同时写完两页。',panels=panels)
    room_mirror=op('mirror','园路照镜','左右两间屋交换，上下两间留下',[[2,6],[3,7]],'mirror')
    add('four_room_return_song','四室折返曲','第十间 · 换条路回来','room_parade',room_points,[room_orbit,room_mirror,one_bell],
        'C₂ ≀ D₄',128,'房间的位置和屋内座位都变了。沿路修两间，再借镜面收好朝向。',
        ['先区分整间屋的去向，与屋里一对颜色的次序。','经过上方时顺手换座，园路镜面可以另行处理整体朝向。'],
        '沿路归还座位，最后收好方向。','房间可作 D₄ 对称，每间独立换座，群为 C₂≀D₄，阶 16×8=128。它与分层换位树的群同构，采用另一套生成元。',
        word=[('bell',1),('tour',1),('tour',1),('bell',1),('tour',-1),('mirror',1)],rooms=rooms,centers=centers)
    seven_chain=[[169+i*77,235+(-1 if i%2 else 1)*75] for i in range(7)]
    chain_goal=[6,0,1,2,3,4,5]
    add('seven_color_relay','七色传花','第十间 · 一口气的归途','petal_chain',seven_chain,
        [op('first','第一叶','左侧三枚轮换',[[0,1,2]]),op('middle','中间叶','中间三枚轮换',[[2,3,4]]),op('last','最后叶','右侧三枚轮换',[[4,5,6]])],
        'A₇',2520,'每片叶子只接三枚。让交接顺着一条路，带动七种颜色。',
        ['相邻叶子共用一个交接位置。','顺着路线依次转动三片叶子，留意先后次序。'],
        '三个小交接，接起一整条七色路。','三个沿链相接的三循环生成 A₇，适当顺序的乘积为一个七循环。',
        initial=chain_goal,pair='seven_color_long_relay')
    add('seven_color_long_relay','七色绕花','第十间 · 一口气的归途','petal_chain',seven_chain,
        [op('long','五色长叶','左侧五枚依次轮换',[[0,1,2,3,4]]),op('last','三色小叶','右侧三枚依次轮换',[[4,5,6]])],
        'A₇',2520,'同样的七色归途，前两段交接合成了一片长叶。',
        ['长叶一次接住五枚，小叶接住最后三枚。','在共同的位置接一次力，就能走完上一关的整段路线。'],
        '把学会的一段路，收成一枚把手。','共享一点的五循环与三循环生成 A₇。与第 96 关同初态同目标，七循环由两次基本动作完成。',
        initial=chain_goal,pair='seven_color_relay')
    gate_cut=op('bridge','门边换位','只交换顶部相邻两枚',[[0,1]])
    gates_goal=[0,1,3,2,5,4,6,7]
    add('eight_gate_journey','八门绕行','第十间 · 两封信顺路送','eight_gate_ring',ring8,[r8,gate_cut],
        'S₈',40320,'两处相邻座位都想交换。沿同一趟环行顺路处理，最后回到原朝向。',
        ['可以分别借过去修两处，也可以把它们接在一次行程里。','经过第一处换位后继续前行，处理第二处，再把总共借走的朝向收回来。'],
        '两封信，顺着同一趟环路送完。','八循环与相邻换位生成 S₈。目标为两个不相交换位，沿环路组织两次局部处理。',
        initial=gates_goal,pair='eight_gate_shortcut')
    add('eight_gate_shortcut','八门捷径','第十间 · 两封信顺路送','eight_gate_ring',ring8,
        [r8,wheel('double','跨过两门',list(range(8)),[400,235],2),gate_cut],
        'S₈',40320,'还是同一趟环行。这次把两格路收成一枚把手，走得更轻快些。',
        ['新增把手只是原来转轮的两次拨动，可达范围没有改变。','两处站点都能用两格路对齐，再把这一趟借位一起归还。'],
        '走过的长路，终于有了自己的捷径。','加入 r² 不改变 S₈，但改变生成元度量。第 98、99 关保留相同初态、目标与位置。',
        initial=gates_goal,pair='eight_gate_journey')
    add('hundredth_homecoming','百件归一','第十间 · 将一路巧思收好','century_flower',ring8,
        [op('dawn','晨光叶','上方三枚依次轮换',[[0,1,2]]),op('noon','午风叶','右下三枚依次轮换',[[2,3,4]]),op('dusk','暮色叶','下方与左侧三枚依次轮换',[[4,5,6]]),op('night','星夜叶','左上两枚与右上交接点轮换',[[1,6,7]])],
        'A₈',20160,'四片叶子牵着八种颜色。借过的位置、接过的路，这一次都收好。',
        ['每片叶子都有只能由它接住的位置，四枚把手都需要参与。','先选一枚颜色的归途，把相邻叶子的交接写成短动作，再让其他颜色沿路接上。'],
        '一百件机关，一路借来的巧思。','四个相接三循环生成 A₈。目标是四个不相交换位，仍是偶置换；每枚把手都有必须移动的专属位置，任何解都要使用四枚。',
        initial=[7,6,5,4,3,2,1,0])
    assert len(levels)==50
    return levels
