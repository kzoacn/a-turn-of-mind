"""Collections four and five: routes, frames, and tools chosen for the target."""
import math
if __package__:
    from .web_collection_two import cycles_of
else:
    from web_collection_two import cycles_of


def collections_four_five(circle, op):
    ring8=circle(400,235,151,8)
    dual4=circle(240,235,104,4)+circle(560,235,104,4)
    windhouse=circle(240,235,80,4)+circle(560,235,80,4)
    yard=[[250,160],[400,160],[550,160],[250,310],[400,310],[550,310]]
    a=op('upper','上轨轮转','上排三枚依次走一站',[[0,1,2]])
    b=op('lower','下轨轮转','下排三枚依次走一站',[[3,4,5]])
    axes=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]
    projection=dict(origin=[400,235],basis=[[140,0],[0,125],[62,-55]])
    compass_points=[[400+140*x+62*z,235+125*y-55*z] for x,y,z in axes]
    compass_edges=[[i,j] for i in range(6) for j in range(i+1,6) if sum(axes[i][k]*axes[j][k] for k in range(3))==0]
    compass=dict(points=compass_points,vertices=axes,projection=projection,edges=compass_edges,faces=[[0,2,4],[0,3,4],[1,2,5]])
    rz=op('polar','绕双极转','两极留下，另外四向转过四分之一圈',cycles_of([axes.index([-y,x,z]) for x,y,z in axes]),'spatial',axis='z',angle=math.pi/2)
    rd=op('diagonal','斜向翻面','六个方向绕斜轴转过三分之一圈',cycles_of([axes.index([z,x,y]) for x,y,z in axes]),'spatial',axisVector=[1,1,1],angle=math.tau/3)
    wv=[[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0]]
    wp=[[400+130*x,235+130*y] for x,y in wv]; mod=lambda x:(x+1)%3-1
    wx=op('wind','横向的风','上排向左，下排向右，越过窗沿绕回',cycles_of([wv.index([mod(x+y),y]) for x,y in wv]),'shear',axis='x',spacing=130,pivot=[400,235])
    wr=op('turn','转动窗框','整扇窗顺转四分之一圈',cycles_of([wv.index([-y,x]) for x,y in wv]),'orbit',centers=[[400,235],[400,235]],angles=[math.pi/2,math.pi/2],turnFrame=True)
    wm=op('mirror','窗外镜面','左右照镜，中央一列留下',cycles_of([wv.index([-x,y]) for x,y in wv]),'mirror')
    pages=[[cx+dx,235+dy] for cx in [240,560] for dx,dy in [(-75,-75),(75,-75),(75,75),(-75,75)]]
    alpha=lambda x:((x<<1)^(0b1011 if x&4 else 0))&7
    field8=[[400,235]]+[[0,0] for _ in range(7)]
    value=1
    for point in circle(400,235,148,7):field8[value]=point;value=alpha(value)
    field_turn=op('ring','绕行七星','中央留下，外侧七枚顺转一格',cycles_of([alpha(i) for i in range(8)]),'orbit',centers=[[400,235]],angles=[math.tau/7])
    field_bridge=op('bridges','四座星桥','中央与外侧三对颜色一起交换',cycles_of([i^1 for i in range(8)]))
    post7=circle(400,235,151,7)
    pocket=[[190,235]]+circle(460,235,135,7,math.pi-math.pi/7)
    prism_vertices=[[math.cos(-math.pi/2+i*math.tau/3),math.sin(-math.pi/2+i*math.tau/3),z] for z in [-.9,.9] for i in range(3)]
    prism_projection=dict(origin=[400,235],basis=[[110,0],[0,100],[95,-45]])
    prism_points=[[round(400+110*x+95*z,3),round(235+100*y-45*z,3)] for x,y,z in prism_vertices]
    prism_centers=[[314.5,275.5],[485.5,194.5]]
    moon_points=circle(240,235,100,3)+circle(560,235,100,4)
    moon_mid=[(moon_points[1][i]+moon_points[2][i])/2 for i in [0,1]]
    cube_vertices=[[1 if i&(1<<k) else -1 for k in range(3)] for i in range(8)]
    cube_points=[[400+112*x+48*z,235+86*y-32*z] for x,y,z in cube_vertices]
    cube_edges=[[i,i^(1<<k)] for i in range(8) for k in range(3) if not i&(1<<k)]
    islands=[[240,339],[136,235],[240,131],[344,235],[456,235],[560,131],[664,235],[560,339]]
    island_left=op('left','左岸转轮','只让左岸四枚顺转一格',[[0,1,2,3]],'orbit',centers=[[240,235]],angles=[math.pi/2])
    island_right=op('right','右岸转轮','只让右岸四枚顺转一格',[[4,5,6,7]],'orbit',centers=[[560,235]],angles=[math.pi/2])
    island_bridge=op('bridge','渡口换位','只交换靠近渡口的两枚颜色',[[3,4]])
    distant=[0,6,2,3,4,5,1,7]
    return [
        dict(id='long_short_steps',title='长短步之间',chapter='第四间 · 借一段路',scene='long_steps',tag='大步借来一点路',points=ring8,
             subtitle='一枚把手走两格，一枚走三格。借一大步，再还一小步。',
             ops=[op('short','跨过两格','八枚颜色一起顺转两格',[[0,2,4,6],[1,3,5,7]],'orbit',centers=[[400,235],[400,235]],angles=[math.pi/2,math.pi/2]),op('long','跨过三格','八枚颜色一起顺转三格',[[0,3,6,1,4,7,2,5]],'orbit',centers=[[400,235]],angles=[3*math.pi/4])],
             initial=[1,2,3,4,5,6,7,0],group='C₈',expected_order=8,
             hints=['目标只差一格，但这里没有一格的把手。反向也算一种选择。','三格减去两格，恰好留下一格。'],discovery='大步和小步之间，藏着你需要的那一步。',math='两把手是八循环 r 的 r² 与 r³，仍生成 C₈。r³r⁻²=r，使没有直接提供的一格移动可以由两次操作完成。',intent='用两种步长组合出缺少的一格，作为第四间的轻巧开场。'),
        dict(id='two_clock_difference',title='双钟差拍',chapter='第四间 · 快慢之间',scene='ratio_dials',tag='快半圈，慢一格',points=dual4,
             subtitle='右边已经对了。让快慢两种节拍，替左边留下一格。',
             ops=[op('same','同拍拨动','两只钟都顺转一格',[[0,1,2,3],[4,5,6,7]],'orbit',centers=[[240,235],[560,235]],angles=[math.pi/2,math.pi/2]),op('ratio','一拍两格','左钟一格，右钟同时走两格',[[0,1,2,3],[4,6],[5,7]],'orbit',centers=[[240,235],[560,235],[560,235]],angles=[math.pi/2,math.pi,math.pi])],
             initial=[1,2,3,0,4,5,6,7],group='C₄ × C₄',expected_order=16,
             hints=['两次同拍会让右钟走半圈。另一枚把手一次就能走完这半圈。','让右钟的两种半圈相互抵消，左钟会留下需要的一格。'],discovery='快慢刚好相消，留下的变化便属于左边。',math='设两只钟的四循环为 a、b，生成元是 ab 与 ab²，生成 C₄×C₄。组合 (ab)²(ab²)⁻¹=a 只转动左侧一格。',intent='给同时联动的两只钟加入不同齿比，让抵消由节拍差产生。'),
        dict(id='double_tooth_ferry',title='双齿渡桥',chapter='第四间 · 两种接力',scene='row_yard',tag='两座桥，总会一起动',points=yard,bridgePairs=[[0,3],[1,4]],
             subtitle='上下两轨各自轮转，渡桥却总会交换两对。把需要的颜色送到桥边。',
             ops=[a,b,op('bridge','双齿换岸','左边两列的颜色同时上下交换',[[0,3],[1,4]])],initial=[5,1,2,0,4,3],group='A₆',expected_order=360,pair='three_coves',
             hints=['换岸会带着另一对一起走。可以用两次换岸把那一对的影响收回来。','先借一条轨道对齐渡口，再让两次双齿换岸之间夹进一次轮转。'],discovery='桥多带走的那一对，也可以在途中送回来。',math='两个三循环与一个双换位生成 A₆，群阶为 360。本关只要求三个位置循环变化，其余位置要在最后恢复。',intent='局部轮转与强制成对换岸产生副作用，玩家需要安排交接并归还它。'),
        dict(id='three_coves',title='三湾接力',chapter='第四间 · 两种接力',scene='cove_ring',tag='同一段归途，换三个海湾',points=circle(400,235,151,6),
             subtitle='还是那三枚颜色。这次，沿着三个相接的小海湾接力。',
             ops=[op('first','第一湾','轮换上方和右侧的三枚',[[0,1,2]]),op('second','第二湾','轮换右下方的三枚',[[2,3,4]]),op('third','第三湾','轮换左侧和上方的三枚',[[4,5,0]])],initial=[5,1,2,0,4,3],group='A₆',expected_order=360,pair='double_tooth_ferry',
             hints=['交接点分布在环上。先找出哪一湾可以把颜色送给下一湾。','先借第二湾的一步，让第三湾处理，再把第二湾借走的那步还回来。'],discovery='同一个目标，换一条接力路线就有了新办法。',math='三个相接的三循环仍生成相同的 A₆。初态与目标和第 33 关完全相同，这组生成元让最短距离从 6 步变为 3 步。',intent='从双轨改为分散交接点，让同一目标产生另一种空间直觉。'),
        dict(id='six_direction_vane',title='六向风标',chapter='第四间 · 朝向的秘密',scene='octahedron',tag='留住两极，转过四方',**compass,
             subtitle='颜色站在六个方向上。借一根斜轴，把想要的方向转到眼前。',
             ops=[rz,rd],initial=[0,1,3,2,5,4],group='S₄',expected_order=24,
             hints=['第一枚把手留下两极，第二枚会换一套朝向。看看目标希望留下哪一对。','可以用斜向翻面把需要的方向送到转轴旁，再组合几次转动。'],discovery='看风的方向变了，能用的把手也随之变得顺手。',math='正八面体的旋转群作用在六个顶点上，阶为 24，同构 S₄。与立方体八顶点上的作用不同，这次颜色标记六个方向。',intent='用六向骨架展现旋转群的另一种作用，给平面路线题之后换一个视角。'),
        dict(id='mirror_window_return',title='镜窗折返',chapter='第四间 · 窗外多一面镜',scene='mirror_window',points=wp,gridVectors=wv,tag='把倒影也借进来',
             subtitle='方窗多了镜面把手。这一次，反过来的次序也能送回去。',
             ops=[wr,wx,wm],scramble=[('wind',1),('turn',1),('mirror',1),('wind',-1)],group='GL(2,3)',expected_order=48,
             hints=['镜面会交换左右，风和转窗则负责把颜色送到合适的方向。','可以先转窗，再反向吹一次横风，归还转窗之后照一次镜子。'],discovery='多一面镜，方窗便能接住另一半倒影。',math='在 F₃² 的八个非零向量上，旋转与剪切生成 SL(2,3)，加入行列式为 −1 的反射后生成 GL(2,3)，阶为 48。',intent='新增反射明确改变可达图案，目标需要把镜像和借位组合起来。'),
        dict(id='two_turning_pages',title='双页回转',chapter='第四间 · 轮到另一页',scene='pages',tag='先记住，两页各差几格',points=pages,panels=[[0,1,2,3],[4,5,6,7]],
             subtitle='一页差一格，另一页差半圈。让两页轮流来到唯一的转轴旁。',
             ops=[op('left','左页转动','只让左页四枚顺转一格',[[0,1,2,3]],'orbit',centers=[[240,235]],angles=[math.pi/2],turnFrame=True),op('swap','交换两页','两页整组换边，朝向保持不变',[[0,4],[1,5],[2,6],[3,7]],'exchange',centers=[[240,235],[560,235]],blocks=[[0,1,2,3],[4,5,6,7]],spread=.7,turnFrame=True)],
             initial=[3,0,1,2,6,7,4,5],group='C₄ ≀ C₂',expected_order=32,
             hints=['先看清两页各要转多少。处理完一页，再让另一页接上转轴。','一页转一格，另一页转两格，最后交换回原来的书页位置。'],discovery='同一根转轴，也能替两页做好不同的事情。',math='两页分别可作 C₄ 旋转，整页交换构成 C₂，生成 C₄ ≀ C₂，阶为 4²×2=32。',intent='保留整组的朝向记忆，让同一个工具按不同份量完成两项任务。'),
        dict(id='eight_star_gallery',title='八星回廊',chapter='第四间 · 把转轴借出去',scene='field_halo',tag='中央，也可以暂时换一颗',points=field8,haloCenter=[400,235],haloRadius=148,
             subtitle='星桥会一起交换四对。让中心先换一枚，再带着外围绕行。',
             ops=[field_turn,field_bridge],scramble=[('bridges',1),('ring',1),('ring',1),('bridges',1)],group='AGL(1,8)',expected_order=56,
             hints=['星轮留下中央的位置，星桥可以把另一枚颜色带到中央。','两次星桥之间夹进一段转动，最后借走的中心就能归还。'],discovery='暂借中央，转动就能围绕另一种颜色发生。',math='八个位置标记 F₈，采用多项式 t³+t+1。两把手为 x↦tx 与 x↦x+1，生成 AGL(1,8)=C₂³⋊C₇，阶为 56。',intent='七星轮配合四座联动星桥，借出旋转的固定位置。'),
        dict(id='seven_day_post',title='七日星历',chapter='第四间 · 用路线织一面镜',scene='star_post',tag='星历里，藏着一次反向',points=post7,
             subtitle='一条路逐站前行，一条路沿星线分流。让分流多走几站，看看次序会怎样。',
             ops=[op('post','逐站前行','七枚颜色沿外圈顺转一格',[list(range(7))],'orbit',centers=[[400,235]],angles=[math.tau/7]),op('route','星线分流','顶端留下，其余六枚沿星线轮换',cycles_of([3*i%7 for i in range(7)]))],
             scramble=[('route',1),('route',1),('route',1),('post',1)],group='AGL(1,7)',expected_order=42,
             hints=['顶端是分流路线的固定点。先观察同一条星线走三次的效果。','三次分流会把圆周次序反过来，再配合一格前行或退回。'],discovery='绕过星线三次，次序已经悄悄反了过来。',math='按模 7 编号，两把手是 x↦x+1 与 x↦3x，生成 AGL(1,7)，阶为 7×6=42。因为 3³≡−1，三次分流合成反射。',intent='让重复的分流动作合成镜像，保留路线与效果之间的可发现联系。'),
        dict(id='one_beside_seven',title='七星旁的一枚',chapter='第四间 · 把借来的色归还',scene='pocket_wheel',tag='侧袋接住的，最后也要送回',points=pocket,haloCenter=[460,235],haloRadius=135,
             subtitle='远处三枚颜色错了。侧袋和近处的颜色，都可以暂时借用。',
             ops=[op('wheel','转动七星','外圈七枚顺转，侧袋留下',[[1,2,3,4,5,6,7]],'orbit',centers=[[460,235]],angles=[math.tau/7]),op('pocket','侧袋轮换','侧袋与靠近它的两枚轮换',[[0,1,2]])],
             initial=[0,1,2,5,3,4,6,7],group='A₈',expected_order=20160,
             hints=['先把远处需要处理的颜色送到袋口。侧袋负责暂存，星轮负责接下一枚。','连续做两次局部交接，可以归还侧袋里的颜色，留下外圈的一次三枚轮换。'],discovery='远处的颜色归位了，侧袋也像从未被借用。',math='七循环与相交三循环生成 A₈，阶为 20160。本关目标仅循环外圈三点，侧袋和另外四枚最终不变，最短解为 8 步。',intent='以固定侧袋完成远处的三枚轮换，收束第四间的路线与寄存主题。'),
        dict(id='reflected_compass',title='倒影罗盘',chapter='第五间 · 多一条回家的路',scene='mirror_compass',tag='这一次，只交换一对方向',**compass,
             subtitle='镜面把手来了。让它接住需要交换的两极，再把方向送回去。',
             ops=[rz,rd,op('mirror','两极照镜','只交换斜向的一对两极',[[4,5]],'mirror')],initial=[1,0,2,3,4,5],group='C₂ ≀ S₃',expected_order=48,
             hints=['镜面只够得着眼前的两极。可以先把另一对方向送过来。','斜向翻面、照镜，再归还朝向，就能只交换目标两极。'],discovery='朝向借好了，一面小镜便能只改那两个位置。',math='加入单轴反射后得到六向上的完整带符号置换群 C₂ ≀ S₃，阶 48，同构 C₂×S₄。它与第 19 关的房间换位群相同，呈现方式不同。',intent='用新增镜面实现只有两个位置变化的目标，对照仅能作刚体旋转的风标。'),
        dict(id='glass_prism',title='玻璃三棱镜',chapter='第五间 · 三种方向各自归位',scene='prism',tag='朝向、倒影，还有哪一面',points=prism_points,vertices=prism_vertices,projection=prism_projection,edges=[[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5]],faces=[[0,1,2],[3,4,5],[0,1,4,3]],
             subtitle='转一面，照一面，再把前后两面换回来。让玻璃里的颜色对齐。',
             ops=[op('rotate','沿棱转动','两组三角面同转三分之一圈',[[0,1,2],[3,4,5]],'spatial',axis='z',angle=math.tau/3),op('mirror','左右照镜','每一面各交换一对，顶角留下',[[1,2],[4,5]],'mirror'),op('faces','前后换面','两组三角面交换，各自方向保留',[[0,3],[1,4],[2,5]],'exchange',centers=prism_centers,blocks=[[0,1,2],[3,4,5]])],
             scramble=[('rotate',1),('mirror',1),('faces',1)],group='D₆',expected_order=12,
             hints=['可以分别观察三件事：颜色在哪一面、三角面的朝向、左右的次序。','前后换面不会改变每面内部的次序。先分清每一项需要哪枚把手。'],discovery='把三个方向分开看，玻璃里的错位就清楚了。',math='三角面的 D₃ 对称与独立换面的 C₂ 生成 D₃×C₂，同构 D₆，阶为 12。前后换面与两种面内操作可交换。',intent='通过三棱镜的投影，把朝向、镜像和前后位置分开呈现。'),
        dict(id='two_sided_windhouse',title='双面风楼',chapter='第五间 · 两面共用一阵风',scene='mirror_dials',tag='两面同转，也能各项分清',points=windhouse,dialRadius=80,
             subtitle='两面风楼一起转，也一起照镜。找回朝向，再认清彼此的位置。',
             ops=[op('turn','两面同转','两面的四枚颜色都顺转一格',[[0,1,2,3],[4,5,6,7]],'orbit',centers=[[240,235],[560,235]],angles=[math.pi/2,math.pi/2]),op('mirror','两面照镜','两面各交换左右两枚',[[1,3],[5,7]],'mirror'),op('swap','交换两面','两面整组换边，方向保留',[[0,4],[1,5],[2,6],[3,7]],'exchange',centers=[[240,235],[560,235]],blocks=[[0,1,2,3],[4,5,6,7]],spread=.73)],
             scramble=[('turn',1),('turn',1),('mirror',1),('swap',1)],group='D₄ × C₂',expected_order=16,
             hints=['每面的内部变化总是同步的。整组换边可以单独考虑。','先辨认是否需要换面，再处理两面共同的转动与镜像。'],discovery='共用的变化一起处理，换面的一步留给自己。',math='同步的方形对称生成 D₄，换面是与之可交换的独立 C₂，整体为 D₄×C₂，阶 16。',intent='在一组同步方向之外再加入独立换面，强调任务的分解。'),
        dict(id='square_wheel_crossing',title='方轮渡口',chapter='第五间 · 只有两枚想换位',scene='row_yard',tag='借一圈方轮，换远处一对',points=yard,localSquare=[0,1,4,3],
             subtitle='只想交换右侧两枚。先用方轮接住它们，再归还其他颜色。',
             ops=[a,b,op('square','方轮回转','左侧四枚顺转四分之一圈',[[0,1,4,3]],'orbit',centers=[[325,235]],angles=[math.pi/2],turnFrame=True)],initial=[0,1,5,3,4,2],group='S₆',expected_order=720,pair='ferry_alignment',
             hints=['方轮每次带动四枚，轨道轮转可以改变它接到的是哪几枚。','把右侧的颜色先送进方轮，再用上下轨道收回多余的变化。'],discovery='一次大回转，也能拼出一次小换位。',math='两个三循环与一个四循环生成 S₆，阶 720。四循环提供奇置换，因此可以组合出只交换右侧两点的动作，最短 6 步。',intent='用四点工具合成远处的单换位，为下一关改变工具作铺垫。'),
        dict(id='ferry_alignment',title='两岸对齐',chapter='第五间 · 只有两枚想换位',scene='row_yard',tag='把两岸先送到同一座桥边',points=yard,bridgePairs=[[0,3]],
             subtitle='还是右侧那两枚。这次多了一座只交换一对的小渡桥。',
             ops=[a,b,op('bridge','单座渡桥','只交换最左侧的两枚颜色',[[0,3]])],initial=[0,1,5,3,4,2],group='S₆',expected_order=720,pair='square_wheel_crossing',
             hints=['先让上下两条轨道各自把目标颜色送到渡桥旁。','对齐、交换，再分别归还两条轨道的借位。'],discovery='工具恰好接住两岸，归还也变得整齐。',math='两侧三循环与一个跨侧换位仍生成 S₆。初态与目标和第 44 关相同，最短距离从 6 步变为 5 步。',intent='将复杂合成换成明确的对齐与交换，提供同群同目标的另一种解题直觉。'),
        dict(id='moon_turns_flower',title='月轮照花',chapter='第五间 · 一半月光，一次倒影',scene='moon_flower',tag='月轮前进，花也照一次镜',points=moon_points,
             subtitle='拨月轮会顺手翻一下花。等月轮走过半圈，再看看花留下了什么。',
             ops=[op('flower','花轮转动','左侧三枚顺转一格',[[0,1,2]],'orbit',centers=[[240,235]],angles=[math.tau/3]),op('moon','月轮照花','右侧四枚顺转一格，左侧一对同时交换',[[1,2],[3,4,5,6]],'orbit',centers=[moon_mid,[560,235]],angles=[math.pi,math.pi/2])],
             initial=[2,0,1,5,6,3,4],group='C₃ ⋊ C₄',expected_order=12,
             hints=['月轮拨一次，花照一次镜；拨两次，花的两次镜像就抵消了。','可以先修花，再把月轮走满半圈；也可以先等两次倒影相消。'],discovery='两次月光经过，花的倒影便自己归还了。',math='花轮 a 的阶为 3，月轮联动 b 的阶为 4，满足 bab⁻¹=a⁻¹，生成非平凡半直积 C₃⋊C₄，阶 12。b² 只留下右轮半转。',intent='把周期与镜像联动放在一起，安排一段短小的月光休息题。'),
        dict(id='folded_star_grid',title='折叠星格',chapter='第五间 · 只借另一半天空',scene='cube_shear',tag='四颗跟着走，四颗先留下',points=cube_points,vertices=cube_vertices,edges=cube_edges,faces=[[0,1,3,2],[4,5,7,6],[0,1,5,4]],gateFace=[2,3,7,6],
             subtitle='工具只能拨下半边，错位却在上半边。借一个方向，再抵消多余的变化。',
             ops=[op('sky','转动星格','绕斜轴转过三分之一圈，两角留下',cycles_of([((i<<1)&7)|(i>>2) for i in range(8)]),'spatial',axisVector=[1,1,1],angle=math.tau/3),op('gate','下半边穿门','只交换下半边的两对颜色',cycles_of([i^(1 if i&2 else 0) for i in range(8)])),op('depth','前后穿门','四对前后位置一起交换',cycles_of([i^4 for i in range(8)]))],
             initial=[1,0,2,3,5,4,6,7],group='AGL(3,2)',expected_order=1344,
             hints=['整体穿门可以借转向搬到另一个方向。它会同时碰到上下两半。','先合成一次全体左右换位，再用下半边的工具抵消下面的变化。'],discovery='全体的一步，减去半边的一步，恰好属于另一半。',math='三位二进制坐标上的循环、剪切和一次平移生成 AGL(3,2)，阶 8×168=1344。上半边的剪切可写为一次整体平移与下半边剪切的组合。',intent='将整体变化与局部变化相消，制造没有直接提供的另一半工具。'),
        dict(id='far_shore_guests',title='两岸远客',chapter='第五间 · 同一趟远行',scene='islands',tag='两岸各自借位，渡口只换一对',points=islands,
             subtitle='两枚远客站在最外侧。让两岸分别转到渡口，交换之后再送回去。',
             ops=[island_left,island_right,island_bridge],initial=distant,group='S₈',expected_order=40320,pair='shared_shore_wind',
             hints=['每一岸都可以先把远处的颜色送到渡口。暂时正确的颜色会在归还时回来。','两岸各转半圈，渡口交换一次，再各自转回半圈。'],discovery='最远的两位客人，也能借同一个渡口回家。',math='两岸四循环与一个跨岸换位生成 S₈。本关交换各岸离渡口最远的两点，四段半圈借位加一次渡桥，最短 9 步。',intent='把两次独立对齐完整展开，准备下一关同步工具的回报。'),
        dict(id='shared_shore_wind',title='两岸同风',chapter='第五间 · 同一趟远行',scene='linked_islands',tag='一阵风，同时做好两段借位',points=islands,
             subtitle='还是同一趟远行。新的把手会让两岸一起转动。',
             ops=[op('both','两岸同转','左右四枚都顺转一格',[[0,1,2,3],[4,5,6,7]],'orbit',centers=[[240,235],[560,235]],angles=[math.pi/2,math.pi/2]),island_bridge],initial=distant,group='C₂ ≀ C₄',expected_order=64,pair='far_shore_guests',pairNote='与上一关初态和目标相同。这次的群更小，同步把手却恰好更适合这一趟远行。',
             hints=['两岸的目标距离相同，可以让同一阵风同时带它们去渡口。','同步转半圈，交换，再同步转回半圈。'],discovery='两段借位合成一阵风，同样的归途就短了一些。',math='同步四循环与渡桥生成 C₂ ≀ C₄，阶为 64；它是上一关 S₈ 的真子群。初态和目标相同，但合适的同步生成元让最短距离从 9 步降为 5 步。',intent='展示较少的自由也可能更适合具体目标，用同步操作兑现前一关的长行程。'),
        dict(id='four_leaf_archive',title='四叶归藏',chapter='第五间 · 把所有归途收好',scene='petal_ring',tag='四片叶子，接成一圈归途',points=ring8,
             subtitle='四个交接点围成一圈。让每一片叶子接住下一片的颜色。',
             ops=[op('northeast','右上叶','右上三枚依次轮换',[[0,1,2]]),op('southeast','右下叶','右下三枚依次轮换',[[2,3,4]]),op('southwest','左下叶','左下三枚依次轮换',[[4,5,6]]),op('northwest','左上叶','左上三枚依次轮换',[[6,7,0]])],
             initial=[6,7,0,1,2,3,4,5],group='A₈',expected_order=20160,
             hints=['这次没有唯一的中央位置，交接点分布在四个方向。先决定一枚颜色如何跨到下一片叶子。','把相邻两片叶子的交接看成一段小工具，再把几段归途接起来。'],discovery='四片叶子合拢，每一种颜色都找到了归藏之处。',math='四个沿环相接的三循环生成 A₈，阶为 20160。本关目标是两个四循环的乘积，最短解需要 6 步，并使用全部四枚把手。',intent='用四个分散交接点收束五间工坊，鼓励把已有的局部工具连成整体路线。'),
    ]
