"""The second collection: ten authored structures, continuing the first collection."""
import math


def cycles_of(mapping):
    seen=set(); cycles=[]
    for start in range(len(mapping)):
        if start in seen: continue
        cycle=[]; cursor=start
        while cursor not in seen:
            seen.add(cursor); cycle.append(cursor); cursor=mapping[cursor]
        if len(cycle)>1: cycles.append(cycle)
    return cycles


def cube_index(vertex):
    return sum((1 << axis) for axis,value in enumerate(vertex) if value>0)


def collection_two(circle, op):
    vertices=[[1 if index & (1 << axis) else -1 for axis in range(3)] for index in range(8)]
    cube_points=[[400+112*x+48*z,235+86*y-32*z] for x,y,z in vertices]
    cube_edges=[[i,i^(1<<axis)] for i in range(8) for axis in range(3) if not i & (1<<axis)]
    cube_faces=[[0,1,3,2],[4,5,7,6],[0,1,5,4]]
    rx=cycles_of([cube_index([x,-z,y]) for x,y,z in vertices])
    ry=cycles_of([cube_index([z,y,-x]) for x,y,z in vertices])
    cube=dict(points=cube_points,vertices=vertices,edges=cube_edges,faces=cube_faces)
    dial5=circle(400,235,151,5)
    butterfly=[[220,338.923],[220,131.077],[400,235],[580,131.077],[580,338.923]]
    rooms4_centers=circle(400,235,135,4)
    rooms4=[]
    for i,(cx,cy) in enumerate(rooms4_centers):
        theta=i*math.pi/2
        rooms4.extend([[round(cx+s*35*math.cos(theta),3),round(cy+s*35*math.sin(theta),3)] for s in [-1,1]])
    rooms3_centers=circle(400,235,135,3)
    rooms3=[[round(cx+s*36,3),cy] for cx,cy in rooms3_centers for s in [-1,1]]
    rhythm=[[190,235],[350,235]]+circle(555,235,106,3)
    postal=[[400,235],[400,93],[542,235],[258,235],[400,377]]
    final_points=[[260,360],[140,240],[260,120],[380,240]]+circle(510,240,130,5,math.pi)[1:]
    return [
        dict(id='two_mirrors', title='双镜成风', chapter='第二间 · 另一种转动', scene='double_mirror', tag='两次翻面，一阵旋转', points=circle(400,235,151,6),
             subtitle='没有转轮，只有两面镜子。让它们轮流照一照。',
             ops=[op('upright','竖起的镜子','沿竖直镜轴翻面，顶部和底部留下',[[1,5],[2,4]],'mirror'),op('slanted','斜放的镜子','沿斜镜轴翻面，三对位置一起交换',[[0,1],[2,5],[3,4]],'mirror')],
             scramble=[('upright',1),('slanted',1),('upright',1),('slanted',1)],group='D₆',expected_order=12,
             hints=['每面镜子按两次，都会回去。试着让两面镜子交替出场。','两次不同的翻面，会把整圈颜色转过一格。需要时再借同样的一阵风。'],
             discovery='两面镜子接力，也能织出一圈旋转。',math='两种反射生成正六边形的二面体群 D₆，阶为 12。它们的乘积是六循环；本关需要把这个旋转组合使用两次。',intent='把第一间的旋转换成两面可见的镜轴，让四步解来自发现动作的组合。'),
        dict(id='three_doors',title='三道小门',chapter='第二间 · 掌心里的空间',scene='cube_flips',tag='一次，只改一个方向',**cube,
             subtitle='三道门通向三个方向。它们可以各自做好自己的事。',
             ops=[op('across','左右穿门','左右对应的四对颜色一起交换',cycles_of([i^1 for i in range(8)])),op('height','上下穿门','上下对应的四对颜色一起交换',cycles_of([i^2 for i in range(8)])),op('depth','前后穿门','前后对应的四对颜色一起交换',cycles_of([i^4 for i in range(8)]))],
             initial=[7,6,5,4,3,2,1,0],group='C₂ × C₂ × C₂',expected_order=8,
             hints=['先跟着一种颜色，看它还差哪个方向。一次穿门只改变一个方向。','三道门彼此不拆台。同一道门用两次会抵消，可以试试各用一次。'],
             discovery='方向各自归位，整只星匣就一起对齐了。',math='八个位置标记为三位二进制向量。三枚把手分别翻转一位，彼此可交换，生成 C₂³。目标对应同时翻转三位，每种顺序都可完成。',intent='把独立控制放到立体线框上；八枚颜色由三个互不干扰的方向决定。'),
        dict(id='palm_constellation',title='掌心星匣',chapter='第二间 · 掌心里的空间',scene='cube_turns',tag='把缺少的方向借过来',**cube,
             subtitle='小门变成了翻面把手。星匣能转动的方向，比把手更多。',
             ops=[op('tilt','横轴翻面','整只星匣绕横轴翻转四分之一圈',rx,'spatial',axis='x',angle=math.pi/2),op('yaw','竖轴翻面','整只星匣绕竖轴翻转四分之一圈',ry,'spatial',axis='y',angle=math.pi/2)],
             scramble=[('tilt',1),('yaw',1),('tilt',-1)],group='S₄',expected_order=24,
             hints=['你想要的方向没有单独的把手。可以先换个朝向再翻。','先借一个朝向，让另一枚把手发挥作用，最后把借的朝向还回来。'],
             discovery='换个朝向，熟悉的把手就能做一件新事。',math='两种四分之一圈的刚体旋转生成立方体旋转群，阶为 24，同构于 S₄。这里作用在八个顶点上，与第 6、7 关的四点作用不同。共轭可产生第三根轴上的旋转。',intent='与上一关共用八点线框，改为真正的三维旋转投影，体验同一外形上的另一套规则。'),
        dict(id='two_and_three',title='两拍与三拍',chapter='第二间 · 小小的节拍',scene='rhythm',tag='等另一边绕完一圈',points=rhythm,
             subtitle='一边来回两拍，一边转过三拍。让一边回家，另一边刚好换位。',
             ops=[op('beat','轻敲节拍','左侧换位一次，右侧同时转过一格',[[0,1],[2,3,4]],'orbit',centers=[[270,235],[555,235]],angles=[math.pi,math.tau/3])],initial=[1,0,2,3,4],group='C₆',expected_order=6,
             hints=['右边每三次回到原处，左边每两次回到原处。','先等右侧转满一圈，看看左侧会停在哪里。'],
             discovery='不同的节拍，也能在恰好的时候相遇。',math='生成元是互不相交的二循环和三循环的乘积，阶为 lcm(2,3)=6。它的三次方只交换左侧两点，右侧三点恢复不动。',intent='空间题之后安排一个短小的周期关，摆动和花轮使用不同的可见节拍。'),
        dict(id='four_stations',title='四站回廊',chapter='第二间 · 成组的巧思',scene='four_rooms',tag='沿途，顺手修两站',points=rooms4,rooms=[[0,1],[2,3],[4,5],[6,7]],centers=rooms4_centers,
             subtitle='相邻的两座站台需要换位。把它们依次送到上方的工具旁。',
             ops=[op('tour','转动回廊','四座站台一起顺转四分之一圈',[[0,2,4,6],[1,3,5,7]],'orbit',centers=[[400,235],[400,235]],angles=[math.pi/2,math.pi/2]),op('service','上站换位','只交换正上方站台里的两枚颜色',[[0,1]])],
             initial=[0,1,3,2,5,4,6,7],group='C₂ ≀ C₄',expected_order=64,
             hints=['把要修的站台送上来。修好一站后，继续去下一站，最后恢复回廊的朝向。','两站正好相邻，可以让它们先后经过工具；别急着每修好一站就立刻转回去。'],
             discovery='把几次借位连成一条路，少走一些来回。',math='四个可独立交换的二点块构成 C₂⁴，整体四循环轮换这些块，生成 C₂ ≀ C₄，阶为 16×4=64。目标交换两个相邻站台的内部位置。分别借位归还需要 3+5 步；串成一条行程只需 6 步。',intent='从单次共轭延伸到沿途处理两个局部任务，鼓励把借位行程连起来。'),
        dict(id='roundabout_post',title='绕心邮局',chapter='第二间 · 路线的小秘密',scene='postal',tag='留住一枚，换一种走法',points=postal,
             subtitle='邮路会经过中央，风轮却只转外圈。让两条路线互相借一步。',
             ops=[op('post','沿路递送','五枚颜色沿邮路依次走一站',[[0,1,2,3,4]]),op('wind','绕心拨动','中央留下，外圈四枚顺转一格',[[1,2,4,3]],'orbit',centers=[[400,235]],angles=[math.pi/2])],
             scramble=[('wind',1),('post',1),('wind',1)],group='AGL(1,5)',expected_order=20,
             hints=['一次操作会动到中央，另一次会留下中央。先追踪一枚颜色经过两种路线的情况。','外圈拨动、沿路递送、再拨动外圈，可以把这次错位折返回来。'],
             discovery='同一批颜色，沿另一条路线走，便有了新的捷径。',math='将图中 1–5 号位置依次对应到模 5 的 0–4，两枚把手分别是 x↦x+1 与 x↦2x，生成 AGL(1,5)=C₅⋊C₄，阶 20。目标是 x↦4x+2；它可由三次操作合成。',intent='中心与外圈的作用范围不同，用折返路线形成一处非对称的三步巧解。'),
        dict(id='five_petals',title='五瓣结',chapter='第二间 · 同一结的两种织法',scene='five_petals',tag='先转花，再织结',points=dial5,
             subtitle='两对颜色打了结。先把要处理的三枚送到花瓣工具里。',
             ops=[op('flower','转动整花','五枚颜色一起顺转一格',[[0,1,2,3,4]],'orbit',centers=[[400,235]],angles=[math.tau/5]),op('knot','三瓣回旋','只轮换上方与右侧的三枚颜色',[[0,1,2]])],
             initial=[1,0,2,4,3],group='A₅',expected_order=60,pair='butterfly_knot',
             hints=['花瓣工具每次只处理三枚。整花转动，可以把另一组三枚送进去。','可以暂时动到已经正确的颜色；把两对换位拆成几次三枚轮换来完成。'],
             discovery='大花轮负责借位，小花瓣负责解结。',math='五循环与三循环生成五次交错群 A₅，阶 60。本关要求双换位 (1 2)(4 5)。下一关保留同一初态和目标，改用另一组生成元。',intent='全局转花配合局部三循环，准备下一关同群同目标的操作对照。'),
        dict(id='butterfly_knot',title='蝶翼回旋',chapter='第二间 · 同一结的两种织法',scene='butterfly',tag='把同一个结，交给双翼',points=butterfly,
             subtitle='还是那两对颜色。这次让两片蝶翼在中间接力。',
             ops=[op('left','左翼回旋','左侧三枚绕左翼顺转',[[0,1,2]],'orbit',centers=[[280,235]],angles=[math.tau/3]),op('right','右翼回旋','右侧三枚绕右翼顺转',[[2,3,4]],'orbit',centers=[[520,235]],angles=[math.tau/3])],
             initial=[1,0,2,4,3],group='A₅',expected_order=60,pair='five_petals',
             hints=['两片蝶翼共用中间的位置，可以在那里交接颜色。','试着让左右翼交替转动，并把借用中间位置造成的变化归还。'],
             discovery='结没有变，织法却可以完全不同。',math='三循环 (1 2 3) 与 (3 4 5) 仍生成同一个 A₅。本关与第 17 关的初态、目标和位置编号相同，换了生成元与空间布局。',intent='把相同的双换位目标放进两个共享位置的三循环，提供与整花工具不同的思考方式。'),
        dict(id='three_room_shift',title='三室换班',chapter='第二间 · 成组的巧思',scene='three_rooms',tag='屋子换班，颜色换座',points=rooms3,rooms=[[0,1],[2,3],[4,5]],centers=rooms3_centers,
             subtitle='三间花房换了班，屋里的座位也颠倒了。沿途把它们逐间修好。',
             ops=[op('carousel','花房巡游','三间花房顺转一站，各自保持朝向',[[0,2,4],[1,3,5]],'carousel',centers=rooms3_centers,blocks=[[0,1],[2,3],[4,5]],pivot=[400,235],angle=math.tau/3),op('neighbor','交换邻房','上方与右下花房整组交换',[[0,2],[1,3]],'exchange',centers=rooms3_centers[:2],blocks=[[0,1],[2,3]]),op('seats','上房换座','只交换上方花房里的两枚颜色',[[0,1]])],
             initial=[3,2,5,4,1,0],group='C₂ ≀ S₃',expected_order=48,
             hints=['先区分两件事：花房在哪一站，以及房内两枚的次序。','可以一边巡游，一边处理来到上方的房间。再用整组交换修正房间的相对位置。'],
             discovery='把大问题拆成房间和座位，两层变化就能各自归位。',math='三间二点花房可以各自换座，三个块也能任意排列，生成 C₂ ≀ S₃=C₂³⋊S₃，群阶 8×6=48。这个块系统把全局位置和局部次序分成两层。',intent='用三种可读的工具组合整组排序与局部整理，作为终关前的综合题。'),
        dict(id='star_orbit_finale',title='星轨合奏',chapter='第二间 · 归还所有借来的风',scene='asymmetric_overlap',tag='四拍与五拍，最后一次合奏',points=final_points,
             subtitle='五枚颜色已经对了。余下三枚，藏着一次更深的借位。',
             ops=[op('left','四拍星轮','左轮四枚颜色顺转一格',[[0,1,2,3]],'orbit',centers=[[260,240]],angles=[math.pi/2]),op('right','五拍星轮','右轮五枚颜色顺转一格',[[3,4,5,6,7]],'orbit',centers=[[510,240]],angles=[math.tau/5])],
             scramble=[('left',1),('right',1),('left',-1),('right',-1),('left',1),('left',1),('right',1),('left',-1),('right',-1),('left',-1)],group='S₈',expected_order=40320,
             hints=['可以把一段来回操作当成一枚新的把手。先制造局部变化，再把它搬到需要的位置。','先借用交点做一次局部调整，再处理剩余的错位。每次借来的位置，最终都要归还。'],
             discovery='所有借来的风都归还了，留下的正是你想要的变化。',math='四循环与五循环共享一个位置，生成 S₈，共有 40320 个位置置换。本关把两个局部变化组合起来，最终只改变三个位置；允许途中暂时打乱其余五枚。',intent='用不同周期的相交星轮，把借位、局部操作和抵消串成一段收束全篇的解法。'),
    ]
