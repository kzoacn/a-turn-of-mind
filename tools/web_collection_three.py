"""A third collection of reversible, all-distinct-color mechanisms."""
import math
if __package__:
    from .web_collection_two import cycles_of
else:
    from web_collection_two import cycles_of


def collection_three(circle, op):
    tetra=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]]
    edges=[[a,b] for a in range(4) for b in range(a+1,4)]
    midpoints=[[int((tetra[a][k]+tetra[b][k])/2) for k in range(3)] for a,b in edges]
    projection=dict(origin=[400,235],basis=[[120,0],[0,108],[56,-52]])
    def project(v):return [400+120*v[0]+56*v[2],235+108*v[1]-52*v[2]]
    lantern_points=[project(v) for v in midpoints]
    lantern_a=cycles_of([midpoints.index([z,x,y]) for x,y,z in midpoints])
    lantern_b=cycles_of([midpoints.index([-z,-x,y]) for x,y,z in midpoints])
    window_vectors=[[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0]]
    window_points=[[400+130*x,235+130*y] for x,y in window_vectors]
    mod3=lambda x:(x+1)%3-1
    shear_x=cycles_of([window_vectors.index([mod3(x+y),y]) for x,y in window_vectors])
    shear_y=cycles_of([window_vectors.index([x,mod3(x+y)]) for x,y in window_vectors])
    window_turn=cycles_of([window_vectors.index([-y,x]) for x,y in window_vectors])
    half_window=[4,5,6,7,0,1,2,3]
    horizontal=op('horizontal','横向的风','上排向左，下排向右；到边缘绕回',shear_x,'shear',axis='x',spacing=130,pivot=[400,235])
    vertical=op('vertical','纵向的风','左列向上，右列向下；到边缘绕回',shear_y,'shear',axis='y',spacing=130,pivot=[400,235])
    fano_points=[[400,75],[538.564,315],[469.282,195],[261.436,315],[330.718,195],[400,315],[400,235]]
    fano_lines=[[0,1,2],[0,3,4],[1,3,5],[0,5,6],[1,4,6],[2,3,6],[2,4,5]]
    rotate_bits=lambda v:((v<<1)&7)|(v>>2)
    star_turn=cycles_of([rotate_bits(v)-1 for v in range(1,8)])
    pull_x=cycles_of([(v^(1 if v&2 else 0))-1 for v in range(1,8)])
    pull_y=cycles_of([(v^(2 if v&4 else 0))-1 for v in range(1,8)])
    weave_points=[[220+120*(i%4),150+170*(i//4)] for i in range(8)]
    out_map=[0,2,4,6,1,3,5,7]; in_map=[value^1 for value in out_map]
    borrowed_points=[[400,74],[300,178],[500,178],[300,260],[500,260],[500,350],[300,350]]
    petal_centers=circle(400,235,95,3)
    petals=[[400,235]]
    for i,center in enumerate(petal_centers):
        angle=math.atan2(235-center[1],400-center[0])
        for offset in [1,2]:petals.append([round(center[0]+95*math.cos(angle+offset*math.tau/3),3),round(center[1]+95*math.sin(angle+offset*math.tau/3),3)])
    return [
        dict(id='alternating_walk',title='交错步道',chapter='第三间 · 让脚步交织',scene='staggered_walk',tag='换一座桥，再走一步',points=circle(400,235,155,8),
             subtitle='两组小桥交错相接。轮流走过它们，让颜色去到对面。',
             ops=[op('odd','第一组桥','四对相邻颜色同时交换',[[0,1],[2,3],[4,5],[6,7]]),op('even','第二组桥','换一组邻居，四对颜色同时交换',[[1,2],[3,4],[5,6],[7,0]])],
             initial=[4,5,6,7,0,1,2,3],group='D₄',expected_order=8,
             hints=['连续走同一组桥，会回到原处。换一组桥，颜色才会继续前进。','跟着一枚颜色，交替走两组桥。两股颜色会沿相反方向去到对面。'],
             discovery='交错的小步，也能带来一次完整的转身。',math='两枚把手都是二阶置换，它们的乘积阶为 4，生成阶 8 的二面体群 D₄。这是它在八个位置上的正则作用；两次交替组合产生全部颜色的对面换位。',intent='用两组可见的相邻小桥产生相反方向的两股流，作为新工坊的四步开场。'),
        dict(id='edge_lantern',title='棱上微光',chapter='第三间 · 棱与面的秘密',scene='edge_lantern',tag='颜色住在棱上',points=lantern_points,vertices=midpoints,projection=projection,frameVertices=tetra,frameEdges=edges,
             subtitle='六种颜色点亮六条棱。转动整架小灯，让每道微光归位。',
             ops=[op('first','第一根斜轴','绕第一根斜轴转过三分之一圈',lantern_a,'spatial',axisVector=[1,1,1],angle=math.tau/3),op('second','第二根斜轴','绕另一根斜轴转过三分之一圈',lantern_b,'spatial',axisVector=[1,-1,-1],angle=math.tau/3)],
             initial=[0,4,3,2,1,5],group='A₄',expected_order=12,
             hints=['这次颜色在棱的中间，顶角只是支架。先跟着一条亮棱看整架灯怎么转。','目标留下两条相对的棱。可以用两根斜轴的转动，拼出另一个方向的半圈。'],
             discovery='同一段转动，也能讲一个关于棱的故事。',math='正四面体的旋转群同构于 A₄，阶为 12。这里颜色放在六条棱上，使用 A₄ 的六点作用。两种三分之一圈旋转可以合成固定两条相对棱的半圈旋转。',intent='将颜色从顶点移到棱的中点，以真实三维旋转投影展示同一群的另一种作用。'),
        dict(id='double_drawer',title='双层抽屉',chapter='第三间 · 整理一小柜颜色',scene='drawers',tag='换一层，借一次工具',points=[[265,150],[400,150],[535,150],[265,320],[400,320],[535,320]],rooms=[[0,1,2],[3,4,5]],
             subtitle='上层能轮转，也能交换邻座。把下层抽屉借上来，一起整理。',
             ops=[op('cycle','上屉轮转','上层三枚依次前进，末尾绕回',[[0,1,2]]),op('swap','上屉换座','交换上层左侧的两枚颜色',[[0,1]]),op('floors','上下换层','两只抽屉从两旁绕过，整层交换',[[0,3],[1,4],[2,5]],'exchange',centers=[[400,150],[400,320]],blocks=[[0,1,2],[3,4,5]],spread=2.2)],
             initial=[2,0,1,5,4,3],group='S₃ ≀ C₂',expected_order=72,
             hints=['先分清每只抽屉需要哪种整理：轮转还是换座。上层的两件工具都能借给下层。','可以先整理眼前的抽屉，再换层处理另一只，最后把两只抽屉送回各自的位置。'],
             discovery='两件小工具，够整理两只不同的抽屉。',math='每层可以实现全部 S₃，整层交换再给出 C₂，生成 S₃ ≀ C₂=(S₃×S₃)⋊C₂，阶为 6²×2=72。三个位置始终作为一整层搬移。',intent='两层分别需要不同的局部操作，整组搬移沿宽弧错开，避免两只抽屉在视觉上穿过彼此。'),
        dict(id='window_breeze',title='风过方窗',chapter='第三间 · 同一阵风的两种织法',scene='shear_window',tag='一横一竖，把风织起来',points=window_points,gridVectors=window_vectors,
             subtitle='上下两排向相反方向走，左右两列也是。看看几阵小风能织出什么。',
             ops=[horizontal,vertical],initial=half_window,group='SL(2,3)',expected_order=24,pair='turning_window',
             hints=['横风会留下中间一行，纵风会留下中间一列。试试让两阵风交替出现。','把一横一竖当作一段小动作，再观察同样的一段动作接上去的效果。'],
             discovery='两阵小风接力，整扇图案悄悄转了半圈。',math='留白的中心是零向量，八枚颜色对应 F₃² 的八个非零向量。两把手为 (x,y)↦(x+y,y) 与 (x,y)↦(x,x+y)，生成阶 24 的 SL(2,3)。交替使用四次可得到中心反向 −I。',intent='通过上下、左右相反的滑行，合成整体半转；越过边缘的颜色沿窗外弧线绕回。'),
        dict(id='turning_window',title='借风转窗',chapter='第三间 · 同一阵风的两种织法',scene='shear_window',tag='换一枚把手，换一种直觉',points=window_points,gridVectors=window_vectors,
             subtitle='还是同一扇窗、同一幅错位。这次，整扇窗也可以转动。',
             ops=[op('turn','转动窗框','整扇窗顺转四分之一圈',window_turn,'orbit',centers=[[400,235],[400,235]],angles=[math.pi/2,math.pi/2],turnFrame=True),horizontal],initial=half_window,group='SL(2,3)',expected_order=24,pair='window_breeze',
             hints=['目标和上一件一样。新把手恰好能一次完成一大段小风的效果。','整扇窗转动两次，就能让每一种颜色去到对面。'],
             discovery='你刚学会的一段动作，现在成了一枚把手。',math='生成元改为 R:(x,y)↦(−y,x) 与横向剪切，仍生成完全相同的 SL(2,3)。初态和目标与第 24 关相同，中心反向可直接由 R² 得到。',intent='把前一关四次局部操作压缩为两次整体转动，作为相邻关卡的轻巧回报。'),
        dict(id='seven_star_weave',title='七星织网',chapter='第三间 · 星图里的约定',scene='fano',tag='有的线是直的，有的线是弯的',points=fano_points,lines=fano_lines,
             subtitle='星轮带动两组三颗星，拨线只换两对。让它们在星网上交接颜色。',
             ops=[op('sky','转动星图','外侧与内侧各三枚一起转，中央留下',star_turn,'orbit',centers=[[400,235],[400,235]],angles=[math.tau/3,math.tau/3]),op('thread','拨动星线','右侧的一对与下方的一对同时交换',pull_x)],
             scramble=[('sky',1),('thread',1),('sky',-1),('thread',1)],group='GL(3,2)',expected_order=168,
             hints=['拨线工具的两处作用会一起发生。星轮可以把另一组颜色送到那里。','可以先借一个朝向，拨线，再归还朝向；接着处理剩下的一次小变化。'],
             discovery='换了颜色的位置，星网上的约定仍然在。',math='七个位置对应 F₂³ 的非零向量，三点共线指其向量和为零，圆形也算一条线。坐标循环与剪切 (x,y,z)↦(x+y,y,z) 生成 GL(3,2)，阶 (8−1)(8−2)(8−4)=168，并保持七条线的关联结构。',intent='用七条可见的线展示受限制的丰富置换，仍由两个简单把手完成一个短小目标。'),
        dict(id='woven_bookmarks',title='交织书签',chapter='第三间 · 一点纸上的魔法',scene='weave',tag='先穿上排，还是先穿下排',points=weave_points,
             subtitle='两排书签交错穿回书页。只换一个起头，重复后的效果就不同。',
             ops=[op('outside','上排先穿','两排交错穿入，先取上排；首尾留下',cycles_of(out_map)),op('inside','下排先穿','两排交错穿入，先取下排',cycles_of(in_map))],
             initial=[7,6,5,4,3,2,1,0],group='C₂ × A₄',expected_order=24,
             hints=['先盯住开头与结尾的两枚。两种穿法对它们的影响不同。','试试同一种穿法连续三次：上排先穿会回到原样，下排先穿会让整个次序反过来。'],
             discovery='起头只差一点，三次之后便是另一幅图案。',math='这两枚把手是八张牌的完美外洗与内洗，生成 C₂³⋊C₃，同构于 C₂×A₄，群阶 24。外洗阶为 3，内洗阶为 6；内洗的三次方是整个序列的反转。',intent='让两种近似的穿梭在重复后产生不同结果，给星网之后安排一段轻巧的书签小戏法。'),
        dict(id='wind_echo',title='风的回声',chapter='第三间 · 把多余的风送回去',scene='echo_wheels',tag='照一下镜子，再等风回来',points=circle(240,235,108,3)+circle(560,235,108,3),
             subtitle='同步的风总会吹动两边。让镜子把右边多余的变化送回去。',
             ops=[op('together','同步的风','两侧各三枚，同向转过一格',[[0,1,2],[3,4,5]],'orbit',centers=[[240,235],[560,235]],angles=[math.tau/3,math.tau/3]),op('left_mirror','左侧镜面','只翻转左侧图案的一对位置',[[0,1]],'mirror'),op('right_mirror','右侧镜面','只翻转右侧图案的一对位置',[[3,4]],'mirror')],
             initial=[2,0,1,3,4,5],group='S₃ × S₃',expected_order=36,
             hints=['右侧本来正确，可以暂时翻面。翻面前后的旋转会产生不同的组合效果。','让同步的风和右侧镜面交替出现；右侧的变化会抵消，左侧仍然向前。'],
             discovery='镜面夹在风中间，回声便替一侧归还了变化。',math='同步三循环与两个局部反射生成 S₃×S₃，阶 36。若同步操作为 ab、右镜为 s，则 bsb s=e，而左侧留下 a²；这使只改左边成为可能。',intent='用局部反射抵消一侧的同步旋转，体验与第 4 关的直接反向联动不同的消除方法。'),
        dict(id='borrowed_stars',title='借星不留痕',chapter='第三间 · 星图里的约定',scene='borrowed_stars',tag='借两颗星，修好另外四颗',points=borrowed_points,
             subtitle='顶端的星一直不动。中间两颗可以暂借，修好下方后再还回来。',
             ops=[op('borrow','借来两颗星','中间一对与星匣下方一对同时交换',pull_x),op('casket','翻转星匣','下方四枚绕星匣中心转半圈',pull_y,'orbit',centers=[[400,305],[400,305]],angles=[math.pi,math.pi],turnFrame=True)],
             initial=[0,1,2,4,3,6,5],group='D₄',expected_order=8,
             hints=['第一枚把手会同时碰到中间和下方，第二枚只碰下方。可以借它改变第一枚把手留下的影响。','让两枚把手交替出场，再重复一次；中间两颗会回家，下方会留下两对换位。'],
             discovery='借来的两颗星都回去了，星匣却已经修好了。',math='两种二阶剪切生成阶 8 的 D₄；在七个位置上有大小为 1、2、4 的三个轨道。四次交替操作给出交换子，保持中间二点不动，只交换下方两对。与第 21 关同构，但群作用不同。',intent='把一个固定点、一个临时借位区和一个待修区直接分开呈现，让局部控制的作用范围可见。'),
        dict(id='three_petal_home',title='三叶归航',chapter='第三间 · 接起三条归途',scene='three_petals',tag='三片花瓣，共借一颗星',points=petals,
             subtitle='三片花瓣借走了彼此的颜色。让三条归途在中央接起来。',
             ops=[op('top','上叶回旋','中央与上方两枚依次轮换',[[0,1,2]]),op('right','右叶回旋','中央与右下两枚依次轮换',[[0,3,4]]),op('left','左叶回旋','中央与左下两枚依次轮换',[[0,5,6]])],
             initial=[0,5,6,1,2,3,4],group='A₇',expected_order=2520,
             hints=['中央虽然已经正确，也可以暂时借给花瓣。先决定一枚颜色要经过哪片叶子。','把一小段交接当成工具，逐片送回颜色；最后再归还中央借出的那一枚。'],
             discovery='三条归途终于合拢，中央那颗星也回家了。',math='三个共享一点的三循环生成 A₇，阶为 7!/2=2520。所有操作都是偶置换，本关目标是外侧两个三循环的乘积；中央位置最终保持不变。',intent='用三片共享同一插槽的花瓣，把交接、借位和复合局部变化接成第三间的收束题。'),
    ]
