(function(root){
const levels = [
  {
    "id": "first_breeze",
    "title": "第一缕风",
    "chapter": "风与镜",
    "scene": "wheel",
    "tag": "轻轻一拨",
    "subtitle": "让风轮上的颜色，落回右侧图样的位置。",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        543.61,
        188.338
      ],
      [
        488.756,
        357.162
      ],
      [
        311.244,
        357.162
      ],
      [
        256.39,
        188.338
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "拨动风轮",
        "caption": "五枚徽章，一起走一格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 2 3 4 5)"
      }
    ],
    "group": "C₅",
    "hints": [
      "每次转动，五枚徽章会一起前进。先盯住一枚颜色。",
      "正转和逆转都可以。找到图样中那枚颜色的位置，再试一小步。"
    ],
    "discovery": "你拨动的，是整个图案。",
    "math": "一个五循环生成循环群 C₅。每次拨动走向下一个状态，五次之后回到原点。",
    "intent": "两次轻巧的转动建立手感。用悬停轨迹与单色追踪教规则。",
    "number": 1,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "initial": [
      2,
      3,
      4,
      0,
      1
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 5,
    "diameter": 2
  },
  {
    "id": "mirror_bloom",
    "title": "镜里的花",
    "chapter": "风与镜",
    "scene": "mirror",
    "tag": "换一个看法",
    "subtitle": "风轮多了一面镜子。有些变化，要翻过来才看得到。",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        543.61,
        188.338
      ],
      [
        488.756,
        357.162
      ],
      [
        311.244,
        357.162
      ],
      [
        256.39,
        188.338
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "拨动风轮",
        "caption": "五枚徽章，一起走一格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "mirror",
        "title": "穿过镜面",
        "caption": "沿中轴翻转，顶部位置不动",
        "cycles": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 5)(3 4)"
      }
    ],
    "group": "D₅",
    "hints": [
      "镜面两侧的位置会成对交换，最上面的位置不动。",
      "留意颜色在圆周上的顺序。转动保留顺序，镜面会把它反过来。"
    ],
    "discovery": "转动改变朝向，镜子改变次序。",
    "math": "转动 r 与反射 s 满足 r⁵=s²=e、srs=r⁻¹，生成阶为 10 的二面体群 D₅。这里 D₅ 指正五边形的对称群。",
    "intent": "沿用上一关的五瓣轮，新增一个一眼能读懂的反射动作。",
    "number": 2,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "initial": [
      3,
      2,
      1,
      0,
      4
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "mirror",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 10,
    "diameter": 3
  },
  {
    "id": "two_gardens",
    "title": "各自开花",
    "chapter": "两阵风",
    "scene": "twins",
    "tag": "各忙各的",
    "subtitle": "两朵花，各有一枚把手。先照顾哪边都可以。",
    "points": [
      [
        240.0,
        127.0
      ],
      [
        333.531,
        289.0
      ],
      [
        146.469,
        289.0
      ],
      [
        560.0,
        127.0
      ],
      [
        653.531,
        289.0
      ],
      [
        466.469,
        289.0
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "左边开花",
        "caption": "只转动左侧的三枚徽章",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          2.0943951023931953
        ],
        "notation": "(1 2 3)"
      },
      {
        "id": "right",
        "title": "右边开花",
        "caption": "只转动右侧的三枚徽章",
        "cycles": [
          [
            3,
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953
        ],
        "notation": "(4 5 6)"
      }
    ],
    "group": "C₃ × C₃",
    "hints": [
      "左边的把手不会碰到右边。可以先完成其中一朵花。",
      "每边只需要对照自己的三个位置。完成的一边会一直等你。"
    ],
    "discovery": "有些机关可以放心地分开处理。",
    "math": "两个互不相交的三循环 a=(1 2 3)、b=(4 5 6) 可交换，生成 C₃ × C₃，群阶为 9。",
    "intent": "一关舒展的独立控制，给下一关的联动反转建立直觉。",
    "number": 3,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "initial": [
      2,
      0,
      1,
      4,
      5,
      3
    ],
    "certificate": [
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "right",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 9,
    "diameter": 2
  },
  {
    "id": "shared_breeze",
    "title": "同频与逆风",
    "chapter": "两阵风",
    "scene": "linked",
    "tag": "借来一阵风",
    "subtitle": "右边已经开好了。新把手却总会同时带动两边。",
    "points": [
      [
        240.0,
        127.0
      ],
      [
        333.531,
        289.0
      ],
      [
        146.469,
        289.0
      ],
      [
        560.0,
        127.0
      ],
      [
        653.531,
        289.0
      ],
      [
        466.469,
        289.0
      ]
    ],
    "ops": [
      {
        "id": "together",
        "title": "同向的风",
        "caption": "左右两朵花，同向转动",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          2.0943951023931953
        ],
        "notation": "(1 2 3)(4 5 6)"
      },
      {
        "id": "apart",
        "title": "相背的风",
        "caption": "左边顺转，右边逆转",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            5,
            4
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          -2.0943951023931953
        ],
        "notation": "(1 2 3)(4 6 5)"
      }
    ],
    "initial": [
      2,
      0,
      1,
      3,
      4,
      5
    ],
    "group": "C₃ × C₃",
    "hints": [
      "已经正确的一边可以暂时转走，只需最后回来。",
      "一次同向、一次相背：右边的变化会抵消，左边会继续前进。"
    ],
    "discovery": "两种联动，拼出一次独立的变化。",
    "math": "操作群与上一关完全相同，生成元改成 ab 与 ab⁻¹。由于 a、b 的阶为 3，这两个联动操作仍生成全部 C₃ × C₃。",
    "intent": "相同位置、相同群、不同生成元。两步抵消带来第一处明确的巧思。",
    "pair": "two_gardens",
    "number": 4,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "together",
        "direction": 1
      },
      {
        "op": "apart",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 9,
    "diameter": 2
  },
  {
    "id": "three_leaf_knot",
    "title": "三叶结",
    "chapter": "借位的手艺",
    "scene": "triad",
    "tag": "三与二的小把戏",
    "subtitle": "把手每次轮换三枚。这一次，要让两对颜色各自交换。",
    "points": [
      [
        280,
        115
      ],
      [
        520,
        115
      ],
      [
        520,
        355
      ],
      [
        280,
        355
      ]
    ],
    "ops": [
      {
        "id": "upper",
        "title": "上叶回旋",
        "caption": "三个角轮换，左下角留下",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "lower",
        "title": "下叶回旋",
        "caption": "三个角轮换，左上角留下",
        "cycles": [
          [
            1,
            2,
            3
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(2 3 4)"
      }
    ],
    "initial": [
      3,
      2,
      1,
      0
    ],
    "group": "A₄",
    "hints": [
      "每次轮换三枚时，总有一个角留在原处。先看看是哪一个角。",
      "可以先做一次三枚的轮换，再让另一枚把手接上。试着让两种回旋交替发生。"
    ],
    "discovery": "三枚一转，也能织出两对交换。",
    "math": "两个三循环 (1 2 3) 与 (2 3 4) 生成四次交错群 A₄，群阶 12。所有操作都是偶置换。本关目标 (1 4)(2 3) 也是偶置换，最短可以用三个三循环完成。",
    "intent": "用三枚轮换合成两对交换，体验操作合成的意外效果；三角丝带明确显示作用范围。",
    "number": 5,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3
    ],
    "certificate": [
      {
        "op": "upper",
        "direction": 1
      },
      {
        "op": "lower",
        "direction": -1
      },
      {
        "op": "upper",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 12,
    "diameter": 3
  },
  {
    "id": "borrowed_scissors",
    "title": "借来的剪刀",
    "chapter": "借位的手艺",
    "scene": "dial",
    "tag": "把事情送过去",
    "subtitle": "剪刀只够得着上方。下方的两枚颜色，正等着换位。",
    "points": [
      [
        280,
        115
      ],
      [
        520,
        115
      ],
      [
        520,
        355
      ],
      [
        280,
        355
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "转动表盘",
        "caption": "四枚徽章，顺转四分之一圈",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)"
      },
      {
        "id": "swap",
        "title": "上方换位",
        "caption": "只交换最上面的两枚徽章",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "initial": [
      0,
      1,
      3,
      2
    ],
    "group": "S₄",
    "hints": [
      "先把想交换的两枚送到上方。剪刀一直留在原处。",
      "转过去、交换、再转回来。途中借走的位置，最后记得归还。"
    ],
    "discovery": "工具够不到的地方，可以借着转盘送过来。",
    "math": "四循环 (1 2 3 4) 与相邻换位 (1 2) 生成 S₄。本关目标是 (3 4)，可以把换位共轭到下方，最短需要 5 次基本操作。",
    "intent": "固定交换工具配合全局转盘，构成可直觉理解的共轭。",
    "pair": "transfer_station",
    "number": 6,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "swap",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 24,
    "diameter": 6
  },
  {
    "id": "transfer_station",
    "title": "小小中转站",
    "chapter": "借位的手艺",
    "scene": "hub",
    "tag": "同一件事，另一种办法",
    "subtitle": "还是交换那两枚颜色。这次，可以借用中间的位置。",
    "points": [
      [
        400,
        237
      ],
      [
        400,
        83
      ],
      [
        235,
        345
      ],
      [
        565,
        345
      ]
    ],
    "ops": [
      {
        "id": "north",
        "title": "北边的小桥",
        "caption": "中央与上方交换",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      },
      {
        "id": "west",
        "title": "左边的小桥",
        "caption": "中央与左下交换",
        "cycles": [
          [
            0,
            2
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 3)"
      },
      {
        "id": "east",
        "title": "右边的小桥",
        "caption": "中央与右下交换",
        "cycles": [
          [
            0,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 4)"
      }
    ],
    "initial": [
      0,
      1,
      3,
      2
    ],
    "group": "S₄",
    "hints": [
      "中央的位置可以暂时寄存一枚颜色。最终再把它还回中央。",
      "走过一座桥，再走另一座桥，最后沿第一座桥回来。"
    ],
    "discovery": "同一个目标，换一套把手，就有了另一种巧法。",
    "math": "星形换位 (1 2)、(1 3)、(1 4) 仍生成 S₄。与上一关的初态和目标完全相同，本关用 (1 3)(1 4)(1 3) 的操作次序交换外侧两点，最短 3 步。",
    "intent": "同一群、同一目标，换生成元与布局；5 步转盘题变成 3 步中转题。",
    "pair": "borrowed_scissors",
    "number": 7,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3
    ],
    "certificate": [
      {
        "op": "west",
        "direction": 1
      },
      {
        "op": "east",
        "direction": 1
      },
      {
        "op": "west",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 24,
    "diameter": 4
  },
  {
    "id": "moving_greenhouse",
    "title": "花房搬家",
    "chapter": "更大的小机关",
    "scene": "exchange",
    "tag": "整间屋子借过来",
    "subtitle": "转花的把手只有左边才有。试试让整间花房换个位置。",
    "points": [
      [
        240.0,
        127.0
      ],
      [
        333.531,
        289.0
      ],
      [
        146.469,
        289.0
      ],
      [
        560.0,
        127.0
      ],
      [
        653.531,
        289.0
      ],
      [
        466.469,
        289.0
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "左边开花",
        "caption": "只转动左侧的三枚徽章",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          2.0943951023931953
        ],
        "notation": "(1 2 3)"
      },
      {
        "id": "exchange",
        "title": "交换花房",
        "caption": "两组三枚徽章，整组换边",
        "cycles": [
          [
            0,
            3
          ],
          [
            1,
            4
          ],
          [
            2,
            5
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "notation": "(1 4)(2 5)(3 6)"
      }
    ],
    "initial": [
      0,
      1,
      2,
      5,
      3,
      4
    ],
    "group": "C₃ ≀ C₂",
    "hints": [
      "这枚把手搬动的是整组。换边后，原来右侧的颜色就能碰到左侧的工具。",
      "搬过来，转一格，再搬回去。"
    ],
    "discovery": "有时，要借的是一整间屋子。",
    "math": "左侧三循环与整组交换生成 (C₃ × C₃) ⋊ C₂，即 C₃ ≀ C₂，群阶 18。两组三点构成块系统；交换把左侧局部操作共轭为右侧操作。",
    "intent": "把借位扩大到整组结构；整间花房沿相反的圆弧交换，保持组内朝向。",
    "number": 8,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "exchange",
        "direction": 1
      },
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "exchange",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 18,
    "diameter": 4
  },
  {
    "id": "far_side_moon",
    "title": "月的背面",
    "chapter": "更大的小机关",
    "scene": "quaternion",
    "tag": "殊途，同一轮月",
    "subtitle": "两道月门，两条不同的路。让星位重新吻合。",
    "points": [
      [
        400.0,
        71.0
      ],
      [
        564.0,
        235.0
      ],
      [
        400.0,
        399.0
      ],
      [
        236.0,
        235.0
      ],
      [
        459.397,
        175.603
      ],
      [
        459.397,
        294.397
      ],
      [
        340.603,
        294.397
      ],
      [
        340.603,
        175.603
      ]
    ],
    "ops": [
      {
        "id": "moon",
        "title": "绕月而行",
        "caption": "内外两圈，一起顺转",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)(5 6 7 8)"
      },
      {
        "id": "tide",
        "title": "穿过潮门",
        "caption": "两条交织的路径，各前进一站",
        "cycles": [
          [
            0,
            4,
            2,
            6
          ],
          [
            1,
            7,
            3,
            5
          ]
        ],
        "motion": "curve",
        "order": 4,
        "notation": "(1 5 3 7)(2 8 4 6)"
      }
    ],
    "initial": [
      2,
      3,
      0,
      1,
      6,
      7,
      4,
      5
    ],
    "group": "Q₈",
    "hints": [
      "先连续使用同一枚把手，看看两次之后发生什么。",
      "修好之后，也可以重来，换另一枚把手试两次。"
    ],
    "discovery": "走两次月门，或两次潮门，竟会抵达同一处。",
    "math": "生成元 i=(1 2 3 4)(5 6 7 8)、j=(1 5 3 7)(2 8 4 6) 满足 i²=j²≠e、i⁴=e、jij⁻¹=i⁻¹，生成八阶四元数群 Q₈。此关是有意安排的两步休息关，可用两种不同把手完成。",
    "intent": "八枚独色徽章的繁复外观藏着两步解，作为终关前的轻巧惊喜；不以群阶制造难度。",
    "number": 9,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "moon",
        "direction": 1
      },
      {
        "op": "moon",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 8,
    "diameter": 2
  },
  {
    "id": "only_a_breeze",
    "title": "只留一阵风",
    "chapter": "工坊的压轴",
    "scene": "overlap",
    "tag": "让多余的变化散去",
    "subtitle": "只有三枚颜色错了。让两阵风经过，再把多余的变化带走。",
    "points": [
      [
        260,
        368
      ],
      [
        130,
        238
      ],
      [
        260,
        108
      ],
      [
        390,
        238
      ],
      [
        520,
        108
      ],
      [
        650,
        238
      ],
      [
        520,
        368
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "左边的风",
        "caption": "左环四枚徽章走一格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            260,
            238
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)"
      },
      {
        "id": "right",
        "title": "右边的风",
        "caption": "右环四枚徽章走一格",
        "cycles": [
          [
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            520,
            238
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(4 5 6 7)"
      }
    ],
    "group": "S₇",
    "hints": [
      "中间的位置属于两个环。四枚已经正确的颜色，也可以暂时离开。",
      "两边各动一次，再依次反向拨回。留意为什么最后只有交点附近发生了变化。"
    ],
    "discovery": "两阵风来过，留下的变化恰好够用。",
    "math": "两个只共享一个位置的四循环 (1 2 3 4)、(4 5 6 7) 生成 S₇。适当组合两者与逆操作，可以留下一个三循环，这就是交换子的局部效果。",
    "intent": "以可见的局部变化收束全篇；7! 个可达状态中的四步小魔术。",
    "number": 10,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "initial": [
      0,
      1,
      6,
      2,
      4,
      5,
      3
    ],
    "certificate": [
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": -1
      },
      {
        "op": "left",
        "direction": -1
      }
    ],
    "shortest": 4,
    "group_order": 5040,
    "diameter": 14
  },
  {
    "id": "two_mirrors",
    "title": "双镜成风",
    "chapter": "第二间 · 另一种转动",
    "scene": "double_mirror",
    "tag": "两次翻面，一阵旋转",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        530.77,
        159.5
      ],
      [
        530.77,
        310.5
      ],
      [
        400.0,
        386.0
      ],
      [
        269.23,
        310.5
      ],
      [
        269.23,
        159.5
      ]
    ],
    "subtitle": "没有转轮，只有两面镜子。让它们轮流照一照。",
    "ops": [
      {
        "id": "upright",
        "title": "竖起的镜子",
        "caption": "沿竖直镜轴翻面，顶部和底部留下",
        "cycles": [
          [
            1,
            5
          ],
          [
            2,
            4
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 6)(3 5)"
      },
      {
        "id": "slanted",
        "title": "斜放的镜子",
        "caption": "沿斜镜轴翻面，三对位置一起交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            5
          ],
          [
            3,
            4
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 2)(3 6)(4 5)"
      }
    ],
    "group": "D₆",
    "hints": [
      "每面镜子按两次，都会回去。试着让两面镜子交替出场。",
      "两次不同的翻面，会把整圈颜色转过一格。需要时再借同样的一阵风。"
    ],
    "discovery": "两面镜子接力，也能织出一圈旋转。",
    "math": "两种反射生成正六边形的二面体群 D₆，阶为 12。它们的乘积是六循环；本关需要把这个旋转组合使用两次。",
    "intent": "把第一间的旋转换成两面可见的镜轴，让四步解来自发现动作的组合。",
    "number": 11,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "initial": [
      4,
      5,
      0,
      1,
      2,
      3
    ],
    "certificate": [
      {
        "op": "slanted",
        "direction": 1
      },
      {
        "op": "upright",
        "direction": 1
      },
      {
        "op": "slanted",
        "direction": 1
      },
      {
        "op": "upright",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 12,
    "diameter": 6
  },
  {
    "id": "three_doors",
    "title": "三道小门",
    "chapter": "第二间 · 掌心里的空间",
    "scene": "cube_flips",
    "tag": "一次，只改一个方向",
    "points": [
      [
        240,
        181
      ],
      [
        464,
        181
      ],
      [
        240,
        353
      ],
      [
        464,
        353
      ],
      [
        336,
        117
      ],
      [
        560,
        117
      ],
      [
        336,
        289
      ],
      [
        560,
        289
      ]
    ],
    "vertices": [
      [
        -1,
        -1,
        -1
      ],
      [
        1,
        -1,
        -1
      ],
      [
        -1,
        1,
        -1
      ],
      [
        1,
        1,
        -1
      ],
      [
        -1,
        -1,
        1
      ],
      [
        1,
        -1,
        1
      ],
      [
        -1,
        1,
        1
      ],
      [
        1,
        1,
        1
      ]
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        4
      ],
      [
        1,
        3
      ],
      [
        1,
        5
      ],
      [
        2,
        3
      ],
      [
        2,
        6
      ],
      [
        3,
        7
      ],
      [
        4,
        5
      ],
      [
        4,
        6
      ],
      [
        5,
        7
      ],
      [
        6,
        7
      ]
    ],
    "faces": [
      [
        0,
        1,
        3,
        2
      ],
      [
        4,
        5,
        7,
        6
      ],
      [
        0,
        1,
        5,
        4
      ]
    ],
    "subtitle": "三道门通向三个方向。它们可以各自做好自己的事。",
    "ops": [
      {
        "id": "across",
        "title": "左右穿门",
        "caption": "左右对应的四对颜色一起交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(3 4)(5 6)(7 8)"
      },
      {
        "id": "height",
        "title": "上下穿门",
        "caption": "上下对应的四对颜色一起交换",
        "cycles": [
          [
            0,
            2
          ],
          [
            1,
            3
          ],
          [
            4,
            6
          ],
          [
            5,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 3)(2 4)(5 7)(6 8)"
      },
      {
        "id": "depth",
        "title": "前后穿门",
        "caption": "前后对应的四对颜色一起交换",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "initial": [
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "group": "C₂ × C₂ × C₂",
    "hints": [
      "先跟着一种颜色，看它还差哪个方向。一次穿门只改变一个方向。",
      "三道门彼此不拆台。同一道门用两次会抵消，可以试试各用一次。"
    ],
    "discovery": "方向各自归位，整只星匣就一起对齐了。",
    "math": "八个位置标记为三位二进制向量。三枚把手分别翻转一位，彼此可交换，生成 C₂³。目标对应同时翻转三位，每种顺序都可完成。",
    "intent": "把独立控制放到立体线框上；八枚颜色由三个互不干扰的方向决定。",
    "number": 12,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "across",
        "direction": 1
      },
      {
        "op": "height",
        "direction": 1
      },
      {
        "op": "depth",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 8,
    "diameter": 3
  },
  {
    "id": "palm_constellation",
    "title": "掌心星匣",
    "chapter": "第二间 · 掌心里的空间",
    "scene": "cube_turns",
    "tag": "把缺少的方向借过来",
    "points": [
      [
        240,
        181
      ],
      [
        464,
        181
      ],
      [
        240,
        353
      ],
      [
        464,
        353
      ],
      [
        336,
        117
      ],
      [
        560,
        117
      ],
      [
        336,
        289
      ],
      [
        560,
        289
      ]
    ],
    "vertices": [
      [
        -1,
        -1,
        -1
      ],
      [
        1,
        -1,
        -1
      ],
      [
        -1,
        1,
        -1
      ],
      [
        1,
        1,
        -1
      ],
      [
        -1,
        -1,
        1
      ],
      [
        1,
        -1,
        1
      ],
      [
        -1,
        1,
        1
      ],
      [
        1,
        1,
        1
      ]
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        4
      ],
      [
        1,
        3
      ],
      [
        1,
        5
      ],
      [
        2,
        3
      ],
      [
        2,
        6
      ],
      [
        3,
        7
      ],
      [
        4,
        5
      ],
      [
        4,
        6
      ],
      [
        5,
        7
      ],
      [
        6,
        7
      ]
    ],
    "faces": [
      [
        0,
        1,
        3,
        2
      ],
      [
        4,
        5,
        7,
        6
      ],
      [
        0,
        1,
        5,
        4
      ]
    ],
    "subtitle": "小门变成了翻面把手。星匣能转动的方向，比把手更多。",
    "ops": [
      {
        "id": "tilt",
        "title": "横轴翻面",
        "caption": "整只星匣绕横轴翻转四分之一圈",
        "cycles": [
          [
            0,
            2,
            6,
            4
          ],
          [
            1,
            3,
            7,
            5
          ]
        ],
        "motion": "spatial",
        "order": 4,
        "axis": "x",
        "angle": 1.5707963267948966,
        "notation": "(1 3 7 5)(2 4 8 6)"
      },
      {
        "id": "yaw",
        "title": "竖轴翻面",
        "caption": "整只星匣绕竖轴翻转四分之一圈",
        "cycles": [
          [
            0,
            4,
            5,
            1
          ],
          [
            2,
            6,
            7,
            3
          ]
        ],
        "motion": "spatial",
        "order": 4,
        "axis": "y",
        "angle": 1.5707963267948966,
        "notation": "(1 5 6 2)(3 7 8 4)"
      }
    ],
    "group": "S₄",
    "hints": [
      "你想要的方向没有单独的把手。可以先换个朝向再翻。",
      "先借一个朝向，让另一枚把手发挥作用，最后把借的朝向还回来。"
    ],
    "discovery": "换个朝向，熟悉的把手就能做一件新事。",
    "math": "两种四分之一圈的刚体旋转生成立方体旋转群，阶为 24，同构于 S₄。这里作用在八个顶点上，与第 6、7 关的四点作用不同。共轭可产生第三根轴上的旋转。",
    "intent": "与上一关共用八点线框，改为真正的三维旋转投影，体验同一外形上的另一套规则。",
    "number": 13,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      1,
      3,
      0,
      2,
      5,
      7,
      4,
      6
    ],
    "certificate": [
      {
        "op": "tilt",
        "direction": 1
      },
      {
        "op": "yaw",
        "direction": -1
      },
      {
        "op": "tilt",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 24,
    "diameter": 4
  },
  {
    "id": "two_and_three",
    "title": "两拍与三拍",
    "chapter": "第二间 · 小小的节拍",
    "scene": "rhythm",
    "tag": "等另一边绕完一圈",
    "points": [
      [
        190,
        235
      ],
      [
        350,
        235
      ],
      [
        555.0,
        129.0
      ],
      [
        646.799,
        288.0
      ],
      [
        463.201,
        288.0
      ]
    ],
    "subtitle": "一边来回两拍，一边转过三拍。让一边回家，另一边刚好换位。",
    "ops": [
      {
        "id": "beat",
        "title": "轻敲节拍",
        "caption": "左侧换位一次，右侧同时转过一格",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 6,
        "centers": [
          [
            270,
            235
          ],
          [
            555,
            235
          ]
        ],
        "angles": [
          3.141592653589793,
          2.0943951023931953
        ],
        "notation": "(1 2)(3 4 5)"
      }
    ],
    "initial": [
      1,
      0,
      2,
      3,
      4
    ],
    "group": "C₆",
    "hints": [
      "右边每三次回到原处，左边每两次回到原处。",
      "先等右侧转满一圈，看看左侧会停在哪里。"
    ],
    "discovery": "不同的节拍，也能在恰好的时候相遇。",
    "math": "生成元是互不相交的二循环和三循环的乘积，阶为 lcm(2,3)=6。它的三次方只交换左侧两点，右侧三点恢复不动。",
    "intent": "空间题之后安排一个短小的周期关，摆动和花轮使用不同的可见节拍。",
    "number": 14,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "certificate": [
      {
        "op": "beat",
        "direction": 1
      },
      {
        "op": "beat",
        "direction": 1
      },
      {
        "op": "beat",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 6,
    "diameter": 3
  },
  {
    "id": "four_stations",
    "title": "四站回廊",
    "chapter": "第二间 · 成组的巧思",
    "scene": "four_rooms",
    "tag": "沿途，顺手修两站",
    "points": [
      [
        365.0,
        100.0
      ],
      [
        435.0,
        100.0
      ],
      [
        535.0,
        200.0
      ],
      [
        535.0,
        270.0
      ],
      [
        435.0,
        370.0
      ],
      [
        365.0,
        370.0
      ],
      [
        265.0,
        270.0
      ],
      [
        265.0,
        200.0
      ]
    ],
    "rooms": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ]
    ],
    "centers": [
      [
        400.0,
        100.0
      ],
      [
        535.0,
        235.0
      ],
      [
        400.0,
        370.0
      ],
      [
        265.0,
        235.0
      ]
    ],
    "subtitle": "相邻的两座站台需要换位。把它们依次送到上方的工具旁。",
    "ops": [
      {
        "id": "tour",
        "title": "转动回廊",
        "caption": "四座站台一起顺转四分之一圈",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "service",
        "title": "上站换位",
        "caption": "只交换正上方站台里的两枚颜色",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "initial": [
      0,
      1,
      3,
      2,
      5,
      4,
      6,
      7
    ],
    "group": "C₂ ≀ C₄",
    "hints": [
      "把要修的站台送上来。修好一站后，继续去下一站，最后恢复回廊的朝向。",
      "两站正好相邻，可以让它们先后经过工具；别急着每修好一站就立刻转回去。"
    ],
    "discovery": "把几次借位连成一条路，少走一些来回。",
    "math": "四个可独立交换的二点块构成 C₂⁴，整体四循环轮换这些块，生成 C₂ ≀ C₄，阶为 16×4=64。目标交换两个相邻站台的内部位置。分别借位归还需要 3+5 步；串成一条行程只需 6 步。",
    "intent": "从单次共轭延伸到沿途处理两个局部任务，鼓励把借位行程连起来。",
    "number": 15,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "service",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "service",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 64,
    "diameter": 8
  },
  {
    "id": "roundabout_post",
    "title": "绕心邮局",
    "chapter": "第二间 · 路线的小秘密",
    "scene": "postal",
    "tag": "留住一枚，换一种走法",
    "points": [
      [
        400,
        235
      ],
      [
        400,
        93
      ],
      [
        542,
        235
      ],
      [
        258,
        235
      ],
      [
        400,
        377
      ]
    ],
    "subtitle": "邮路会经过中央，风轮却只转外圈。让两条路线互相借一步。",
    "ops": [
      {
        "id": "post",
        "title": "沿路递送",
        "caption": "五枚颜色沿邮路依次走一站",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 5,
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "wind",
        "title": "绕心拨动",
        "caption": "中央留下，外圈四枚顺转一格",
        "cycles": [
          [
            1,
            2,
            4,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(2 3 5 4)"
      }
    ],
    "group": "AGL(1,5)",
    "hints": [
      "一次操作会动到中央，另一次会留下中央。先追踪一枚颜色经过两种路线的情况。",
      "外圈拨动、沿路递送、再拨动外圈，可以把这次错位折返回来。"
    ],
    "discovery": "同一批颜色，沿另一条路线走，便有了新的捷径。",
    "math": "将图中 1–5 号位置依次对应到模 5 的 0–4，两枚把手分别是 x↦x+1 与 x↦2x，生成 AGL(1,5)=C₅⋊C₄，阶 20。目标是 x↦4x+2；它可由三次操作合成。",
    "intent": "中心与外圈的作用范围不同，用折返路线形成一处非对称的三步巧解。",
    "number": 16,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "initial": [
      2,
      1,
      0,
      4,
      3
    ],
    "certificate": [
      {
        "op": "wind",
        "direction": 1
      },
      {
        "op": "post",
        "direction": 1
      },
      {
        "op": "wind",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 20,
    "diameter": 3
  },
  {
    "id": "five_petals",
    "title": "五瓣结",
    "chapter": "第二间 · 同一结的两种织法",
    "scene": "five_petals",
    "tag": "先转花，再织结",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        543.61,
        188.338
      ],
      [
        488.756,
        357.162
      ],
      [
        311.244,
        357.162
      ],
      [
        256.39,
        188.338
      ]
    ],
    "subtitle": "两对颜色打了结。先把要处理的三枚送到花瓣工具里。",
    "ops": [
      {
        "id": "flower",
        "title": "转动整花",
        "caption": "五枚颜色一起顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "knot",
        "title": "三瓣回旋",
        "caption": "只轮换上方与右侧的三枚颜色",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      }
    ],
    "initial": [
      1,
      0,
      2,
      4,
      3
    ],
    "group": "A₅",
    "pair": "butterfly_knot",
    "hints": [
      "花瓣工具每次只处理三枚。整花转动，可以把另一组三枚送进去。",
      "可以暂时动到已经正确的颜色；把两对换位拆成几次三枚轮换来完成。"
    ],
    "discovery": "大花轮负责借位，小花瓣负责解结。",
    "math": "五循环与三循环生成五次交错群 A₅，阶 60。本关要求双换位 (1 2)(4 5)。下一关保留同一初态和目标，改用另一组生成元。",
    "intent": "全局转花配合局部三循环，准备下一关同群同目标的操作对照。",
    "number": 17,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "certificate": [
      {
        "op": "flower",
        "direction": 1
      },
      {
        "op": "knot",
        "direction": 1
      },
      {
        "op": "flower",
        "direction": -1
      },
      {
        "op": "knot",
        "direction": -1
      },
      {
        "op": "flower",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 60,
    "diameter": 6
  },
  {
    "id": "butterfly_knot",
    "title": "蝶翼回旋",
    "chapter": "第二间 · 同一结的两种织法",
    "scene": "butterfly",
    "tag": "把同一个结，交给双翼",
    "points": [
      [
        220,
        338.923
      ],
      [
        220,
        131.077
      ],
      [
        400,
        235
      ],
      [
        580,
        131.077
      ],
      [
        580,
        338.923
      ]
    ],
    "subtitle": "还是那两对颜色。这次让两片蝶翼在中间接力。",
    "ops": [
      {
        "id": "left",
        "title": "左翼回旋",
        "caption": "左侧三枚绕左翼顺转",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            280,
            235
          ]
        ],
        "angles": [
          2.0943951023931953
        ],
        "notation": "(1 2 3)"
      },
      {
        "id": "right",
        "title": "右翼回旋",
        "caption": "右侧三枚绕右翼顺转",
        "cycles": [
          [
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            520,
            235
          ]
        ],
        "angles": [
          2.0943951023931953
        ],
        "notation": "(3 4 5)"
      }
    ],
    "initial": [
      1,
      0,
      2,
      4,
      3
    ],
    "group": "A₅",
    "pair": "five_petals",
    "hints": [
      "两片蝶翼共用中间的位置，可以在那里交接颜色。",
      "试着让左右翼交替转动，并把借用中间位置造成的变化归还。"
    ],
    "discovery": "结没有变，织法却可以完全不同。",
    "math": "三循环 (1 2 3) 与 (3 4 5) 仍生成同一个 A₅。本关与第 17 关的初态、目标和位置编号相同，换了生成元与空间布局。",
    "intent": "把相同的双换位目标放进两个共享位置的三循环，提供与整花工具不同的思考方式。",
    "number": 18,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "certificate": [
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "right",
        "direction": -1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 60,
    "diameter": 6
  },
  {
    "id": "three_room_shift",
    "title": "三室换班",
    "chapter": "第二间 · 成组的巧思",
    "scene": "three_rooms",
    "tag": "屋子换班，颜色换座",
    "points": [
      [
        364.0,
        100.0
      ],
      [
        436.0,
        100.0
      ],
      [
        480.913,
        302.5
      ],
      [
        552.913,
        302.5
      ],
      [
        247.087,
        302.5
      ],
      [
        319.087,
        302.5
      ]
    ],
    "rooms": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ]
    ],
    "centers": [
      [
        400.0,
        100.0
      ],
      [
        516.913,
        302.5
      ],
      [
        283.087,
        302.5
      ]
    ],
    "subtitle": "三间花房换了班，屋里的座位也颠倒了。沿途把它们逐间修好。",
    "ops": [
      {
        "id": "carousel",
        "title": "花房巡游",
        "caption": "三间花房顺转一站，各自保持朝向",
        "cycles": [
          [
            0,
            2,
            4
          ],
          [
            1,
            3,
            5
          ]
        ],
        "motion": "carousel",
        "order": 3,
        "centers": [
          [
            400.0,
            100.0
          ],
          [
            516.913,
            302.5
          ],
          [
            283.087,
            302.5
          ]
        ],
        "blocks": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "pivot": [
          400,
          235
        ],
        "angle": 2.0943951023931953,
        "notation": "(1 3 5)(2 4 6)"
      },
      {
        "id": "neighbor",
        "title": "交换邻房",
        "caption": "上方与右下花房整组交换",
        "cycles": [
          [
            0,
            2
          ],
          [
            1,
            3
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            400.0,
            100.0
          ],
          [
            516.913,
            302.5
          ]
        ],
        "blocks": [
          [
            0,
            1
          ],
          [
            2,
            3
          ]
        ],
        "notation": "(1 3)(2 4)"
      },
      {
        "id": "seats",
        "title": "上房换座",
        "caption": "只交换上方花房里的两枚颜色",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "initial": [
      3,
      2,
      5,
      4,
      1,
      0
    ],
    "group": "C₂ ≀ S₃",
    "hints": [
      "先区分两件事：花房在哪一站，以及房内两枚的次序。",
      "可以一边巡游，一边处理来到上方的房间。再用整组交换修正房间的相对位置。"
    ],
    "discovery": "把大问题拆成房间和座位，两层变化就能各自归位。",
    "math": "三间二点花房可以各自换座，三个块也能任意排列，生成 C₂ ≀ S₃=C₂³⋊S₃，群阶 8×6=48。这个块系统把全局位置和局部次序分成两层。",
    "intent": "用三种可读的工具组合整组排序与局部整理，作为终关前的综合题。",
    "number": 19,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "seats",
        "direction": 1
      },
      {
        "op": "carousel",
        "direction": -1
      },
      {
        "op": "seats",
        "direction": 1
      },
      {
        "op": "carousel",
        "direction": -1
      },
      {
        "op": "seats",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 48,
    "diameter": 6
  },
  {
    "id": "star_orbit_finale",
    "title": "星轨合奏",
    "chapter": "第二间 · 归还所有借来的风",
    "scene": "asymmetric_overlap",
    "tag": "四拍与五拍，最后一次合奏",
    "points": [
      [
        260,
        360
      ],
      [
        140,
        240
      ],
      [
        260,
        120
      ],
      [
        380,
        240
      ],
      [
        469.828,
        116.363
      ],
      [
        615.172,
        163.588
      ],
      [
        615.172,
        316.412
      ],
      [
        469.828,
        363.637
      ]
    ],
    "subtitle": "五枚颜色已经对了。余下三枚，藏着一次更深的借位。",
    "ops": [
      {
        "id": "left",
        "title": "四拍星轮",
        "caption": "左轮四枚颜色顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            260,
            240
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)"
      },
      {
        "id": "right",
        "title": "五拍星轮",
        "caption": "右轮五枚颜色顺转一格",
        "cycles": [
          [
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            510,
            240
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(4 5 6 7 8)"
      }
    ],
    "group": "S₈",
    "hints": [
      "可以把一段来回操作当成一枚新的把手。先制造局部变化，再把它搬到需要的位置。",
      "先借用交点做一次局部调整，再处理剩余的错位。每次借来的位置，最终都要归还。"
    ],
    "discovery": "所有借来的风都归还了，留下的正是你想要的变化。",
    "math": "四循环与五循环共享一个位置，生成 S₈，共有 40320 个位置置换。本关把两个局部变化组合起来，最终只改变三个位置；允许途中暂时打乱其余五枚。",
    "intent": "用不同周期的相交星轮，把借位、局部操作和抵消串成一段收束全篇的解法。",
    "number": 20,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      0,
      3,
      1,
      2,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": -1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": -1
      }
    ],
    "shortest": 8,
    "group_order": 40320,
    "diameter": 16
  },
  {
    "id": "alternating_walk",
    "title": "交错步道",
    "chapter": "第三间 · 让脚步交织",
    "scene": "staggered_walk",
    "tag": "换一座桥，再走一步",
    "points": [
      [
        400.0,
        80.0
      ],
      [
        509.602,
        125.398
      ],
      [
        555.0,
        235.0
      ],
      [
        509.602,
        344.602
      ],
      [
        400.0,
        390.0
      ],
      [
        290.398,
        344.602
      ],
      [
        245.0,
        235.0
      ],
      [
        290.398,
        125.398
      ]
    ],
    "subtitle": "两组小桥交错相接。轮流走过它们，让颜色去到对面。",
    "ops": [
      {
        "id": "odd",
        "title": "第一组桥",
        "caption": "四对相邻颜色同时交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(3 4)(5 6)(7 8)"
      },
      {
        "id": "even",
        "title": "第二组桥",
        "caption": "换一组邻居，四对颜色同时交换",
        "cycles": [
          [
            1,
            2
          ],
          [
            3,
            4
          ],
          [
            5,
            6
          ],
          [
            7,
            0
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 3)(4 5)(6 7)(8 1)"
      }
    ],
    "initial": [
      4,
      5,
      6,
      7,
      0,
      1,
      2,
      3
    ],
    "group": "D₄",
    "hints": [
      "连续走同一组桥，会回到原处。换一组桥，颜色才会继续前进。",
      "跟着一枚颜色，交替走两组桥。两股颜色会沿相反方向去到对面。"
    ],
    "discovery": "交错的小步，也能带来一次完整的转身。",
    "math": "两枚把手都是二阶置换，它们的乘积阶为 4，生成阶 8 的二面体群 D₄。这是它在八个位置上的正则作用；两次交替组合产生全部颜色的对面换位。",
    "intent": "用两组可见的相邻小桥产生相反方向的两股流，作为新工坊的四步开场。",
    "number": 21,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "odd",
        "direction": 1
      },
      {
        "op": "even",
        "direction": 1
      },
      {
        "op": "odd",
        "direction": 1
      },
      {
        "op": "even",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 8,
    "diameter": 4
  },
  {
    "id": "edge_lantern",
    "title": "棱上微光",
    "chapter": "第三间 · 棱与面的秘密",
    "scene": "edge_lantern",
    "tag": "颜色住在棱上",
    "points": [
      [
        520,
        235
      ],
      [
        400,
        343
      ],
      [
        456,
        183
      ],
      [
        344,
        287
      ],
      [
        400,
        127
      ],
      [
        280,
        235
      ]
    ],
    "vertices": [
      [
        1,
        0,
        0
      ],
      [
        0,
        1,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        0,
        0,
        -1
      ],
      [
        0,
        -1,
        0
      ],
      [
        -1,
        0,
        0
      ]
    ],
    "projection": {
      "origin": [
        400,
        235
      ],
      "basis": [
        [
          120,
          0
        ],
        [
          0,
          108
        ],
        [
          56,
          -52
        ]
      ]
    },
    "frameVertices": [
      [
        1,
        1,
        1
      ],
      [
        1,
        -1,
        -1
      ],
      [
        -1,
        1,
        -1
      ],
      [
        -1,
        -1,
        1
      ]
    ],
    "frameEdges": [
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        3
      ],
      [
        1,
        2
      ],
      [
        1,
        3
      ],
      [
        2,
        3
      ]
    ],
    "subtitle": "六种颜色点亮六条棱。转动整架小灯，让每道微光归位。",
    "ops": [
      {
        "id": "first",
        "title": "第一根斜轴",
        "caption": "绕第一根斜轴转过三分之一圈",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            5,
            4
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axisVector": [
          1,
          1,
          1
        ],
        "angle": 2.0943951023931953,
        "notation": "(1 2 3)(4 6 5)"
      },
      {
        "id": "second",
        "title": "第二根斜轴",
        "caption": "绕另一根斜轴转过三分之一圈",
        "cycles": [
          [
            0,
            4,
            3
          ],
          [
            1,
            2,
            5
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axisVector": [
          1,
          -1,
          -1
        ],
        "angle": 2.0943951023931953,
        "notation": "(1 5 4)(2 3 6)"
      }
    ],
    "initial": [
      0,
      4,
      3,
      2,
      1,
      5
    ],
    "group": "A₄",
    "hints": [
      "这次颜色在棱的中间，顶角只是支架。先跟着一条亮棱看整架灯怎么转。",
      "目标留下两条相对的棱。可以用两根斜轴的转动，拼出另一个方向的半圈。"
    ],
    "discovery": "同一段转动，也能讲一个关于棱的故事。",
    "math": "正四面体的旋转群同构于 A₄，阶为 12。这里颜色放在六条棱上，使用 A₄ 的六点作用。两种三分之一圈旋转可以合成固定两条相对棱的半圈旋转。",
    "intent": "将颜色从顶点移到棱的中点，以真实三维旋转投影展示同一群的另一种作用。",
    "number": 22,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "first",
        "direction": 1
      },
      {
        "op": "second",
        "direction": 1
      },
      {
        "op": "first",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 12,
    "diameter": 3
  },
  {
    "id": "double_drawer",
    "title": "双层抽屉",
    "chapter": "第三间 · 整理一小柜颜色",
    "scene": "drawers",
    "tag": "换一层，借一次工具",
    "points": [
      [
        265,
        150
      ],
      [
        400,
        150
      ],
      [
        535,
        150
      ],
      [
        265,
        320
      ],
      [
        400,
        320
      ],
      [
        535,
        320
      ]
    ],
    "rooms": [
      [
        0,
        1,
        2
      ],
      [
        3,
        4,
        5
      ]
    ],
    "subtitle": "上层能轮转，也能交换邻座。把下层抽屉借上来，一起整理。",
    "ops": [
      {
        "id": "cycle",
        "title": "上屉轮转",
        "caption": "上层三枚依次前进，末尾绕回",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "swap",
        "title": "上屉换座",
        "caption": "交换上层左侧的两枚颜色",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      },
      {
        "id": "floors",
        "title": "上下换层",
        "caption": "两只抽屉从两旁绕过，整层交换",
        "cycles": [
          [
            0,
            3
          ],
          [
            1,
            4
          ],
          [
            2,
            5
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            400,
            150
          ],
          [
            400,
            320
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "spread": 2.2,
        "notation": "(1 4)(2 5)(3 6)"
      }
    ],
    "initial": [
      2,
      0,
      1,
      5,
      4,
      3
    ],
    "group": "S₃ ≀ C₂",
    "hints": [
      "先分清每只抽屉需要哪种整理：轮转还是换座。上层的两件工具都能借给下层。",
      "可以先整理眼前的抽屉，再换层处理另一只，最后把两只抽屉送回各自的位置。"
    ],
    "discovery": "两件小工具，够整理两只不同的抽屉。",
    "math": "每层可以实现全部 S₃，整层交换再给出 C₂，生成 S₃ ≀ C₂=(S₃×S₃)⋊C₂，阶为 6²×2=72。三个位置始终作为一整层搬移。",
    "intent": "两层分别需要不同的局部操作，整组搬移沿宽弧错开，避免两只抽屉在视觉上穿过彼此。",
    "number": 23,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "cycle",
        "direction": -1
      },
      {
        "op": "floors",
        "direction": 1
      },
      {
        "op": "cycle",
        "direction": -1
      },
      {
        "op": "swap",
        "direction": 1
      },
      {
        "op": "floors",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 72,
    "diameter": 6
  },
  {
    "id": "window_breeze",
    "title": "风过方窗",
    "chapter": "第三间 · 同一阵风的两种织法",
    "scene": "shear_window",
    "tag": "一横一竖，把风织起来",
    "points": [
      [
        270,
        105
      ],
      [
        400,
        105
      ],
      [
        530,
        105
      ],
      [
        530,
        235
      ],
      [
        530,
        365
      ],
      [
        400,
        365
      ],
      [
        270,
        365
      ],
      [
        270,
        235
      ]
    ],
    "gridVectors": [
      [
        -1,
        -1
      ],
      [
        0,
        -1
      ],
      [
        1,
        -1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ],
      [
        0,
        1
      ],
      [
        -1,
        1
      ],
      [
        -1,
        0
      ]
    ],
    "subtitle": "上下两排向相反方向走，左右两列也是。看看几阵小风能织出什么。",
    "ops": [
      {
        "id": "horizontal",
        "title": "横向的风",
        "caption": "上排向左，下排向右；到边缘绕回",
        "cycles": [
          [
            0,
            2,
            1
          ],
          [
            4,
            6,
            5
          ]
        ],
        "motion": "shear",
        "order": 3,
        "axis": "x",
        "spacing": 130,
        "pivot": [
          400,
          235
        ],
        "notation": "(1 3 2)(5 7 6)"
      },
      {
        "id": "vertical",
        "title": "纵向的风",
        "caption": "左列向上，右列向下；到边缘绕回",
        "cycles": [
          [
            0,
            6,
            7
          ],
          [
            2,
            3,
            4
          ]
        ],
        "motion": "shear",
        "order": 3,
        "axis": "y",
        "spacing": 130,
        "pivot": [
          400,
          235
        ],
        "notation": "(1 7 8)(3 4 5)"
      }
    ],
    "initial": [
      4,
      5,
      6,
      7,
      0,
      1,
      2,
      3
    ],
    "group": "SL(2,3)",
    "pair": "turning_window",
    "hints": [
      "横风会留下中间一行，纵风会留下中间一列。试试让两阵风交替出现。",
      "把一横一竖当作一段小动作，再观察同样的一段动作接上去的效果。"
    ],
    "discovery": "两阵小风接力，整扇图案悄悄转了半圈。",
    "math": "留白的中心是零向量，八枚颜色对应 F₃² 的八个非零向量。两把手为 (x,y)↦(x+y,y) 与 (x,y)↦(x,x+y)，生成阶 24 的 SL(2,3)。交替使用四次可得到中心反向 −I。",
    "intent": "通过上下、左右相反的滑行，合成整体半转；越过边缘的颜色沿窗外弧线绕回。",
    "number": 24,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "horizontal",
        "direction": 1
      },
      {
        "op": "vertical",
        "direction": 1
      },
      {
        "op": "horizontal",
        "direction": 1
      },
      {
        "op": "vertical",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 24,
    "diameter": 4
  },
  {
    "id": "turning_window",
    "title": "借风转窗",
    "chapter": "第三间 · 同一阵风的两种织法",
    "scene": "shear_window",
    "tag": "换一枚把手，换一种直觉",
    "points": [
      [
        270,
        105
      ],
      [
        400,
        105
      ],
      [
        530,
        105
      ],
      [
        530,
        235
      ],
      [
        530,
        365
      ],
      [
        400,
        365
      ],
      [
        270,
        365
      ],
      [
        270,
        235
      ]
    ],
    "gridVectors": [
      [
        -1,
        -1
      ],
      [
        0,
        -1
      ],
      [
        1,
        -1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ],
      [
        0,
        1
      ],
      [
        -1,
        1
      ],
      [
        -1,
        0
      ]
    ],
    "subtitle": "还是同一扇窗、同一幅错位。这次，整扇窗也可以转动。",
    "ops": [
      {
        "id": "turn",
        "title": "转动窗框",
        "caption": "整扇窗顺转四分之一圈",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "horizontal",
        "title": "横向的风",
        "caption": "上排向左，下排向右；到边缘绕回",
        "cycles": [
          [
            0,
            2,
            1
          ],
          [
            4,
            6,
            5
          ]
        ],
        "motion": "shear",
        "order": 3,
        "axis": "x",
        "spacing": 130,
        "pivot": [
          400,
          235
        ],
        "notation": "(1 3 2)(5 7 6)"
      }
    ],
    "initial": [
      4,
      5,
      6,
      7,
      0,
      1,
      2,
      3
    ],
    "group": "SL(2,3)",
    "pair": "window_breeze",
    "hints": [
      "目标和上一件一样。新把手恰好能一次完成一大段小风的效果。",
      "整扇窗转动两次，就能让每一种颜色去到对面。"
    ],
    "discovery": "你刚学会的一段动作，现在成了一枚把手。",
    "math": "生成元改为 R:(x,y)↦(−y,x) 与横向剪切，仍生成完全相同的 SL(2,3)。初态和目标与第 24 关相同，中心反向可直接由 R² 得到。",
    "intent": "把前一关四次局部操作压缩为两次整体转动，作为相邻关卡的轻巧回报。",
    "number": 25,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 24,
    "diameter": 3
  },
  {
    "id": "seven_star_weave",
    "title": "七星织网",
    "chapter": "第三间 · 星图里的约定",
    "scene": "fano",
    "tag": "有的线是直的，有的线是弯的",
    "points": [
      [
        400,
        75
      ],
      [
        538.564,
        315
      ],
      [
        469.282,
        195
      ],
      [
        261.436,
        315
      ],
      [
        330.718,
        195
      ],
      [
        400,
        315
      ],
      [
        400,
        235
      ]
    ],
    "lines": [
      [
        0,
        1,
        2
      ],
      [
        0,
        3,
        4
      ],
      [
        1,
        3,
        5
      ],
      [
        0,
        5,
        6
      ],
      [
        1,
        4,
        6
      ],
      [
        2,
        3,
        6
      ],
      [
        2,
        4,
        5
      ]
    ],
    "subtitle": "星轮带动两组三颗星，拨线只换两对。让它们在星网上交接颜色。",
    "ops": [
      {
        "id": "sky",
        "title": "转动星图",
        "caption": "外侧与内侧各三枚一起转，中央留下",
        "cycles": [
          [
            0,
            1,
            3
          ],
          [
            2,
            5,
            4
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            400,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          2.0943951023931953
        ],
        "notation": "(1 2 4)(3 6 5)"
      },
      {
        "id": "thread",
        "title": "拨动星线",
        "caption": "右侧的一对与下方的一对同时交换",
        "cycles": [
          [
            1,
            2
          ],
          [
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 3)(6 7)"
      }
    ],
    "group": "GL(3,2)",
    "hints": [
      "拨线工具的两处作用会一起发生。星轮可以把另一组颜色送到那里。",
      "可以先借一个朝向，拨线，再归还朝向；接着处理剩下的一次小变化。"
    ],
    "discovery": "换了颜色的位置，星网上的约定仍然在。",
    "math": "七个位置对应 F₂³ 的非零向量，三点共线指其向量和为零，圆形也算一条线。坐标循环与剪切 (x,y,z)↦(x+y,y,z) 生成 GL(3,2)，阶 (8−1)(8−2)(8−4)=168，并保持七条线的关联结构。",
    "intent": "用七条可见的线展示受限制的丰富置换，仍由两个简单把手完成一个短小目标。",
    "number": 26,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "initial": [
      4,
      6,
      1,
      3,
      0,
      2,
      5
    ],
    "certificate": [
      {
        "op": "thread",
        "direction": 1
      },
      {
        "op": "sky",
        "direction": 1
      },
      {
        "op": "thread",
        "direction": 1
      },
      {
        "op": "sky",
        "direction": -1
      }
    ],
    "shortest": 4,
    "group_order": 168,
    "diameter": 12
  },
  {
    "id": "woven_bookmarks",
    "title": "交织书签",
    "chapter": "第三间 · 一点纸上的魔法",
    "scene": "weave",
    "tag": "先穿上排，还是先穿下排",
    "points": [
      [
        220,
        150
      ],
      [
        340,
        150
      ],
      [
        460,
        150
      ],
      [
        580,
        150
      ],
      [
        220,
        320
      ],
      [
        340,
        320
      ],
      [
        460,
        320
      ],
      [
        580,
        320
      ]
    ],
    "subtitle": "两排书签交错穿回书页。只换一个起头，重复后的效果就不同。",
    "ops": [
      {
        "id": "outside",
        "title": "上排先穿",
        "caption": "两排交错穿入，先取上排；首尾留下",
        "cycles": [
          [
            1,
            2,
            4
          ],
          [
            3,
            6,
            5
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(2 3 5)(4 7 6)"
      },
      {
        "id": "inside",
        "title": "下排先穿",
        "caption": "两排交错穿入，先取下排",
        "cycles": [
          [
            0,
            1,
            3,
            7,
            6,
            4
          ],
          [
            2,
            5
          ]
        ],
        "motion": "curve",
        "order": 6,
        "notation": "(1 2 4 8 7 5)(3 6)"
      }
    ],
    "initial": [
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "group": "C₂ × A₄",
    "hints": [
      "先盯住开头与结尾的两枚。两种穿法对它们的影响不同。",
      "试试同一种穿法连续三次：上排先穿会回到原样，下排先穿会让整个次序反过来。"
    ],
    "discovery": "起头只差一点，三次之后便是另一幅图案。",
    "math": "这两枚把手是八张牌的完美外洗与内洗，生成 C₂³⋊C₃，同构于 C₂×A₄，群阶 24。外洗阶为 3，内洗阶为 6；内洗的三次方是整个序列的反转。",
    "intent": "让两种近似的穿梭在重复后产生不同结果，给星网之后安排一段轻巧的书签小戏法。",
    "number": 27,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "inside",
        "direction": 1
      },
      {
        "op": "inside",
        "direction": 1
      },
      {
        "op": "inside",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 24,
    "diameter": 4
  },
  {
    "id": "wind_echo",
    "title": "风的回声",
    "chapter": "第三间 · 把多余的风送回去",
    "scene": "echo_wheels",
    "tag": "照一下镜子，再等风回来",
    "points": [
      [
        240.0,
        127.0
      ],
      [
        333.531,
        289.0
      ],
      [
        146.469,
        289.0
      ],
      [
        560.0,
        127.0
      ],
      [
        653.531,
        289.0
      ],
      [
        466.469,
        289.0
      ]
    ],
    "subtitle": "同步的风总会吹动两边。让镜子把右边多余的变化送回去。",
    "ops": [
      {
        "id": "together",
        "title": "同步的风",
        "caption": "两侧各三枚，同向转过一格",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          2.0943951023931953
        ],
        "notation": "(1 2 3)(4 5 6)"
      },
      {
        "id": "left_mirror",
        "title": "左侧镜面",
        "caption": "只翻转左侧图案的一对位置",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 2)"
      },
      {
        "id": "right_mirror",
        "title": "右侧镜面",
        "caption": "只翻转右侧图案的一对位置",
        "cycles": [
          [
            3,
            4
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(4 5)"
      }
    ],
    "initial": [
      2,
      0,
      1,
      3,
      4,
      5
    ],
    "group": "S₃ × S₃",
    "hints": [
      "右侧本来正确，可以暂时翻面。翻面前后的旋转会产生不同的组合效果。",
      "让同步的风和右侧镜面交替出现；右侧的变化会抵消，左侧仍然向前。"
    ],
    "discovery": "镜面夹在风中间，回声便替一侧归还了变化。",
    "math": "同步三循环与两个局部反射生成 S₃×S₃，阶 36。若同步操作为 ab、右镜为 s，则 bsb s=e，而左侧留下 a²；这使只改左边成为可能。",
    "intent": "用局部反射抵消一侧的同步旋转，体验与第 4 关的直接反向联动不同的消除方法。",
    "number": 28,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "together",
        "direction": 1
      },
      {
        "op": "left_mirror",
        "direction": 1
      },
      {
        "op": "together",
        "direction": -1
      },
      {
        "op": "left_mirror",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 36,
    "diameter": 4
  },
  {
    "id": "borrowed_stars",
    "title": "借星不留痕",
    "chapter": "第三间 · 星图里的约定",
    "scene": "borrowed_stars",
    "tag": "借两颗星，修好另外四颗",
    "points": [
      [
        400,
        74
      ],
      [
        300,
        178
      ],
      [
        500,
        178
      ],
      [
        300,
        260
      ],
      [
        500,
        260
      ],
      [
        500,
        350
      ],
      [
        300,
        350
      ]
    ],
    "subtitle": "顶端的星一直不动。中间两颗可以暂借，修好下方后再还回来。",
    "ops": [
      {
        "id": "borrow",
        "title": "借来两颗星",
        "caption": "中间一对与星匣下方一对同时交换",
        "cycles": [
          [
            1,
            2
          ],
          [
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 3)(6 7)"
      },
      {
        "id": "casket",
        "title": "翻转星匣",
        "caption": "下方四枚绕星匣中心转半圈",
        "cycles": [
          [
            3,
            5
          ],
          [
            4,
            6
          ]
        ],
        "motion": "orbit",
        "order": 2,
        "centers": [
          [
            400,
            305
          ],
          [
            400,
            305
          ]
        ],
        "angles": [
          3.141592653589793,
          3.141592653589793
        ],
        "turnFrame": true,
        "notation": "(4 6)(5 7)"
      }
    ],
    "initial": [
      0,
      1,
      2,
      4,
      3,
      6,
      5
    ],
    "group": "D₄",
    "hints": [
      "第一枚把手会同时碰到中间和下方，第二枚只碰下方。可以借它改变第一枚把手留下的影响。",
      "让两枚把手交替出场，再重复一次；中间两颗会回家，下方会留下两对换位。"
    ],
    "discovery": "借来的两颗星都回去了，星匣却已经修好了。",
    "math": "两种二阶剪切生成阶 8 的 D₄；在七个位置上有大小为 1、2、4 的三个轨道。四次交替操作给出交换子，保持中间二点不动，只交换下方两对。与第 21 关同构，但群作用不同。",
    "intent": "把一个固定点、一个临时借位区和一个待修区直接分开呈现，让局部控制的作用范围可见。",
    "number": 29,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "borrow",
        "direction": 1
      },
      {
        "op": "casket",
        "direction": 1
      },
      {
        "op": "borrow",
        "direction": 1
      },
      {
        "op": "casket",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 8,
    "diameter": 4
  },
  {
    "id": "three_petal_home",
    "title": "三叶归航",
    "chapter": "第三间 · 接起三条归途",
    "scene": "three_petals",
    "tag": "三片花瓣，共借一颗星",
    "points": [
      [
        400,
        235
      ],
      [
        317.728,
        92.5
      ],
      [
        482.272,
        92.5
      ],
      [
        564.545,
        235.0
      ],
      [
        482.272,
        377.5
      ],
      [
        317.728,
        377.5
      ],
      [
        235.455,
        235.0
      ]
    ],
    "subtitle": "三片花瓣借走了彼此的颜色。让三条归途在中央接起来。",
    "ops": [
      {
        "id": "top",
        "title": "上叶回旋",
        "caption": "中央与上方两枚依次轮换",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "right",
        "title": "右叶回旋",
        "caption": "中央与右下两枚依次轮换",
        "cycles": [
          [
            0,
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 4 5)"
      },
      {
        "id": "left",
        "title": "左叶回旋",
        "caption": "中央与左下两枚依次轮换",
        "cycles": [
          [
            0,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 6 7)"
      }
    ],
    "initial": [
      0,
      5,
      6,
      1,
      2,
      3,
      4
    ],
    "group": "A₇",
    "hints": [
      "中央虽然已经正确，也可以暂时借给花瓣。先决定一枚颜色要经过哪片叶子。",
      "把一小段交接当成工具，逐片送回颜色；最后再归还中央借出的那一枚。"
    ],
    "discovery": "三条归途终于合拢，中央那颗星也回家了。",
    "math": "三个共享一点的三循环生成 A₇，阶为 7!/2=2520。所有操作都是偶置换，本关目标是外侧两个三循环的乘积；中央位置最终保持不变。",
    "intent": "用三片共享同一插槽的花瓣，把交接、借位和复合局部变化接成第三间的收束题。",
    "number": 30,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "top",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "top",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "top",
        "direction": 1
      }
    ],
    "shortest": 7,
    "group_order": 2520,
    "diameter": 9
  },
  {
    "id": "long_short_steps",
    "title": "长短步之间",
    "chapter": "第四间 · 借一段路",
    "scene": "long_steps",
    "tag": "大步借来一点路",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "subtitle": "一枚把手走两格，一枚走三格。借一大步，再还一小步。",
    "ops": [
      {
        "id": "short",
        "title": "跨过两格",
        "caption": "八枚颜色一起顺转两格",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "long",
        "title": "跨过三格",
        "caption": "八枚颜色一起顺转三格",
        "cycles": [
          [
            0,
            3,
            6,
            1,
            4,
            7,
            2,
            5
          ]
        ],
        "motion": "orbit",
        "order": 8,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          2.356194490192345
        ],
        "notation": "(1 4 7 2 5 8 3 6)"
      }
    ],
    "initial": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      0
    ],
    "group": "C₈",
    "hints": [
      "目标只差一格，但这里没有一格的把手。反向也算一种选择。",
      "三格减去两格，恰好留下一格。"
    ],
    "discovery": "大步和小步之间，藏着你需要的那一步。",
    "math": "两把手是八循环 r 的 r² 与 r³，仍生成 C₈。r³r⁻²=r，使没有直接提供的一格移动可以由两次操作完成。",
    "intent": "用两种步长组合出缺少的一格，作为第四间的轻巧开场。",
    "number": 31,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "short",
        "direction": -1
      },
      {
        "op": "long",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 8,
    "diameter": 2
  },
  {
    "id": "two_clock_difference",
    "title": "双钟差拍",
    "chapter": "第四间 · 快慢之间",
    "scene": "ratio_dials",
    "tag": "快半圈，慢一格",
    "points": [
      [
        240.0,
        131.0
      ],
      [
        344.0,
        235.0
      ],
      [
        240.0,
        339.0
      ],
      [
        136.0,
        235.0
      ],
      [
        560.0,
        131.0
      ],
      [
        664.0,
        235.0
      ],
      [
        560.0,
        339.0
      ],
      [
        456.0,
        235.0
      ]
    ],
    "subtitle": "右边已经对了。让快慢两种节拍，替左边留下一格。",
    "ops": [
      {
        "id": "same",
        "title": "同拍拨动",
        "caption": "两只钟都顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)(5 6 7 8)"
      },
      {
        "id": "ratio",
        "title": "一拍两格",
        "caption": "左钟一格，右钟同时走两格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            6
          ],
          [
            5,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          3.141592653589793,
          3.141592653589793
        ],
        "notation": "(1 2 3 4)(5 7)(6 8)"
      }
    ],
    "initial": [
      1,
      2,
      3,
      0,
      4,
      5,
      6,
      7
    ],
    "group": "C₄ × C₄",
    "hints": [
      "两次同拍会让右钟走半圈。另一枚把手一次就能走完这半圈。",
      "让右钟的两种半圈相互抵消，左钟会留下需要的一格。"
    ],
    "discovery": "快慢刚好相消，留下的变化便属于左边。",
    "math": "设两只钟的四循环为 a、b，生成元是 ab 与 ab²，生成 C₄×C₄。组合 (ab)²(ab²)⁻¹=a 只转动左侧一格。",
    "intent": "给同时联动的两只钟加入不同齿比，让抵消由节拍差产生。",
    "number": 32,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "same",
        "direction": 1
      },
      {
        "op": "same",
        "direction": 1
      },
      {
        "op": "ratio",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 16,
    "diameter": 4
  },
  {
    "id": "double_tooth_ferry",
    "title": "双齿渡桥",
    "chapter": "第四间 · 两种接力",
    "scene": "row_yard",
    "tag": "两座桥，总会一起动",
    "points": [
      [
        250,
        160
      ],
      [
        400,
        160
      ],
      [
        550,
        160
      ],
      [
        250,
        310
      ],
      [
        400,
        310
      ],
      [
        550,
        310
      ]
    ],
    "bridgePairs": [
      [
        0,
        3
      ],
      [
        1,
        4
      ]
    ],
    "subtitle": "上下两轨各自轮转，渡桥却总会交换两对。把需要的颜色送到桥边。",
    "ops": [
      {
        "id": "upper",
        "title": "上轨轮转",
        "caption": "上排三枚依次走一站",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "lower",
        "title": "下轨轮转",
        "caption": "下排三枚依次走一站",
        "cycles": [
          [
            3,
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(4 5 6)"
      },
      {
        "id": "bridge",
        "title": "双齿换岸",
        "caption": "左边两列的颜色同时上下交换",
        "cycles": [
          [
            0,
            3
          ],
          [
            1,
            4
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 4)(2 5)"
      }
    ],
    "initial": [
      5,
      1,
      2,
      0,
      4,
      3
    ],
    "group": "A₆",
    "pair": "three_coves",
    "hints": [
      "换岸会带着另一对一起走。可以用两次换岸把那一对的影响收回来。",
      "先借一条轨道对齐渡口，再让两次双齿换岸之间夹进一次轮转。"
    ],
    "discovery": "桥多带走的那一对，也可以在途中送回来。",
    "math": "两个三循环与一个双换位生成 A₆，群阶为 360。本关只要求三个位置循环变化，其余位置要在最后恢复。",
    "intent": "局部轮转与强制成对换岸产生副作用，玩家需要安排交接并归还它。",
    "number": 33,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "upper",
        "direction": -1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "upper",
        "direction": -1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "upper",
        "direction": 1
      },
      {
        "op": "lower",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 360,
    "diameter": 9
  },
  {
    "id": "three_coves",
    "title": "三湾接力",
    "chapter": "第四间 · 两种接力",
    "scene": "cove_ring",
    "tag": "同一段归途，换三个海湾",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        530.77,
        159.5
      ],
      [
        530.77,
        310.5
      ],
      [
        400.0,
        386.0
      ],
      [
        269.23,
        310.5
      ],
      [
        269.23,
        159.5
      ]
    ],
    "subtitle": "还是那三枚颜色。这次，沿着三个相接的小海湾接力。",
    "ops": [
      {
        "id": "first",
        "title": "第一湾",
        "caption": "轮换上方和右侧的三枚",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "second",
        "title": "第二湾",
        "caption": "轮换右下方的三枚",
        "cycles": [
          [
            2,
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(3 4 5)"
      },
      {
        "id": "third",
        "title": "第三湾",
        "caption": "轮换左侧和上方的三枚",
        "cycles": [
          [
            4,
            5,
            0
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(5 6 1)"
      }
    ],
    "initial": [
      5,
      1,
      2,
      0,
      4,
      3
    ],
    "group": "A₆",
    "pair": "double_tooth_ferry",
    "hints": [
      "交接点分布在环上。先找出哪一湾可以把颜色送给下一湾。",
      "先借第二湾的一步，让第三湾处理，再把第二湾借走的那步还回来。"
    ],
    "discovery": "同一个目标，换一条接力路线就有了新办法。",
    "math": "三个相接的三循环仍生成相同的 A₆。初态与目标和第 33 关完全相同，这组生成元让最短距离从 6 步变为 3 步。",
    "intent": "从双轨改为分散交接点，让同一目标产生另一种空间直觉。",
    "number": 34,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "second",
        "direction": 1
      },
      {
        "op": "third",
        "direction": -1
      },
      {
        "op": "second",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 360,
    "diameter": 5
  },
  {
    "id": "six_direction_vane",
    "title": "六向风标",
    "chapter": "第四间 · 朝向的秘密",
    "scene": "octahedron",
    "tag": "留住两极，转过四方",
    "points": [
      [
        540,
        235
      ],
      [
        260,
        235
      ],
      [
        400,
        360
      ],
      [
        400,
        110
      ],
      [
        462,
        180
      ],
      [
        338,
        290
      ]
    ],
    "vertices": [
      [
        1,
        0,
        0
      ],
      [
        -1,
        0,
        0
      ],
      [
        0,
        1,
        0
      ],
      [
        0,
        -1,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        0,
        0,
        -1
      ]
    ],
    "projection": {
      "origin": [
        400,
        235
      ],
      "basis": [
        [
          140,
          0
        ],
        [
          0,
          125
        ],
        [
          62,
          -55
        ]
      ]
    },
    "edges": [
      [
        0,
        2
      ],
      [
        0,
        3
      ],
      [
        0,
        4
      ],
      [
        0,
        5
      ],
      [
        1,
        2
      ],
      [
        1,
        3
      ],
      [
        1,
        4
      ],
      [
        1,
        5
      ],
      [
        2,
        4
      ],
      [
        2,
        5
      ],
      [
        3,
        4
      ],
      [
        3,
        5
      ]
    ],
    "faces": [
      [
        0,
        2,
        4
      ],
      [
        0,
        3,
        4
      ],
      [
        1,
        2,
        5
      ]
    ],
    "subtitle": "颜色站在六个方向上。借一根斜轴，把想要的方向转到眼前。",
    "ops": [
      {
        "id": "polar",
        "title": "绕双极转",
        "caption": "两极留下，另外四向转过四分之一圈",
        "cycles": [
          [
            0,
            2,
            1,
            3
          ]
        ],
        "motion": "spatial",
        "order": 4,
        "axis": "z",
        "angle": 1.5707963267948966,
        "notation": "(1 3 2 4)"
      },
      {
        "id": "diagonal",
        "title": "斜向翻面",
        "caption": "六个方向绕斜轴转过三分之一圈",
        "cycles": [
          [
            0,
            2,
            4
          ],
          [
            1,
            3,
            5
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axisVector": [
          1,
          1,
          1
        ],
        "angle": 2.0943951023931953,
        "notation": "(1 3 5)(2 4 6)"
      }
    ],
    "initial": [
      0,
      1,
      3,
      2,
      5,
      4
    ],
    "group": "S₄",
    "hints": [
      "第一枚把手留下两极，第二枚会换一套朝向。看看目标希望留下哪一对。",
      "可以用斜向翻面把需要的方向送到转轴旁，再组合几次转动。"
    ],
    "discovery": "看风的方向变了，能用的把手也随之变得顺手。",
    "math": "正八面体的旋转群作用在六个顶点上，阶为 24，同构 S₄。与立方体八顶点上的作用不同，这次颜色标记六个方向。",
    "intent": "用六向骨架展现旋转群的另一种作用，给平面路线题之后换一个视角。",
    "number": 35,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "polar",
        "direction": 1
      },
      {
        "op": "diagonal",
        "direction": 1
      },
      {
        "op": "polar",
        "direction": -1
      },
      {
        "op": "diagonal",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 24,
    "diameter": 5
  },
  {
    "id": "mirror_window_return",
    "title": "镜窗折返",
    "chapter": "第四间 · 窗外多一面镜",
    "scene": "mirror_window",
    "points": [
      [
        270,
        105
      ],
      [
        400,
        105
      ],
      [
        530,
        105
      ],
      [
        530,
        235
      ],
      [
        530,
        365
      ],
      [
        400,
        365
      ],
      [
        270,
        365
      ],
      [
        270,
        235
      ]
    ],
    "gridVectors": [
      [
        -1,
        -1
      ],
      [
        0,
        -1
      ],
      [
        1,
        -1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ],
      [
        0,
        1
      ],
      [
        -1,
        1
      ],
      [
        -1,
        0
      ]
    ],
    "tag": "把倒影也借进来",
    "subtitle": "方窗多了镜面把手。这一次，反过来的次序也能送回去。",
    "ops": [
      {
        "id": "turn",
        "title": "转动窗框",
        "caption": "整扇窗顺转四分之一圈",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "wind",
        "title": "横向的风",
        "caption": "上排向左，下排向右，越过窗沿绕回",
        "cycles": [
          [
            0,
            2,
            1
          ],
          [
            4,
            6,
            5
          ]
        ],
        "motion": "shear",
        "order": 3,
        "axis": "x",
        "spacing": 130,
        "pivot": [
          400,
          235
        ],
        "notation": "(1 3 2)(5 7 6)"
      },
      {
        "id": "mirror",
        "title": "窗外镜面",
        "caption": "左右照镜，中央一列留下",
        "cycles": [
          [
            0,
            2
          ],
          [
            3,
            7
          ],
          [
            4,
            6
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 3)(4 8)(5 7)"
      }
    ],
    "group": "GL(2,3)",
    "hints": [
      "镜面会交换左右，风和转窗则负责把颜色送到合适的方向。",
      "可以先转窗，再反向吹一次横风，归还转窗之后照一次镜子。"
    ],
    "discovery": "多一面镜，方窗便能接住另一半倒影。",
    "math": "在 F₃² 的八个非零向量上，旋转与剪切生成 SL(2,3)，加入行列式为 −1 的反射后生成 GL(2,3)，阶为 48。",
    "intent": "新增反射明确改变可达图案，目标需要把镜像和借位组合起来。",
    "number": 36,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      4,
      1,
      7,
      6,
      0,
      5,
      3,
      2
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "wind",
        "direction": -1
      },
      {
        "op": "turn",
        "direction": -1
      },
      {
        "op": "mirror",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 48,
    "diameter": 4
  },
  {
    "id": "two_turning_pages",
    "title": "双页回转",
    "chapter": "第四间 · 轮到另一页",
    "scene": "pages",
    "tag": "先记住，两页各差几格",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "subtitle": "一页差一格，另一页差半圈。让两页轮流来到唯一的转轴旁。",
    "ops": [
      {
        "id": "left",
        "title": "左页转动",
        "caption": "只让左页四枚顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 2 3 4)"
      },
      {
        "id": "swap",
        "title": "交换两页",
        "caption": "两页整组换边，朝向保持不变",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "spread": 0.7,
        "turnFrame": true,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "initial": [
      3,
      0,
      1,
      2,
      6,
      7,
      4,
      5
    ],
    "group": "C₄ ≀ C₂",
    "hints": [
      "先看清两页各要转多少。处理完一页，再让另一页接上转轴。",
      "一页转一格，另一页转两格，最后交换回原来的书页位置。"
    ],
    "discovery": "同一根转轴，也能替两页做好不同的事情。",
    "math": "两页分别可作 C₄ 旋转，整页交换构成 C₂，生成 C₄ ≀ C₂，阶为 4²×2=32。",
    "intent": "保留整组的朝向记忆，让同一个工具按不同份量完成两项任务。",
    "number": 37,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "swap",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "swap",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 32,
    "diameter": 6
  },
  {
    "id": "eight_star_gallery",
    "title": "八星回廊",
    "chapter": "第四间 · 把转轴借出去",
    "scene": "field_halo",
    "tag": "中央，也可以暂时换一颗",
    "points": [
      [
        400,
        235
      ],
      [
        400.0,
        87.0
      ],
      [
        515.711,
        142.724
      ],
      [
        464.215,
        368.343
      ],
      [
        544.289,
        267.933
      ],
      [
        284.289,
        142.724
      ],
      [
        335.785,
        368.343
      ],
      [
        255.711,
        267.933
      ]
    ],
    "haloCenter": [
      400,
      235
    ],
    "haloRadius": 148,
    "subtitle": "星桥会一起交换四对。让中心先换一枚，再带着外围绕行。",
    "ops": [
      {
        "id": "ring",
        "title": "绕行七星",
        "caption": "中央留下，外侧七枚顺转一格",
        "cycles": [
          [
            1,
            2,
            4,
            3,
            6,
            7,
            5
          ]
        ],
        "motion": "orbit",
        "order": 7,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.8975979010256552
        ],
        "notation": "(2 3 5 4 7 8 6)"
      },
      {
        "id": "bridges",
        "title": "四座星桥",
        "caption": "中央与外侧三对颜色一起交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(3 4)(5 6)(7 8)"
      }
    ],
    "group": "AGL(1,8)",
    "hints": [
      "星轮留下中央的位置，星桥可以把另一枚颜色带到中央。",
      "两次星桥之间夹进一段转动，最后借走的中心就能归还。"
    ],
    "discovery": "暂借中央，转动就能围绕另一种颜色发生。",
    "math": "八个位置标记 F₈，采用多项式 t³+t+1。两把手为 x↦tx 与 x↦x+1，生成 AGL(1,8)=C₂³⋊C₇，阶为 56。",
    "intent": "七星轮配合四座联动星桥，借出旋转的固定位置。",
    "number": 38,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      6,
      1,
      3,
      4,
      7,
      0,
      2,
      5
    ],
    "certificate": [
      {
        "op": "bridges",
        "direction": 1
      },
      {
        "op": "ring",
        "direction": -1
      },
      {
        "op": "ring",
        "direction": -1
      },
      {
        "op": "bridges",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 56,
    "diameter": 6
  },
  {
    "id": "seven_day_post",
    "title": "七日星历",
    "chapter": "第四间 · 用路线织一面镜",
    "scene": "star_post",
    "tag": "星历里，藏着一次反向",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        518.057,
        140.853
      ],
      [
        547.214,
        268.601
      ],
      [
        465.516,
        371.046
      ],
      [
        334.484,
        371.046
      ],
      [
        252.786,
        268.601
      ],
      [
        281.943,
        140.853
      ]
    ],
    "subtitle": "一条路逐站前行，一条路沿星线分流。让分流多走几站，看看次序会怎样。",
    "ops": [
      {
        "id": "post",
        "title": "逐站前行",
        "caption": "七枚颜色沿外圈顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "orbit",
        "order": 7,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.8975979010256552
        ],
        "notation": "(1 2 3 4 5 6 7)"
      },
      {
        "id": "route",
        "title": "星线分流",
        "caption": "顶端留下，其余六枚沿星线轮换",
        "cycles": [
          [
            1,
            3,
            2,
            6,
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 6,
        "notation": "(2 4 3 7 5 6)"
      }
    ],
    "group": "AGL(1,7)",
    "hints": [
      "顶端是分流路线的固定点。先观察同一条星线走三次的效果。",
      "三次分流会把圆周次序反过来，再配合一格前行或退回。"
    ],
    "discovery": "绕过星线三次，次序已经悄悄反了过来。",
    "math": "按模 7 编号，两把手是 x↦x+1 与 x↦3x，生成 AGL(1,7)，阶为 7×6=42。因为 3³≡−1，三次分流合成反射。",
    "intent": "让重复的分流动作合成镜像，保留路线与效果之间的可发现联系。",
    "number": 39,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "initial": [
      1,
      0,
      6,
      5,
      4,
      3,
      2
    ],
    "certificate": [
      {
        "op": "post",
        "direction": -1
      },
      {
        "op": "route",
        "direction": 1
      },
      {
        "op": "route",
        "direction": 1
      },
      {
        "op": "route",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 42,
    "diameter": 4
  },
  {
    "id": "one_beside_seven",
    "title": "七星旁的一枚",
    "chapter": "第四间 · 把借来的色归还",
    "scene": "pocket_wheel",
    "tag": "侧袋接住的，最后也要送回",
    "points": [
      [
        190,
        235
      ],
      [
        338.369,
        293.574
      ],
      [
        338.369,
        176.426
      ],
      [
        429.96,
        103.385
      ],
      [
        544.171,
        129.453
      ],
      [
        595.0,
        235.0
      ],
      [
        544.171,
        340.547
      ],
      [
        429.96,
        366.615
      ]
    ],
    "haloCenter": [
      460,
      235
    ],
    "haloRadius": 135,
    "subtitle": "远处三枚颜色错了。侧袋和近处的颜色，都可以暂时借用。",
    "ops": [
      {
        "id": "wheel",
        "title": "转动七星",
        "caption": "外圈七枚顺转，侧袋留下",
        "cycles": [
          [
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 7,
        "centers": [
          [
            460,
            235
          ]
        ],
        "angles": [
          0.8975979010256552
        ],
        "notation": "(2 3 4 5 6 7 8)"
      },
      {
        "id": "pocket",
        "title": "侧袋轮换",
        "caption": "侧袋与靠近它的两枚轮换",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      }
    ],
    "initial": [
      0,
      1,
      2,
      5,
      3,
      4,
      6,
      7
    ],
    "group": "A₈",
    "hints": [
      "先把远处需要处理的颜色送到袋口。侧袋负责暂存，星轮负责接下一枚。",
      "连续做两次局部交接，可以归还侧袋里的颜色，留下外圈的一次三枚轮换。"
    ],
    "discovery": "远处的颜色归位了，侧袋也像从未被借用。",
    "math": "七循环与相交三循环生成 A₈，阶为 20160。本关目标仅循环外圈三点，侧袋和另外四枚最终不变，最短解为 8 步。",
    "intent": "以固定侧袋完成远处的三枚轮换，收束第四间的路线与寄存主题。",
    "number": 40,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "wheel",
        "direction": -1
      },
      {
        "op": "wheel",
        "direction": -1
      },
      {
        "op": "pocket",
        "direction": -1
      },
      {
        "op": "wheel",
        "direction": -1
      },
      {
        "op": "pocket",
        "direction": -1
      },
      {
        "op": "wheel",
        "direction": 1
      },
      {
        "op": "wheel",
        "direction": 1
      },
      {
        "op": "wheel",
        "direction": 1
      }
    ],
    "shortest": 8,
    "group_order": 20160,
    "diameter": 16
  },
  {
    "id": "reflected_compass",
    "title": "倒影罗盘",
    "chapter": "第五间 · 多一条回家的路",
    "scene": "mirror_compass",
    "tag": "这一次，只交换一对方向",
    "points": [
      [
        540,
        235
      ],
      [
        260,
        235
      ],
      [
        400,
        360
      ],
      [
        400,
        110
      ],
      [
        462,
        180
      ],
      [
        338,
        290
      ]
    ],
    "vertices": [
      [
        1,
        0,
        0
      ],
      [
        -1,
        0,
        0
      ],
      [
        0,
        1,
        0
      ],
      [
        0,
        -1,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        0,
        0,
        -1
      ]
    ],
    "projection": {
      "origin": [
        400,
        235
      ],
      "basis": [
        [
          140,
          0
        ],
        [
          0,
          125
        ],
        [
          62,
          -55
        ]
      ]
    },
    "edges": [
      [
        0,
        2
      ],
      [
        0,
        3
      ],
      [
        0,
        4
      ],
      [
        0,
        5
      ],
      [
        1,
        2
      ],
      [
        1,
        3
      ],
      [
        1,
        4
      ],
      [
        1,
        5
      ],
      [
        2,
        4
      ],
      [
        2,
        5
      ],
      [
        3,
        4
      ],
      [
        3,
        5
      ]
    ],
    "faces": [
      [
        0,
        2,
        4
      ],
      [
        0,
        3,
        4
      ],
      [
        1,
        2,
        5
      ]
    ],
    "subtitle": "镜面把手来了。让它接住需要交换的两极，再把方向送回去。",
    "ops": [
      {
        "id": "polar",
        "title": "绕双极转",
        "caption": "两极留下，另外四向转过四分之一圈",
        "cycles": [
          [
            0,
            2,
            1,
            3
          ]
        ],
        "motion": "spatial",
        "order": 4,
        "axis": "z",
        "angle": 1.5707963267948966,
        "notation": "(1 3 2 4)"
      },
      {
        "id": "diagonal",
        "title": "斜向翻面",
        "caption": "六个方向绕斜轴转过三分之一圈",
        "cycles": [
          [
            0,
            2,
            4
          ],
          [
            1,
            3,
            5
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axisVector": [
          1,
          1,
          1
        ],
        "angle": 2.0943951023931953,
        "notation": "(1 3 5)(2 4 6)"
      },
      {
        "id": "mirror",
        "title": "两极照镜",
        "caption": "只交换斜向的一对两极",
        "cycles": [
          [
            4,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(5 6)"
      }
    ],
    "initial": [
      1,
      0,
      2,
      3,
      4,
      5
    ],
    "group": "C₂ ≀ S₃",
    "hints": [
      "镜面只够得着眼前的两极。可以先把另一对方向送过来。",
      "斜向翻面、照镜，再归还朝向，就能只交换目标两极。"
    ],
    "discovery": "朝向借好了，一面小镜便能只改那两个位置。",
    "math": "加入单轴反射后得到六向上的完整带符号置换群 C₂ ≀ S₃，阶 48，同构 C₂×S₄。它与第 19 关的房间换位群相同，呈现方式不同。",
    "intent": "用新增镜面实现只有两个位置变化的目标，对照仅能作刚体旋转的风标。",
    "number": 41,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "diagonal",
        "direction": -1
      },
      {
        "op": "mirror",
        "direction": 1
      },
      {
        "op": "diagonal",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 48,
    "diameter": 5
  },
  {
    "id": "glass_prism",
    "title": "玻璃三棱镜",
    "chapter": "第五间 · 三种方向各自归位",
    "scene": "prism",
    "tag": "朝向、倒影，还有哪一面",
    "points": [
      [
        314.5,
        175.5
      ],
      [
        409.763,
        325.5
      ],
      [
        219.237,
        325.5
      ],
      [
        485.5,
        94.5
      ],
      [
        580.763,
        244.5
      ],
      [
        390.237,
        244.5
      ]
    ],
    "vertices": [
      [
        6.123233995736766e-17,
        -1.0,
        -0.9
      ],
      [
        0.8660254037844387,
        0.49999999999999983,
        -0.9
      ],
      [
        -0.8660254037844385,
        0.5000000000000003,
        -0.9
      ],
      [
        6.123233995736766e-17,
        -1.0,
        0.9
      ],
      [
        0.8660254037844387,
        0.49999999999999983,
        0.9
      ],
      [
        -0.8660254037844385,
        0.5000000000000003,
        0.9
      ]
    ],
    "projection": {
      "origin": [
        400,
        235
      ],
      "basis": [
        [
          110,
          0
        ],
        [
          0,
          100
        ],
        [
          95,
          -45
        ]
      ]
    },
    "edges": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        0
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        3
      ],
      [
        0,
        3
      ],
      [
        1,
        4
      ],
      [
        2,
        5
      ]
    ],
    "faces": [
      [
        0,
        1,
        2
      ],
      [
        3,
        4,
        5
      ],
      [
        0,
        1,
        4,
        3
      ]
    ],
    "subtitle": "转一面，照一面，再把前后两面换回来。让玻璃里的颜色对齐。",
    "ops": [
      {
        "id": "rotate",
        "title": "沿棱转动",
        "caption": "两组三角面同转三分之一圈",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axis": "z",
        "angle": 2.0943951023931953,
        "notation": "(1 2 3)(4 5 6)"
      },
      {
        "id": "mirror",
        "title": "左右照镜",
        "caption": "每一面各交换一对，顶角留下",
        "cycles": [
          [
            1,
            2
          ],
          [
            4,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 3)(5 6)"
      },
      {
        "id": "faces",
        "title": "前后换面",
        "caption": "两组三角面交换，各自方向保留",
        "cycles": [
          [
            0,
            3
          ],
          [
            1,
            4
          ],
          [
            2,
            5
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            314.5,
            275.5
          ],
          [
            485.5,
            194.5
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "notation": "(1 4)(2 5)(3 6)"
      }
    ],
    "group": "D₆",
    "hints": [
      "可以分别观察三件事：颜色在哪一面、三角面的朝向、左右的次序。",
      "前后换面不会改变每面内部的次序。先分清每一项需要哪枚把手。"
    ],
    "discovery": "把三个方向分开看，玻璃里的错位就清楚了。",
    "math": "三角面的 D₃ 对称与独立换面的 C₂ 生成 D₃×C₂，同构 D₆，阶为 12。前后换面与两种面内操作可交换。",
    "intent": "通过三棱镜的投影，把朝向、镜像和前后位置分开呈现。",
    "number": 42,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "initial": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "certificate": [
      {
        "op": "rotate",
        "direction": 1
      },
      {
        "op": "mirror",
        "direction": 1
      },
      {
        "op": "faces",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 12,
    "diameter": 3
  },
  {
    "id": "two_sided_windhouse",
    "title": "双面风楼",
    "chapter": "第五间 · 两面共用一阵风",
    "scene": "mirror_dials",
    "tag": "两面同转，也能各项分清",
    "points": [
      [
        240.0,
        155.0
      ],
      [
        320.0,
        235.0
      ],
      [
        240.0,
        315.0
      ],
      [
        160.0,
        235.0
      ],
      [
        560.0,
        155.0
      ],
      [
        640.0,
        235.0
      ],
      [
        560.0,
        315.0
      ],
      [
        480.0,
        235.0
      ]
    ],
    "dialRadius": 80,
    "subtitle": "两面风楼一起转，也一起照镜。找回朝向，再认清彼此的位置。",
    "ops": [
      {
        "id": "turn",
        "title": "两面同转",
        "caption": "两面的四枚颜色都顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)(5 6 7 8)"
      },
      {
        "id": "mirror",
        "title": "两面照镜",
        "caption": "两面各交换左右两枚",
        "cycles": [
          [
            1,
            3
          ],
          [
            5,
            7
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 4)(6 8)"
      },
      {
        "id": "swap",
        "title": "交换两面",
        "caption": "两面整组换边，方向保留",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "spread": 0.73,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "group": "D₄ × C₂",
    "hints": [
      "每面的内部变化总是同步的。整组换边可以单独考虑。",
      "先辨认是否需要换面，再处理两面共同的转动与镜像。"
    ],
    "discovery": "共用的变化一起处理，换面的一步留给自己。",
    "math": "同步的方形对称生成 D₄，换面是与之可交换的独立 C₂，整体为 D₄×C₂，阶 16。",
    "intent": "在一组同步方向之外再加入独立换面，强调任务的分解。",
    "number": 43,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      6,
      5,
      4,
      7,
      2,
      1,
      0,
      3
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "mirror",
        "direction": 1
      },
      {
        "op": "swap",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 16,
    "diameter": 4
  },
  {
    "id": "square_wheel_crossing",
    "title": "方轮渡口",
    "chapter": "第五间 · 只有两枚想换位",
    "scene": "row_yard",
    "tag": "借一圈方轮，换远处一对",
    "points": [
      [
        250,
        160
      ],
      [
        400,
        160
      ],
      [
        550,
        160
      ],
      [
        250,
        310
      ],
      [
        400,
        310
      ],
      [
        550,
        310
      ]
    ],
    "localSquare": [
      0,
      1,
      4,
      3
    ],
    "subtitle": "只想交换右侧两枚。先用方轮接住它们，再归还其他颜色。",
    "ops": [
      {
        "id": "upper",
        "title": "上轨轮转",
        "caption": "上排三枚依次走一站",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "lower",
        "title": "下轨轮转",
        "caption": "下排三枚依次走一站",
        "cycles": [
          [
            3,
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(4 5 6)"
      },
      {
        "id": "square",
        "title": "方轮回转",
        "caption": "左侧四枚顺转四分之一圈",
        "cycles": [
          [
            0,
            1,
            4,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            325,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 2 5 4)"
      }
    ],
    "initial": [
      0,
      1,
      5,
      3,
      4,
      2
    ],
    "group": "S₆",
    "pair": "ferry_alignment",
    "hints": [
      "方轮每次带动四枚，轨道轮转可以改变它接到的是哪几枚。",
      "把右侧的颜色先送进方轮，再用上下轨道收回多余的变化。"
    ],
    "discovery": "一次大回转，也能拼出一次小换位。",
    "math": "两个三循环与一个四循环生成 S₆，阶 720。四循环提供奇置换，因此可以组合出只交换右侧两点的动作，最短 6 步。",
    "intent": "用四点工具合成远处的单换位，为下一关改变工具作铺垫。",
    "number": 44,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "upper",
        "direction": 1
      },
      {
        "op": "square",
        "direction": -1
      },
      {
        "op": "lower",
        "direction": -1
      },
      {
        "op": "square",
        "direction": -1
      },
      {
        "op": "upper",
        "direction": 1
      },
      {
        "op": "square",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 720,
    "diameter": 7
  },
  {
    "id": "ferry_alignment",
    "title": "两岸对齐",
    "chapter": "第五间 · 只有两枚想换位",
    "scene": "row_yard",
    "tag": "把两岸先送到同一座桥边",
    "points": [
      [
        250,
        160
      ],
      [
        400,
        160
      ],
      [
        550,
        160
      ],
      [
        250,
        310
      ],
      [
        400,
        310
      ],
      [
        550,
        310
      ]
    ],
    "bridgePairs": [
      [
        0,
        3
      ]
    ],
    "subtitle": "还是右侧那两枚。这次多了一座只交换一对的小渡桥。",
    "ops": [
      {
        "id": "upper",
        "title": "上轨轮转",
        "caption": "上排三枚依次走一站",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "lower",
        "title": "下轨轮转",
        "caption": "下排三枚依次走一站",
        "cycles": [
          [
            3,
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(4 5 6)"
      },
      {
        "id": "bridge",
        "title": "单座渡桥",
        "caption": "只交换最左侧的两枚颜色",
        "cycles": [
          [
            0,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 4)"
      }
    ],
    "initial": [
      0,
      1,
      5,
      3,
      4,
      2
    ],
    "group": "S₆",
    "pair": "square_wheel_crossing",
    "hints": [
      "先让上下两条轨道各自把目标颜色送到渡桥旁。",
      "对齐、交换，再分别归还两条轨道的借位。"
    ],
    "discovery": "工具恰好接住两岸，归还也变得整齐。",
    "math": "两侧三循环与一个跨侧换位仍生成 S₆。初态与目标和第 44 关相同，最短距离从 6 步变为 5 步。",
    "intent": "将复杂合成换成明确的对齐与交换，提供同群同目标的另一种解题直觉。",
    "number": 45,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "upper",
        "direction": 1
      },
      {
        "op": "lower",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "upper",
        "direction": -1
      },
      {
        "op": "lower",
        "direction": -1
      }
    ],
    "shortest": 5,
    "group_order": 720,
    "diameter": 10
  },
  {
    "id": "moon_turns_flower",
    "title": "月轮照花",
    "chapter": "第五间 · 一半月光，一次倒影",
    "scene": "moon_flower",
    "tag": "月轮前进，花也照一次镜",
    "points": [
      [
        240.0,
        135.0
      ],
      [
        326.603,
        285.0
      ],
      [
        153.397,
        285.0
      ],
      [
        560.0,
        135.0
      ],
      [
        660.0,
        235.0
      ],
      [
        560.0,
        335.0
      ],
      [
        460.0,
        235.0
      ]
    ],
    "subtitle": "拨月轮会顺手翻一下花。等月轮走过半圈，再看看花留下了什么。",
    "ops": [
      {
        "id": "flower",
        "title": "花轮转动",
        "caption": "左侧三枚顺转一格",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          2.0943951023931953
        ],
        "notation": "(1 2 3)"
      },
      {
        "id": "moon",
        "title": "月轮照花",
        "caption": "右侧四枚顺转一格，左侧一对同时交换",
        "cycles": [
          [
            1,
            2
          ],
          [
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240.0,
            285.0
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          3.141592653589793,
          1.5707963267948966
        ],
        "notation": "(2 3)(4 5 6 7)"
      }
    ],
    "initial": [
      2,
      0,
      1,
      5,
      6,
      3,
      4
    ],
    "group": "C₃ ⋊ C₄",
    "hints": [
      "月轮拨一次，花照一次镜；拨两次，花的两次镜像就抵消了。",
      "可以先修花，再把月轮走满半圈；也可以先等两次倒影相消。"
    ],
    "discovery": "两次月光经过，花的倒影便自己归还了。",
    "math": "花轮 a 的阶为 3，月轮联动 b 的阶为 4，满足 bab⁻¹=a⁻¹，生成非平凡半直积 C₃⋊C₄，阶 12。b² 只留下右轮半转。",
    "intent": "把周期与镜像联动放在一起，安排一段短小的月光休息题。",
    "number": 46,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "flower",
        "direction": -1
      },
      {
        "op": "moon",
        "direction": 1
      },
      {
        "op": "moon",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 12,
    "diameter": 3
  },
  {
    "id": "folded_star_grid",
    "title": "折叠星格",
    "chapter": "第五间 · 只借另一半天空",
    "scene": "cube_shear",
    "tag": "四颗跟着走，四颗先留下",
    "points": [
      [
        240,
        181
      ],
      [
        464,
        181
      ],
      [
        240,
        353
      ],
      [
        464,
        353
      ],
      [
        336,
        117
      ],
      [
        560,
        117
      ],
      [
        336,
        289
      ],
      [
        560,
        289
      ]
    ],
    "vertices": [
      [
        -1,
        -1,
        -1
      ],
      [
        1,
        -1,
        -1
      ],
      [
        -1,
        1,
        -1
      ],
      [
        1,
        1,
        -1
      ],
      [
        -1,
        -1,
        1
      ],
      [
        1,
        -1,
        1
      ],
      [
        -1,
        1,
        1
      ],
      [
        1,
        1,
        1
      ]
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        4
      ],
      [
        1,
        3
      ],
      [
        1,
        5
      ],
      [
        2,
        3
      ],
      [
        2,
        6
      ],
      [
        3,
        7
      ],
      [
        4,
        5
      ],
      [
        4,
        6
      ],
      [
        5,
        7
      ],
      [
        6,
        7
      ]
    ],
    "faces": [
      [
        0,
        1,
        3,
        2
      ],
      [
        4,
        5,
        7,
        6
      ],
      [
        0,
        1,
        5,
        4
      ]
    ],
    "gateFace": [
      2,
      3,
      7,
      6
    ],
    "subtitle": "工具只能拨下半边，错位却在上半边。借一个方向，再抵消多余的变化。",
    "ops": [
      {
        "id": "sky",
        "title": "转动星格",
        "caption": "绕斜轴转过三分之一圈，两角留下",
        "cycles": [
          [
            1,
            2,
            4
          ],
          [
            3,
            6,
            5
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axisVector": [
          1,
          1,
          1
        ],
        "angle": 2.0943951023931953,
        "notation": "(2 3 5)(4 7 6)"
      },
      {
        "id": "gate",
        "title": "下半边穿门",
        "caption": "只交换下半边的两对颜色",
        "cycles": [
          [
            2,
            3
          ],
          [
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(3 4)(7 8)"
      },
      {
        "id": "depth",
        "title": "前后穿门",
        "caption": "四对前后位置一起交换",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "initial": [
      1,
      0,
      2,
      3,
      5,
      4,
      6,
      7
    ],
    "group": "AGL(3,2)",
    "hints": [
      "整体穿门可以借转向搬到另一个方向。它会同时碰到上下两半。",
      "先合成一次全体左右换位，再用下半边的工具抵消下面的变化。"
    ],
    "discovery": "全体的一步，减去半边的一步，恰好属于另一半。",
    "math": "三位二进制坐标上的循环、剪切和一次平移生成 AGL(3,2)，阶 8×168=1344。上半边的剪切可写为一次整体平移与下半边剪切的组合。",
    "intent": "将整体变化与局部变化相消，制造没有直接提供的另一半工具。",
    "number": 47,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "sky",
        "direction": -1
      },
      {
        "op": "depth",
        "direction": 1
      },
      {
        "op": "sky",
        "direction": 1
      },
      {
        "op": "gate",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 1344,
    "diameter": 14
  },
  {
    "id": "far_shore_guests",
    "title": "两岸远客",
    "chapter": "第五间 · 同一趟远行",
    "scene": "islands",
    "tag": "两岸各自借位，渡口只换一对",
    "points": [
      [
        240,
        339
      ],
      [
        136,
        235
      ],
      [
        240,
        131
      ],
      [
        344,
        235
      ],
      [
        456,
        235
      ],
      [
        560,
        131
      ],
      [
        664,
        235
      ],
      [
        560,
        339
      ]
    ],
    "subtitle": "两枚远客站在最外侧。让两岸分别转到渡口，交换之后再送回去。",
    "ops": [
      {
        "id": "left",
        "title": "左岸转轮",
        "caption": "只让左岸四枚顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)"
      },
      {
        "id": "right",
        "title": "右岸转轮",
        "caption": "只让右岸四枚顺转一格",
        "cycles": [
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(5 6 7 8)"
      },
      {
        "id": "bridge",
        "title": "渡口换位",
        "caption": "只交换靠近渡口的两枚颜色",
        "cycles": [
          [
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(4 5)"
      }
    ],
    "initial": [
      0,
      6,
      2,
      3,
      4,
      5,
      1,
      7
    ],
    "group": "S₈",
    "pair": "shared_shore_wind",
    "hints": [
      "每一岸都可以先把远处的颜色送到渡口。暂时正确的颜色会在归还时回来。",
      "两岸各转半圈，渡口交换一次，再各自转回半圈。"
    ],
    "discovery": "最远的两位客人，也能借同一个渡口回家。",
    "math": "两岸四循环与一个跨岸换位生成 S₈。本关交换各岸离渡口最远的两点，四段半圈借位加一次渡桥，最短 9 步。",
    "intent": "把两次独立对齐完整展开，准备下一关同步工具的回报。",
    "number": 48,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      }
    ],
    "shortest": 9,
    "group_order": 40320,
    "diameter": 16
  },
  {
    "id": "shared_shore_wind",
    "title": "两岸同风",
    "chapter": "第五间 · 同一趟远行",
    "scene": "linked_islands",
    "tag": "一阵风，同时做好两段借位",
    "points": [
      [
        240,
        339
      ],
      [
        136,
        235
      ],
      [
        240,
        131
      ],
      [
        344,
        235
      ],
      [
        456,
        235
      ],
      [
        560,
        131
      ],
      [
        664,
        235
      ],
      [
        560,
        339
      ]
    ],
    "subtitle": "还是同一趟远行。新的把手会让两岸一起转动。",
    "ops": [
      {
        "id": "both",
        "title": "两岸同转",
        "caption": "左右四枚都顺转一格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)(5 6 7 8)"
      },
      {
        "id": "bridge",
        "title": "渡口换位",
        "caption": "只交换靠近渡口的两枚颜色",
        "cycles": [
          [
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(4 5)"
      }
    ],
    "initial": [
      0,
      6,
      2,
      3,
      4,
      5,
      1,
      7
    ],
    "group": "C₂ ≀ C₄",
    "pair": "far_shore_guests",
    "pairNote": "与上一关初态和目标相同。这次的群更小，同步把手却恰好更适合这一趟远行。",
    "hints": [
      "两岸的目标距离相同，可以让同一阵风同时带它们去渡口。",
      "同步转半圈，交换，再同步转回半圈。"
    ],
    "discovery": "两段借位合成一阵风，同样的归途就短了一些。",
    "math": "同步四循环与渡桥生成 C₂ ≀ C₄，阶为 64；它是上一关 S₈ 的真子群。初态和目标相同，但合适的同步生成元让最短距离从 9 步降为 5 步。",
    "intent": "展示较少的自由也可能更适合具体目标，用同步操作兑现前一关的长行程。",
    "number": 49,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "both",
        "direction": 1
      },
      {
        "op": "both",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "both",
        "direction": 1
      },
      {
        "op": "both",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 64,
    "diameter": 8
  },
  {
    "id": "four_leaf_archive",
    "title": "四叶归藏",
    "chapter": "第五间 · 把所有归途收好",
    "scene": "petal_ring",
    "tag": "四片叶子，接成一圈归途",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "subtitle": "四个交接点围成一圈。让每一片叶子接住下一片的颜色。",
    "ops": [
      {
        "id": "northeast",
        "title": "右上叶",
        "caption": "右上三枚依次轮换",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "southeast",
        "title": "右下叶",
        "caption": "右下三枚依次轮换",
        "cycles": [
          [
            2,
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(3 4 5)"
      },
      {
        "id": "southwest",
        "title": "左下叶",
        "caption": "左下三枚依次轮换",
        "cycles": [
          [
            4,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(5 6 7)"
      },
      {
        "id": "northwest",
        "title": "左上叶",
        "caption": "左上三枚依次轮换",
        "cycles": [
          [
            6,
            7,
            0
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(7 8 1)"
      }
    ],
    "initial": [
      6,
      7,
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "group": "A₈",
    "hints": [
      "这次没有唯一的中央位置，交接点分布在四个方向。先决定一枚颜色如何跨到下一片叶子。",
      "把相邻两片叶子的交接看成一段小工具，再把几段归途接起来。"
    ],
    "discovery": "四片叶子合拢，每一种颜色都找到了归藏之处。",
    "math": "四个沿环相接的三循环生成 A₈，阶为 20160。本关目标是两个四循环的乘积，最短解需要 6 步，并使用全部四枚把手。",
    "intent": "用四个分散交接点收束五间工坊，鼓励把已有的局部工具连成整体路线。",
    "number": 50,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "northeast",
        "direction": -1
      },
      {
        "op": "southeast",
        "direction": -1
      },
      {
        "op": "northwest",
        "direction": -1
      },
      {
        "op": "northeast",
        "direction": -1
      },
      {
        "op": "southwest",
        "direction": -1
      },
      {
        "op": "southeast",
        "direction": -1
      }
    ],
    "shortest": 6,
    "group_order": 20160,
    "diameter": 9
  },
  {
    "id": "five_beat_echo",
    "title": "五拍与回声",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        163.0
      ],
      [
        240.0,
        307.0
      ],
      [
        560.0,
        123.0
      ],
      [
        666.518,
        200.39
      ],
      [
        625.832,
        325.61
      ],
      [
        494.168,
        325.61
      ],
      [
        453.482,
        200.39
      ]
    ],
    "ops": [
      {
        "id": "two",
        "title": "拨过两拍",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            2,
            4,
            6,
            3,
            5
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            560,
            235
          ]
        ],
        "angles": [
          2.5132741228718345
        ],
        "notation": "(3 5 7 4 6)"
      },
      {
        "id": "three",
        "title": "拨过三拍",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            5,
            3,
            6,
            4
          ]
        ],
        "motion": "orbit",
        "order": 10,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          9.42477796076938,
          3.7699111843077517
        ],
        "notation": "(1 2)(3 6 4 7 5)"
      }
    ],
    "group": "C₁₀",
    "subtitle": "两拍的小铃与五拍的花，想要一起向前走一拍。",
    "tag": "不同的周期，也能借同一拍。",
    "hints": [
      "每枚把手都把两边带走相同的拍数，绕满一圈就会回来。",
      "先借三拍，再退回两拍，便各自留下一拍。"
    ],
    "discovery": "不同的周期，也能借同一拍。",
    "math": "设 g=(1 2)(3 4 5 6 7)，阶为 10。把手是 g²、g³，生成 C₁₀，g³g⁻²=g。",
    "intent": "两拍的小铃与五拍的花，想要一起向前走一拍。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 72,
        "count": 2
      },
      {
        "center": [
          560,
          235
        ],
        "radius": 112,
        "count": 5
      }
    ],
    "initial": [
      1,
      0,
      3,
      4,
      5,
      6,
      2
    ],
    "number": 51,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "two",
        "direction": -1
      },
      {
        "op": "three",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 10,
    "diameter": 2
  },
  {
    "id": "twelve_hour_duet",
    "title": "十二时二重奏",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        131.0
      ],
      [
        330.067,
        287.0
      ],
      [
        149.933,
        287.0
      ],
      [
        560.0,
        131.0
      ],
      [
        664.0,
        235.0
      ],
      [
        560.0,
        339.0
      ],
      [
        456.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "same",
        "title": "一起顺行",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "orbit",
        "order": 12,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          1.5707963267948966
        ],
        "notation": "(1 2 3)(4 5 6 7)"
      },
      {
        "id": "opposite",
        "title": "花逆钟顺",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            2,
            1
          ],
          [
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "orbit",
        "order": 12,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          -2.0943951023931953,
          1.5707963267948966
        ],
        "notation": "(1 3 2)(4 5 6 7)"
      }
    ],
    "group": "C₁₂",
    "subtitle": "花已经开对了，时钟却差半圈。让两阵风替它独自走完。",
    "tag": "两阵风合拍，花便停在原处。",
    "hints": [
      "两种把手对花的影响相反，对钟的影响相同。",
      "各用一次，花的来回相消，钟留下半圈。"
    ],
    "discovery": "两阵风合拍，花便停在原处。",
    "math": "互不相交的三循环 a 与四循环 b 生成 C₃×C₄≅C₁₂。两把手 ab、a⁻¹b 的乘积为 b²。",
    "intent": "花已经开对了，时钟却差半圈。让两阵风替它独自走完。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 104,
        "count": 3
      },
      {
        "center": [
          560,
          235
        ],
        "radius": 104,
        "count": 4
      }
    ],
    "initial": [
      0,
      1,
      2,
      5,
      6,
      3,
      4
    ],
    "number": 52,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "same",
        "direction": 1
      },
      {
        "op": "opposite",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 12,
    "diameter": 3
  },
  {
    "id": "bell_borrows_quarter",
    "title": "铃借一刻",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        163.0
      ],
      [
        240.0,
        307.0
      ],
      [
        560.0,
        129.0
      ],
      [
        666.0,
        235.0
      ],
      [
        560.0,
        341.0
      ],
      [
        454.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "both",
        "title": "铃钟同走",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3,
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          3.141592653589793,
          1.5707963267948966
        ],
        "notation": "(1 2)(3 4 5 6)"
      },
      {
        "id": "bell",
        "title": "只拨小铃",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "orbit",
        "order": 2,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          3.141592653589793
        ],
        "notation": "(1 2)"
      }
    ],
    "group": "C₂ × C₄",
    "subtitle": "时钟只差一格。小铃会跟着动，但也有自己的归途。",
    "tag": "借走的一声铃，可以单独归还。",
    "hints": [
      "先让时钟走到想要的位置。",
      "再把顺带交换的小铃还回来。"
    ],
    "discovery": "借走的一声铃，可以单独归还。",
    "math": "把手 ab 与 a 生成 C₂×C₄。用 a 抵消联动中的二循环，只留下四循环 b。",
    "intent": "时钟只差一格。小铃会跟着动，但也有自己的归途。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 72,
        "count": 2
      },
      {
        "center": [
          560,
          235
        ],
        "radius": 106,
        "count": 4
      }
    ],
    "initial": [
      0,
      1,
      5,
      2,
      3,
      4
    ],
    "number": 53,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "both",
        "direction": -1
      },
      {
        "op": "bell",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 8,
    "diameter": 3
  },
  {
    "id": "three_linked_bells",
    "title": "三盏联动铃",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        200.0,
        169.0
      ],
      [
        200.0,
        301.0
      ],
      [
        400.0,
        169.0
      ],
      [
        400.0,
        301.0
      ],
      [
        600.0,
        169.0
      ],
      [
        600.0,
        301.0
      ]
    ],
    "ops": [
      {
        "id": "west",
        "title": "前两盏一起",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 2,
        "centers": [
          [
            200,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          3.141592653589793,
          3.141592653589793
        ],
        "notation": "(1 2)(3 4)"
      },
      {
        "id": "east",
        "title": "后两盏一起",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 2,
        "centers": [
          [
            400,
            235
          ],
          [
            600,
            235
          ]
        ],
        "angles": [
          3.141592653589793,
          3.141592653589793
        ],
        "notation": "(3 4)(5 6)"
      },
      {
        "id": "all",
        "title": "三盏齐响",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 2,
        "centers": [
          [
            200,
            235
          ],
          [
            400,
            235
          ],
          [
            600,
            235
          ]
        ],
        "angles": [
          3.141592653589793,
          3.141592653589793,
          3.141592653589793
        ],
        "notation": "(1 2)(3 4)(5 6)"
      }
    ],
    "group": "C₂ × C₂ × C₂",
    "subtitle": "只有最左边错了。把总会一起响的铃，拼成一声独奏。",
    "tag": "合声减去合声，留下最左的一盏。",
    "hints": [
      "一次拨动可以暂时带走正确的两盏。",
      "三盏齐响之后，再让后两盏一起回来。"
    ],
    "discovery": "合声减去合声，留下最左的一盏。",
    "math": "三个位置轨道各有两点。生成元 ab、bc、abc 生成 C₂³，(abc)(bc)=a；与八点立体翻转采用不同的作用。",
    "intent": "只有最左边错了。把总会一起响的铃，拼成一声独奏。",
    "dials": [
      {
        "center": [
          200,
          235
        ],
        "radius": 66,
        "count": 2
      },
      {
        "center": [
          400,
          235
        ],
        "radius": 66,
        "count": 2
      },
      {
        "center": [
          600,
          235
        ],
        "radius": 66,
        "count": 2
      }
    ],
    "initial": [
      1,
      0,
      2,
      3,
      4,
      5
    ],
    "number": 54,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "east",
        "direction": 1
      },
      {
        "op": "all",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 8,
    "diameter": 3
  },
  {
    "id": "two_fast_windows",
    "title": "两扇快慢窗",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        137.0
      ],
      [
        338.0,
        235.0
      ],
      [
        240.0,
        333.0
      ],
      [
        142.0,
        235.0
      ],
      [
        560.0,
        137.0
      ],
      [
        658.0,
        235.0
      ],
      [
        560.0,
        333.0
      ],
      [
        462.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "left_fast",
        "title": "左快右慢",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            2
          ],
          [
            1,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          3.141592653589793,
          3.141592653589793,
          1.5707963267948966
        ],
        "notation": "(1 3)(2 4)(5 6 7 8)"
      },
      {
        "id": "right_fast",
        "title": "左慢右快",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            6
          ],
          [
            5,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          3.141592653589793,
          3.141592653589793
        ],
        "notation": "(1 2 3 4)(5 7)(6 8)"
      }
    ],
    "group": "C₄ × C₄",
    "subtitle": "快的走半圈，慢的走一格。让右边归还，左边独自前行。",
    "tag": "两种快慢，仍能织出独行。",
    "hints": [
      "两次左快右慢，会让左边转满一圈。",
      "从这两次变化中减去一次左慢右快，看看右边是否相消。"
    ],
    "discovery": "两种快慢，仍能织出独行。",
    "math": "把手 a²b 与 ab² 在模 4 指数空间中的行列式为 3，可逆，故生成 C₄×C₄。",
    "intent": "快的走半圈，慢的走一格。让右边归还，左边独自前行。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 98,
        "count": 4
      },
      {
        "center": [
          560,
          235
        ],
        "radius": 98,
        "count": 4
      }
    ],
    "initial": [
      3,
      0,
      1,
      2,
      4,
      5,
      6,
      7
    ],
    "number": 55,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "left_fast",
        "direction": 1
      },
      {
        "op": "left_fast",
        "direction": 1
      },
      {
        "op": "right_fast",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 16,
    "diameter": 4
  },
  {
    "id": "mirror_keeps_flower",
    "title": "借镜留花",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        127.0
      ],
      [
        333.531,
        289.0
      ],
      [
        146.469,
        289.0
      ],
      [
        560.0,
        127.0
      ],
      [
        653.531,
        289.0
      ],
      [
        466.469,
        289.0
      ]
    ],
    "ops": [
      {
        "id": "both",
        "title": "两花同转",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 3,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          2.0943951023931953
        ],
        "notation": "(1 2 3)(4 5 6)"
      },
      {
        "id": "mirror",
        "title": "左花照镜",
        "caption": "只交换左花的下方两枚",
        "cycles": [
          [
            1,
            2
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 3)"
      }
    ],
    "group": "S₃ × C₃",
    "subtitle": "右花想走一格，左花却会跟着走。让左侧镜面替它消掉这阵风。",
    "tag": "镜子留住花，风继续向右。",
    "hints": [
      "照镜会把左花的转动方向反过来。",
      "把镜面穿插在两次同转中，左边相消，右边留下变化。"
    ],
    "discovery": "镜子留住花，风继续向右。",
    "math": "同步三循环 ab 与左侧反射 s 生成 S₃×C₃。s(ab)s=a⁻¹b，两个联动相乘得到 b²。",
    "intent": "右花想走一格，左花却会跟着走。让左侧镜面替它消掉这阵风。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 108,
        "count": 3
      },
      {
        "center": [
          560,
          235
        ],
        "radius": 108,
        "count": 3
      }
    ],
    "initial": [
      0,
      1,
      2,
      4,
      5,
      3
    ],
    "number": 56,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "both",
        "direction": -1
      },
      {
        "op": "mirror",
        "direction": 1
      },
      {
        "op": "both",
        "direction": -1
      },
      {
        "op": "mirror",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 18,
    "diameter": 4
  },
  {
    "id": "season_two_bells",
    "title": "四季与两盏铃",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        133.0
      ],
      [
        342.0,
        235.0
      ],
      [
        240.0,
        337.0
      ],
      [
        138.0,
        235.0
      ],
      [
        480.0,
        99.0
      ],
      [
        480.0,
        213.0
      ],
      [
        625.0,
        248.0
      ],
      [
        625.0,
        362.0
      ]
    ],
    "ops": [
      {
        "id": "first",
        "title": "四季与上铃",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            480,
            156
          ]
        ],
        "angles": [
          1.5707963267948966,
          3.141592653589793
        ],
        "notation": "(1 2 3 4)(5 6)"
      },
      {
        "id": "second",
        "title": "四季与下铃",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            625,
            305
          ]
        ],
        "angles": [
          1.5707963267948966,
          3.141592653589793
        ],
        "notation": "(1 2 3 4)(7 8)"
      },
      {
        "id": "all",
        "title": "四季双铃",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            480,
            156
          ],
          [
            625,
            305
          ]
        ],
        "angles": [
          1.5707963267948966,
          3.141592653589793,
          3.141592653589793
        ],
        "notation": "(1 2 3 4)(5 6)(7 8)"
      }
    ],
    "group": "C₄ × C₂ × C₂",
    "subtitle": "四季想前进一格，两盏铃都想留下。借三种联动来安排。",
    "tag": "三种联动，恰好留下一季。",
    "hints": [
      "前两种联动相加时，四季走了两格，两盏铃各动一次。",
      "再反拨一次四季双铃，多余的一格和两声铃一起消失。"
    ],
    "discovery": "三种联动，恰好留下一季。",
    "math": "把手 ab、ac、abc 生成 C₄×C₂²，(ab)(ac)(abc)⁻¹=a。",
    "intent": "四季想前进一格，两盏铃都想留下。借三种联动来安排。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 102,
        "count": 4
      },
      {
        "center": [
          480,
          156
        ],
        "radius": 57,
        "count": 2
      },
      {
        "center": [
          625,
          305
        ],
        "radius": 57,
        "count": 2
      }
    ],
    "initial": [
      1,
      2,
      3,
      0,
      4,
      5,
      6,
      7
    ],
    "number": 57,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "first",
        "direction": 1
      },
      {
        "op": "second",
        "direction": 1
      },
      {
        "op": "all",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 16,
    "diameter": 3
  },
  {
    "id": "flower_waits_fifth",
    "title": "花等第五拍",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        134.0
      ],
      [
        327.469,
        285.5
      ],
      [
        152.531,
        285.5
      ],
      [
        560.0,
        123.0
      ],
      [
        666.518,
        200.39
      ],
      [
        625.832,
        325.61
      ],
      [
        494.168,
        325.61
      ],
      [
        453.482,
        200.39
      ]
    ],
    "ops": [
      {
        "id": "same",
        "title": "两花同向",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 15,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          1.2566370614359172
        ],
        "notation": "(1 2 3)(4 5 6 7 8)"
      },
      {
        "id": "apart",
        "title": "三顺五逆",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            3,
            7,
            6,
            5,
            4
          ]
        ],
        "motion": "orbit",
        "order": 15,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          2.0943951023931953,
          -1.2566370614359172
        ],
        "notation": "(1 2 3)(4 8 7 6 5)"
      }
    ],
    "group": "C₁₅",
    "subtitle": "三瓣花绕回来时，五瓣花恰好要多走一格。",
    "tag": "一边完整归来，一边刚好出发。",
    "hints": [
      "左花无论用哪枚把手，都按三拍走。",
      "两次同向加一次三顺五逆，左边满圈，右边只留一格。"
    ],
    "discovery": "一边完整归来，一边刚好出发。",
    "math": "C₃×C₅≅C₁₅。把手 ab 与 ab⁻¹ 满足 (ab)²(ab⁻¹)=b，故三步可单独前进五瓣花。",
    "intent": "三瓣花绕回来时，五瓣花恰好要多走一格。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 101,
        "count": 3
      },
      {
        "center": [
          560,
          235
        ],
        "radius": 112,
        "count": 5
      }
    ],
    "initial": [
      0,
      1,
      2,
      4,
      5,
      6,
      7,
      3
    ],
    "number": 58,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "same",
        "direction": 1
      },
      {
        "op": "same",
        "direction": 1
      },
      {
        "op": "apart",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 15,
    "diameter": 3
  },
  {
    "id": "two_mirrors_one_bell",
    "title": "两面镜一声铃",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        240.0,
        129.0
      ],
      [
        346.0,
        235.0
      ],
      [
        240.0,
        341.0
      ],
      [
        134.0,
        235.0
      ],
      [
        560.0,
        163.0
      ],
      [
        560.0,
        307.0
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "四季轮转",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "notation": "(1 2 3 4)"
      },
      {
        "id": "first",
        "title": "第一面镜",
        "caption": "方窗的左右两枚交换",
        "cycles": [
          [
            1,
            3
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 4)"
      },
      {
        "id": "second",
        "title": "带铃的镜",
        "caption": "方窗上下交换，小铃也一起响",
        "cycles": [
          [
            0,
            2
          ],
          [
            4,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 3)(5 6)"
      }
    ],
    "group": "D₄ × C₂",
    "subtitle": "只把右边的小铃翻过来。两面镜留下的半圈，也记得收回。",
    "tag": "镜中多出来的半圈，也有归途。",
    "hints": [
      "两面镜合起来，会让方窗半转，并拨响小铃。",
      "再用转轮消去方窗的半圈。"
    ],
    "discovery": "镜中多出来的半圈，也有归途。",
    "math": "两面相垂直的反射乘积为方窗半转。第二面镜同时带动独立二循环，生成 D₄×C₂，阶 16。",
    "intent": "只把右边的小铃翻过来。两面镜留下的半圈，也记得收回。",
    "dials": [
      {
        "center": [
          240,
          235
        ],
        "radius": 106,
        "count": 4
      },
      {
        "center": [
          560,
          235
        ],
        "radius": 72,
        "count": 2
      }
    ],
    "initial": [
      0,
      1,
      2,
      3,
      5,
      4
    ],
    "number": 59,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "first",
        "direction": 1
      },
      {
        "op": "second",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 16,
    "diameter": 4
  },
  {
    "id": "three_voice_concert",
    "title": "三声合奏",
    "chapter": "第六间 · 合拍",
    "scene": "beat_garden",
    "points": [
      [
        400.0,
        57.0
      ],
      [
        400.0,
        173.0
      ],
      [
        232.0,
        194.0
      ],
      [
        310.808,
        330.5
      ],
      [
        153.192,
        330.5
      ],
      [
        568.0,
        194.0
      ],
      [
        646.808,
        330.5
      ],
      [
        489.192,
        330.5
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "铃与左花",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 6,
        "centers": [
          [
            400,
            115
          ],
          [
            232,
            285
          ]
        ],
        "angles": [
          3.141592653589793,
          2.0943951023931953
        ],
        "notation": "(1 2)(3 4 5)"
      },
      {
        "id": "right",
        "title": "铃与右花",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1
          ],
          [
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 6,
        "centers": [
          [
            400,
            115
          ],
          [
            568,
            285
          ]
        ],
        "angles": [
          3.141592653589793,
          2.0943951023931953
        ],
        "notation": "(1 2)(6 7 8)"
      }
    ],
    "group": "C₂ × C₃ × C₃",
    "subtitle": "两朵花各差一格，小铃也要换位。让长短不同的回程合在一起。",
    "tag": "同一个终点，也能带回不同的回声。",
    "hints": [
      "三瓣花正转一格，也可以反转两格。小铃却会数清你拨了几次。",
      "让其中一朵花多走那条回程路，小铃就会留下需要的一次换位。"
    ],
    "discovery": "同一个终点，也能带回不同的回声。",
    "math": "两把手 ab 与 ac 生成 C₂×C₃²。三循环的两条等效路径长度奇偶不同，可改变二循环的净效果。",
    "intent": "两朵花各差一格，小铃也要换位。让长短不同的回程合在一起。",
    "dials": [
      {
        "center": [
          400,
          115
        ],
        "radius": 58,
        "count": 2
      },
      {
        "center": [
          232,
          285
        ],
        "radius": 91,
        "count": 3
      },
      {
        "center": [
          568,
          285
        ],
        "radius": 91,
        "count": 3
      }
    ],
    "initial": [
      1,
      0,
      4,
      2,
      3,
      7,
      5,
      6
    ],
    "number": 60,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 18,
    "diameter": 3
  },
  {
    "id": "seven_mirror_gallery",
    "title": "七面镜廊",
    "chapter": "第七间 · 折光",
    "scene": "scale_mirror",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        518.057,
        140.853
      ],
      [
        547.214,
        268.601
      ],
      [
        465.516,
        371.046
      ],
      [
        334.484,
        371.046
      ],
      [
        252.786,
        268.601
      ],
      [
        281.943,
        140.853
      ]
    ],
    "ops": [
      {
        "id": "first",
        "title": "顶点镜面",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            1,
            6
          ],
          [
            2,
            5
          ],
          [
            3,
            4
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 7)(3 6)(4 5)"
      },
      {
        "id": "second",
        "title": "斜向镜面",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            6
          ],
          [
            3,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 2)(3 7)(4 6)"
      }
    ],
    "group": "D₇",
    "subtitle": "这里只能照镜，却要让整个图案走过两格。",
    "tag": "镜面接起镜面，脚步就绕过圆环。",
    "hints": [
      "两面不同的镜子连用，会留下转动。",
      "先找出两次照镜合成的一格，再把这段动作重复一次。"
    ],
    "discovery": "镜面接起镜面，脚步就绕过圆环。",
    "math": "两反射 x↦−x 与 x↦1−x 的乘积是模 7 平移，生成 D₇，阶 14。",
    "intent": "这里只能照镜，却要让整个图案走过两格。",
    "mirrorAngles": [
      0,
      0.4487989505128276
    ],
    "initial": [
      5,
      6,
      0,
      1,
      2,
      3,
      4
    ],
    "number": 61,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "second",
        "direction": 1
      },
      {
        "op": "first",
        "direction": 1
      },
      {
        "op": "second",
        "direction": 1
      },
      {
        "op": "first",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 14,
    "diameter": 7
  },
  {
    "id": "octagonal_lamp",
    "title": "八角灯罩",
    "chapter": "第七间 · 同一束光",
    "scene": "scale_mirror",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "stride",
        "title": "跨三格转",
        "caption": "这一圈的颜色前进3格",
        "cycles": [
          [
            0,
            3,
            6,
            1,
            4,
            7,
            2,
            5
          ]
        ],
        "motion": "orbit",
        "order": 8,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          2.356194490192345
        ],
        "notation": "(1 4 7 2 5 8 3 6)"
      },
      {
        "id": "mirror",
        "title": "竖直镜面",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            1,
            7
          ],
          [
            2,
            6
          ],
          [
            3,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 8)(3 7)(4 6)"
      }
    ],
    "group": "D₈",
    "subtitle": "灯罩只差一格，把手却一次跨三格。看看绕圈能借来多少。",
    "tag": "绕过一整圈，仍只留下一格。",
    "hints": [
      "八格是一整圈，多走一圈也会回到同一个朝向。",
      "三次三格一共走九格，恰好多出一格。"
    ],
    "discovery": "绕过一整圈，仍只留下一格。",
    "math": "r³ 与 s 生成 D₈，因为 3 在模 8 下可逆。目标是一格平移，最短三步。",
    "intent": "灯罩只差一格，把手却一次跨三格。看看绕圈能借来多少。",
    "pair": "octagonal_two_mirrors",
    "mirrorAngles": [
      0
    ],
    "initial": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      0
    ],
    "number": 62,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "stride",
        "direction": 1
      },
      {
        "op": "stride",
        "direction": 1
      },
      {
        "op": "stride",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 16,
    "diameter": 5
  },
  {
    "id": "octagonal_two_mirrors",
    "title": "双镜借八角",
    "chapter": "第七间 · 同一束光",
    "scene": "scale_mirror",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "first",
        "title": "第一面镜",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            1,
            7
          ],
          [
            2,
            6
          ],
          [
            3,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 8)(3 7)(4 6)"
      },
      {
        "id": "second",
        "title": "第二面镜",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            7
          ],
          [
            3,
            6
          ],
          [
            4,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 2)(3 8)(4 7)(5 6)"
      }
    ],
    "group": "D₈",
    "subtitle": "还是那一格。这次，让两面挨近的镜子替灯罩转过去。",
    "tag": "同样的一格，换两面镜就近了。",
    "hints": [
      "两次翻转之后，图案的顺序会恢复。",
      "先后试一下两面镜，顺序决定转动的方向。"
    ],
    "discovery": "同样的一格，换两面镜就近了。",
    "math": "与第 62 关同为 D₈，初态与目标相同。生成元改成两个反射，最短从三步变成两步。",
    "intent": "还是那一格。这次，让两面挨近的镜子替灯罩转过去。",
    "pair": "octagonal_lamp",
    "mirrorAngles": [
      0,
      0.39269908169872414
    ],
    "initial": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      0
    ],
    "number": 63,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "first",
        "direction": 1
      },
      {
        "op": "second",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 16,
    "diameter": 8
  },
  {
    "id": "threefold_scale",
    "title": "星盘三折",
    "chapter": "第七间 · 刻度里的暗道",
    "scene": "folded_scale",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "刻度走一格",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 8,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.7853981633974483
        ],
        "notation": "(1 2 3 4 5 6 7 8)"
      },
      {
        "id": "fold",
        "title": "三折刻度",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            1,
            3
          ],
          [
            2,
            6
          ],
          [
            5,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 4)(3 7)(6 8)"
      }
    ],
    "group": "C₈ ⋊₍₃₎ C₂",
    "subtitle": "一格小步经过折路之后，会变成三格。借这条暗道还原星盘。",
    "tag": "同一小步，穿过折路便走得更远。",
    "hints": [
      "折路两次就会复原，但夹在中间的一格会改走别处。",
      "试着把折路和一格移动交换先后，观察等效的是几格。"
    ],
    "discovery": "同一小步，穿过折路便走得更远。",
    "math": "r:x↦x+1，s:x↦3x（模 8），满足 srs=r³。生成阶 16 的半二面体群；下标 3 指该共轭作用。",
    "intent": "一格小步经过折路之后，会变成三格。借这条暗道还原星盘。",
    "foldFactors": [
      3
    ],
    "number": 64,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      7,
      2,
      5,
      0,
      3,
      6,
      1,
      4
    ],
    "certificate": [
      {
        "op": "fold",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": -1
      }
    ],
    "shortest": 2,
    "group_order": 16,
    "diameter": 4
  },
  {
    "id": "odd_marks_return",
    "title": "奇数刻度归来",
    "chapter": "第七间 · 刻度里的暗道",
    "scene": "folded_scale",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "刻度走一格",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 8,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.7853981633974483
        ],
        "notation": "(1 2 3 4 5 6 7 8)"
      },
      {
        "id": "fold",
        "title": "五折刻度",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            1,
            5
          ],
          [
            3,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 6)(4 8)"
      }
    ],
    "group": "C₈ ⋊₍₅₎ C₂",
    "subtitle": "这条折路只换走一半刻度。把它借到另一半，拼出整圈半转。",
    "tag": "一半加上另一半，星盘转过半圈。",
    "hints": [
      "五折刻度交换奇数位置，偶数位置留下。",
      "移一格后再折一次，便能照顾另一半，最后收回借位。"
    ],
    "discovery": "一半加上另一半，星盘转过半圈。",
    "math": "r:x↦x+1，s:x↦5x（模 8），满足 srs=r⁵。srsr⁻¹=r⁴；该阶 16 的半直积与上一关不同。",
    "intent": "这条折路只换走一半刻度。把它借到另一半，拼出整圈半转。",
    "foldFactors": [
      5
    ],
    "initial": [
      4,
      5,
      6,
      7,
      0,
      1,
      2,
      3
    ],
    "number": 65,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 16,
    "diameter": 4
  },
  {
    "id": "two_folds_make_mirror",
    "title": "两折成镜",
    "chapter": "第七间 · 刻度里的暗道",
    "scene": "folded_scale",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "刻度走一格",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 8,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.7853981633974483
        ],
        "notation": "(1 2 3 4 5 6 7 8)"
      },
      {
        "id": "fold",
        "title": "三折刻度",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            1,
            3
          ],
          [
            2,
            6
          ],
          [
            5,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 4)(3 7)(6 8)"
      },
      {
        "id": "five",
        "title": "五折刻度",
        "caption": "沿预览中的刻度路线移动",
        "cycles": [
          [
            1,
            5
          ],
          [
            3,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 6)(4 8)"
      }
    ],
    "group": "C₈ ⋊ (C₂ × C₂)",
    "subtitle": "没有镜面把手，却要把环上的次序翻过来。",
    "tag": "两次不同的折路，合成一面镜。",
    "hints": [
      "两条折路的作用可以连着看。",
      "三折之后再五折，每个刻度最终会走到相反编号。"
    ],
    "discovery": "两次不同的折路，合成一面镜。",
    "math": "模 8 的单位 3、5 生成 {1,3,5,7}。两折相乘为 x↦7x=−x，整体仿射群阶为 8×4=32。",
    "intent": "没有镜面把手，却要把环上的次序翻过来。",
    "foldFactors": [
      3,
      5
    ],
    "initial": [
      0,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    ],
    "number": 66,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "fold",
        "direction": 1
      },
      {
        "op": "five",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 32,
    "diameter": 4
  },
  {
    "id": "paired_pages_same_wind",
    "title": "双页同一阵风",
    "chapter": "第七间 · 页与镜",
    "scene": "pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "both",
        "title": "两页同转",
        "caption": "几处颜色按各自节拍一起走",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 2 3 4)(5 6 7 8)"
      },
      {
        "id": "pages",
        "title": "交换两页",
        "caption": "两页整组换边，朝向保留",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "spread": 0.7,
        "turnFrame": true,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "group": "C₄ × C₂",
    "subtitle": "两页需要一起半转，还要交换位置。把两件事分开安排。",
    "tag": "同转与换页，各有各的归途。",
    "hints": [
      "同步转动不会改变哪一页在左边。",
      "先转半圈再换页，或先换页再转，结果相同。"
    ],
    "discovery": "同转与换页，各有各的归途。",
    "math": "同步四循环与整页交换可交换，生成 C₄×C₂，采用八点正则作用。",
    "intent": "两页需要一起半转，还要交换位置。把两件事分开安排。",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "number": 67,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      6,
      7,
      4,
      5,
      2,
      3,
      0,
      1
    ],
    "certificate": [
      {
        "op": "both",
        "direction": 1
      },
      {
        "op": "both",
        "direction": 1
      },
      {
        "op": "pages",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 8,
    "diameter": 3
  },
  {
    "id": "cross_mirror_pages",
    "title": "双页十字镜",
    "chapter": "第七间 · 页与镜",
    "scene": "pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "across",
        "title": "左页横镜",
        "caption": "左页两对颜色左右交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 2)(3 4)"
      },
      {
        "id": "down",
        "title": "左页纵镜",
        "caption": "左页两对颜色上下交换",
        "cycles": [
          [
            0,
            3
          ],
          [
            1,
            2
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 4)(2 3)"
      },
      {
        "id": "pages",
        "title": "交换两页",
        "caption": "两页整组换边，朝向保留",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "spread": 0.7,
        "turnFrame": true,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "group": "(C₂ × C₂) ≀ C₂",
    "subtitle": "左页要横翻，右页要半转。两面镜都只装在左边。",
    "tag": "两面小镜，也能替两页分工。",
    "hints": [
      "左右翻与上下翻合起来，就是一页的半转。",
      "先整理左页，再借来右页照两面镜，最后换回。"
    ],
    "discovery": "两面小镜，也能替两页分工。",
    "math": "每页的横纵双换位生成 Klein 四元群 C₂²，整页交换得到 (C₂²)≀C₂，阶 4²×2=32。",
    "intent": "左页要横翻，右页要半转。两面镜都只装在左边。",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "initial": [
      1,
      0,
      3,
      2,
      6,
      7,
      4,
      5
    ],
    "number": 68,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "across",
        "direction": 1
      },
      {
        "op": "pages",
        "direction": 1
      },
      {
        "op": "across",
        "direction": 1
      },
      {
        "op": "down",
        "direction": 1
      },
      {
        "op": "pages",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 32,
    "diameter": 6
  },
  {
    "id": "mirror_page_windmill",
    "title": "镜页风车",
    "chapter": "第七间 · 两种页角工具",
    "scene": "pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "左页转动",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 2 3 4)"
      },
      {
        "id": "mirror",
        "title": "左页对角镜",
        "caption": "左页一对对角位置交换",
        "cycles": [
          [
            1,
            3
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 4)"
      },
      {
        "id": "pages",
        "title": "交换两页",
        "caption": "两页整组换边，朝向保留",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "spread": 0.7,
        "turnFrame": true,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "group": "D₄ ≀ C₂",
    "subtitle": "左页要转一格，右页要照镜。把同一套工具借给两页。",
    "tag": "同一套工具，借给不同的一页。",
    "hints": [
      "工具只影响左页，整页交换能把右页送来。",
      "一页转动，一页照镜，再把两页放回原处。"
    ],
    "discovery": "同一套工具，借给不同的一页。",
    "math": "局部方形对称 D₄ 与两页交换生成 D₄≀C₂，阶 8²×2=128。",
    "intent": "左页要转一格，右页要照镜。把同一套工具借给两页。",
    "pair": "page_corner_scissors",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "initial": [
      3,
      0,
      1,
      2,
      4,
      7,
      6,
      5
    ],
    "number": 69,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "pages",
        "direction": 1
      },
      {
        "op": "mirror",
        "direction": 1
      },
      {
        "op": "pages",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 128,
    "diameter": 8
  },
  {
    "id": "page_corner_scissors",
    "title": "页角小剪刀",
    "chapter": "第七间 · 两种页角工具",
    "scene": "pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "左页转动",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 2 3 4)"
      },
      {
        "id": "cut",
        "title": "左页邻角换位",
        "caption": "只交换左页上方相邻两枚",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      },
      {
        "id": "pages",
        "title": "交换两页",
        "caption": "两页整组换边，朝向保留",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "exchange",
        "order": 2,
        "centers": [
          [
            240,
            235
          ],
          [
            560,
            235
          ]
        ],
        "blocks": [
          [
            0,
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "spread": 0.7,
        "turnFrame": true,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "group": "S₄ ≀ C₂",
    "subtitle": "还是两页的同一个目标。对角镜换成了只能剪相邻页角的工具。",
    "tag": "一把小剪刀，能织出更多页内变化。",
    "hints": [
      "相邻换位可以拼出对角换位，但需要把中间的颜色借来。",
      "先在一页上找到对角交换的短动作，再借给另一页使用。"
    ],
    "discovery": "一把小剪刀，能织出更多页内变化。",
    "math": "局部四循环与相邻换位生成 S₄，整页交换得到 S₄≀C₂，阶 24²×2=1152。与第 69 关同目标，群和基本工具均不同。",
    "intent": "还是两页的同一个目标。对角镜换成了只能剪相邻页角的工具。",
    "pair": "mirror_page_windmill",
    "pairNote": "同一个目标，这次能任意排列每页的四枚颜色，但对角交换需要先用邻角工具拼出来。",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "initial": [
      3,
      0,
      1,
      2,
      4,
      7,
      6,
      5
    ],
    "number": 70,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "pages",
        "direction": 1
      },
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "cut",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "cut",
        "direction": 1
      },
      {
        "op": "pages",
        "direction": 1
      }
    ],
    "shortest": 8,
    "group_order": 1152,
    "diameter": 14
  },
  {
    "id": "two_garden_gates",
    "title": "两扇对门",
    "chapter": "第八间 · 游园",
    "scene": "garden_gates",
    "points": [
      [
        285,
        120
      ],
      [
        515,
        120
      ],
      [
        515,
        350
      ],
      [
        285,
        350
      ]
    ],
    "ops": [
      {
        "id": "side",
        "title": "横过花园",
        "caption": "两行各自交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 2)(3 4)"
      },
      {
        "id": "rise",
        "title": "纵过花园",
        "caption": "两列各自交换",
        "cycles": [
          [
            0,
            3
          ],
          [
            1,
            2
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(1 4)(2 3)"
      }
    ],
    "group": "C₂ × C₂",
    "subtitle": "四位客人都去了对角。两扇小门，足够把他们送回来。",
    "tag": "一横一纵，正好抵达对角。",
    "hints": [
      "横过一次，再纵过一次，便会到达对角。",
      "两扇门先后顺序不同，终点仍然相同。"
    ],
    "discovery": "一横一纵，正好抵达对角。",
    "math": "两种双换位生成 C₂²，在四个角上正则作用；第三个非平凡元素是对角双换位。",
    "intent": "四位客人都去了对角。两扇小门，足够把他们送回来。",
    "initial": [
      2,
      3,
      0,
      1
    ],
    "number": 71,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3
    ],
    "certificate": [
      {
        "op": "side",
        "direction": 1
      },
      {
        "op": "rise",
        "direction": 1
      }
    ],
    "shortest": 2,
    "group_order": 4,
    "diameter": 2
  },
  {
    "id": "neighbor_room_bells",
    "title": "邻屋双铃",
    "chapter": "第八间 · 同一园路",
    "scene": "room_parade",
    "points": [
      [
        363.0,
        109.0
      ],
      [
        437.0,
        109.0
      ],
      [
        489.0,
        235.0
      ],
      [
        563.0,
        235.0
      ],
      [
        363.0,
        361.0
      ],
      [
        437.0,
        361.0
      ],
      [
        237.0,
        235.0
      ],
      [
        311.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "tour",
        "title": "四室巡游",
        "caption": "四间小屋顺行一站，屋内朝向保留",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "carousel",
        "order": 4,
        "blocks": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "centers": [
          [
            400.0,
            109.0
          ],
          [
            526.0,
            235.0
          ],
          [
            400.0,
            361.0
          ],
          [
            274.0,
            235.0
          ]
        ],
        "pivot": [
          400,
          235
        ],
        "angle": 1.5707963267948966,
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "pair",
        "title": "邻屋双铃",
        "caption": "上方与右方小屋同时换座",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(3 4)"
      }
    ],
    "group": "C₂³ ⋊ C₄",
    "subtitle": "四间屋都要换座，但铃一次只照顾相邻两间。沿园路把它借出去。",
    "tag": "两间接着两间，整座花园归位。",
    "hints": [
      "修好两间后，另一对需要来到铃旁。",
      "可以把修好的两间送到对面，再处理余下两间，最后归还朝向。"
    ],
    "discovery": "两间接着两间，整座花园归位。",
    "math": "旋转四间屋与相邻两屋换座生成偶数次局部翻转 C₂³，再与 C₄ 半直积，阶 32。",
    "intent": "四间屋都要换座，但铃一次只照顾相邻两间。沿园路把它借出去。",
    "pair": "opposite_room_bells",
    "rooms": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ]
    ],
    "centers": [
      [
        400.0,
        109.0
      ],
      [
        526.0,
        235.0
      ],
      [
        400.0,
        361.0
      ],
      [
        274.0,
        235.0
      ]
    ],
    "initial": [
      1,
      0,
      3,
      2,
      5,
      4,
      7,
      6
    ],
    "number": 72,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "pair",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "pair",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 32,
    "diameter": 6
  },
  {
    "id": "opposite_room_bells",
    "title": "隔屋双铃",
    "chapter": "第八间 · 同一园路",
    "scene": "room_parade",
    "points": [
      [
        363.0,
        109.0
      ],
      [
        437.0,
        109.0
      ],
      [
        489.0,
        235.0
      ],
      [
        563.0,
        235.0
      ],
      [
        363.0,
        361.0
      ],
      [
        437.0,
        361.0
      ],
      [
        237.0,
        235.0
      ],
      [
        311.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "tour",
        "title": "四室巡游",
        "caption": "四间小屋顺行一站，屋内朝向保留",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "carousel",
        "order": 4,
        "blocks": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "centers": [
          [
            400.0,
            109.0
          ],
          [
            526.0,
            235.0
          ],
          [
            400.0,
            361.0
          ],
          [
            274.0,
            235.0
          ]
        ],
        "pivot": [
          400,
          235
        ],
        "angle": 1.5707963267948966,
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "pair",
        "title": "隔屋双铃",
        "caption": "上方与下方小屋同时换座",
        "cycles": [
          [
            0,
            1
          ],
          [
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(5 6)"
      }
    ],
    "group": "(C₂ × C₂) ⋊ C₄",
    "subtitle": "还是四间屋。这次铃照顾相对的两间，一次转向就能接上余下两间。",
    "tag": "铃声隔屋相接，归途也短了一些。",
    "hints": [
      "上下来过之后，左右需要同样的一声铃。",
      "换座、转一站、再换座，最后把小屋转回来。"
    ],
    "discovery": "铃声隔屋相接，归途也短了一些。",
    "math": "相对两屋翻转的旋转共轭只生成 C₂²，C₄ 交换两个生成元，整体阶 16。与第 72 关同目标，子群与工具都不同。",
    "intent": "还是四间屋。这次铃照顾相对的两间，一次转向就能接上余下两间。",
    "pair": "neighbor_room_bells",
    "pairNote": "目标相同，铃从相邻两间改成相对两间，可达状态也从 32 个变成 16 个。",
    "rooms": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ]
    ],
    "centers": [
      [
        400.0,
        109.0
      ],
      [
        526.0,
        235.0
      ],
      [
        400.0,
        361.0
      ],
      [
        274.0,
        235.0
      ]
    ],
    "initial": [
      1,
      0,
      3,
      2,
      5,
      4,
      7,
      6
    ],
    "number": 73,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "pair",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": -1
      },
      {
        "op": "pair",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 16,
    "diameter": 4
  },
  {
    "id": "upstairs_downstairs",
    "title": "上楼下楼",
    "chapter": "第八间 · 借一层位置",
    "scene": "branch_tree",
    "points": [
      [
        134,
        336
      ],
      [
        210,
        336
      ],
      [
        286,
        336
      ],
      [
        362,
        336
      ],
      [
        438,
        336
      ],
      [
        514,
        336
      ],
      [
        590,
        336
      ],
      [
        666,
        336
      ]
    ],
    "ops": [
      {
        "id": "twig",
        "title": "一对叶子",
        "caption": "最左边一对叶子交换",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      },
      {
        "id": "branch",
        "title": "两枝换边",
        "caption": "左半边的两对叶子整组交换",
        "cycles": [
          [
            0,
            2
          ],
          [
            1,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 3)(2 4)"
      },
      {
        "id": "crown",
        "title": "两冠换边",
        "caption": "左右各四枚整组交换",
        "cycles": [
          [
            0,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 5)(2 6)(3 7)(4 8)"
      }
    ],
    "group": "D₄ ≀ C₂",
    "subtitle": "工具在最左端，想换的却是最右端一对。借大枝，再借小枝。",
    "tag": "借位可以一层一层，归还也一样。",
    "hints": [
      "先把右半棵树借到左边，目标仍在这一半的右端。",
      "再借一次小枝，换好叶子后按相反次序归还两层。"
    ],
    "discovery": "借位可以一层一层，归还也一样。",
    "math": "三层二叉树的叶子置换保持逐层二点分块，生成三次 C₂ 迭代圈积，阶 2⁷=128，同构 D₄≀C₂。",
    "intent": "工具在最左端，想换的却是最右端一对。借大枝，再借小枝。",
    "initial": [
      0,
      1,
      2,
      3,
      4,
      5,
      7,
      6
    ],
    "number": 74,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "crown",
        "direction": 1
      },
      {
        "op": "branch",
        "direction": 1
      },
      {
        "op": "twig",
        "direction": 1
      },
      {
        "op": "branch",
        "direction": 1
      },
      {
        "op": "crown",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 128,
    "diameter": 10
  },
  {
    "id": "four_rooms_everywhere",
    "title": "四室各有门",
    "chapter": "第八间 · 换一声铃",
    "scene": "room_parade",
    "points": [
      [
        363.0,
        109.0
      ],
      [
        437.0,
        109.0
      ],
      [
        489.0,
        235.0
      ],
      [
        563.0,
        235.0
      ],
      [
        363.0,
        361.0
      ],
      [
        437.0,
        361.0
      ],
      [
        237.0,
        235.0
      ],
      [
        311.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "tour",
        "title": "四室巡游",
        "caption": "四间小屋顺行一站，屋内朝向保留",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "carousel",
        "order": 4,
        "blocks": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "centers": [
          [
            400.0,
            109.0
          ],
          [
            526.0,
            235.0
          ],
          [
            400.0,
            361.0
          ],
          [
            274.0,
            235.0
          ]
        ],
        "pivot": [
          400,
          235
        ],
        "angle": 1.5707963267948966,
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "rooms",
        "title": "两屋换站",
        "caption": "上方与右方的整间屋交换",
        "cycles": [
          [
            0,
            2
          ],
          [
            1,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 3)(2 4)"
      },
      {
        "id": "bell",
        "title": "一屋换座",
        "caption": "只交换最上方屋里的两枚",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "group": "C₂ ≀ S₄",
    "subtitle": "相对两间需要换座。房间能沿路走，也能临时换站。",
    "tag": "先安排房间，再安排房内的座位。",
    "hints": [
      "换站搬的是整间屋，换座只动屋里的一对。",
      "两间分别送到上方处理，最后把它们的站位也恢复。"
    ],
    "discovery": "先安排房间，再安排房内的座位。",
    "math": "四个二点块可独立翻转，块间由四循环与相邻换位生成 S₄，因此群为 C₂≀S₄，阶 16×24=384。",
    "intent": "相对两间需要换座。房间能沿路走，也能临时换站。",
    "pair": "paired_doors",
    "rooms": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ]
    ],
    "centers": [
      [
        400.0,
        109.0
      ],
      [
        526.0,
        235.0
      ],
      [
        400.0,
        361.0
      ],
      [
        274.0,
        235.0
      ]
    ],
    "initial": [
      1,
      0,
      2,
      3,
      5,
      4,
      6,
      7
    ],
    "number": 75,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "bell",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "bell",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 384,
    "diameter": 10
  },
  {
    "id": "paired_doors",
    "title": "成双开门",
    "chapter": "第八间 · 换一声铃",
    "scene": "room_parade",
    "points": [
      [
        363.0,
        109.0
      ],
      [
        437.0,
        109.0
      ],
      [
        489.0,
        235.0
      ],
      [
        563.0,
        235.0
      ],
      [
        363.0,
        361.0
      ],
      [
        437.0,
        361.0
      ],
      [
        237.0,
        235.0
      ],
      [
        311.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "tour",
        "title": "四室巡游",
        "caption": "四间小屋顺行一站，屋内朝向保留",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "carousel",
        "order": 4,
        "blocks": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "centers": [
          [
            400.0,
            109.0
          ],
          [
            526.0,
            235.0
          ],
          [
            400.0,
            361.0
          ],
          [
            274.0,
            235.0
          ]
        ],
        "pivot": [
          400,
          235
        ],
        "angle": 1.5707963267948966,
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "rooms",
        "title": "两屋换站",
        "caption": "上方与右方的整间屋交换",
        "cycles": [
          [
            0,
            2
          ],
          [
            1,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 3)(2 4)"
      },
      {
        "id": "pair",
        "title": "邻屋双铃",
        "caption": "上方与右方小屋同时换座",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(3 4)"
      }
    ],
    "group": "C₂³ ⋊ S₄",
    "subtitle": "还是相对的两间。这次铃总成双响，把它们先并排送来。",
    "tag": "合适的两间并排，一声铃便足够。",
    "hints": [
      "先用换站或巡游，让要处理的两间占住相邻铃位。",
      "成双换座之后，把房间送回原来的位置。"
    ],
    "discovery": "合适的两间并排，一声铃便足够。",
    "math": "双屋翻转的 S₄ 共轭生成偶重量子空间 C₂³，整体为 C₂³⋊S₄，阶 8×24=192，是上一关的指数 2 子群。",
    "intent": "还是相对的两间。这次铃总成双响，把它们先并排送来。",
    "pair": "four_rooms_everywhere",
    "pairNote": "初态和目标相同。这次只允许偶数间屋同时换座，合适的一次成双操作便能完成两份工作。",
    "rooms": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ]
    ],
    "centers": [
      [
        400.0,
        109.0
      ],
      [
        526.0,
        235.0
      ],
      [
        400.0,
        361.0
      ],
      [
        274.0,
        235.0
      ]
    ],
    "initial": [
      1,
      0,
      2,
      3,
      5,
      4,
      6,
      7
    ],
    "number": 76,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "tour",
        "direction": -1
      },
      {
        "op": "pair",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "pair",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 192,
    "diameter": 8
  },
  {
    "id": "alternating_shuttles",
    "title": "两班接驳车",
    "chapter": "第八间 · 同一封远信",
    "scene": "shuttle_rail",
    "points": [
      [
        154,
        288
      ],
      [
        236,
        182
      ],
      [
        318,
        288
      ],
      [
        400,
        182
      ],
      [
        482,
        288
      ],
      [
        564,
        182
      ],
      [
        646,
        288
      ]
    ],
    "ops": [
      {
        "id": "odd",
        "title": "第一班车",
        "caption": "三段不相接的站间桥同时交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(3 4)(5 6)"
      },
      {
        "id": "even",
        "title": "第二班车",
        "caption": "错开一站的三段桥同时交换",
        "cycles": [
          [
            1,
            2
          ],
          [
            3,
            4
          ],
          [
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 3)(4 5)(6 7)"
      },
      {
        "id": "cut",
        "title": "站口换位",
        "caption": "只交换最左边相邻两站",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "group": "S₇",
    "subtitle": "隔一站的两位客人想交换，接驳车却总带动三座桥。把其他旅客送回原站。",
    "tag": "一整班车，也能只留下两人的换位。",
    "hints": [
      "两班车交替可以让客人沿路走。站口的小桥可以只处理一对。",
      "先把需要的变化借到站口，再沿原来的接驳次序返回。"
    ],
    "discovery": "一整班车，也能只留下两人的换位。",
    "math": "两组交错换位生成七点二面体作用，加入站口单换位后生成 S₇。",
    "intent": "隔一站的两位客人想交换，接驳车却总带动三座桥。把其他旅客送回原站。",
    "pair": "seven_stop_loop",
    "initial": [
      0,
      3,
      2,
      1,
      4,
      5,
      6
    ],
    "number": 77,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "odd",
        "direction": 1
      },
      {
        "op": "even",
        "direction": 1
      },
      {
        "op": "cut",
        "direction": 1
      },
      {
        "op": "even",
        "direction": 1
      },
      {
        "op": "odd",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 5040,
    "diameter": 22
  },
  {
    "id": "seven_stop_loop",
    "title": "七站环线",
    "chapter": "第八间 · 同一封远信",
    "scene": "shuttle_rail",
    "points": [
      [
        154,
        288
      ],
      [
        236,
        182
      ],
      [
        318,
        288
      ],
      [
        400,
        182
      ],
      [
        482,
        288
      ],
      [
        564,
        182
      ],
      [
        646,
        288
      ]
    ],
    "ops": [
      {
        "id": "route",
        "title": "环线一站",
        "caption": "七站依次前行，末站回到站口",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 7,
        "notation": "(1 2 3 4 5 6 7)"
      },
      {
        "id": "cut",
        "title": "站口换位",
        "caption": "只交换最左边相邻两站",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "group": "S₇",
    "subtitle": "还是隔一站的两位客人，接驳车换成了一条完整环线。",
    "tag": "同一封信，换条线路来送。",
    "hints": [
      "小桥只交换相邻两枚，可以借中间的颜色接力。",
      "把跨一站的交换拆成三次相邻交换，再用环线把小桥送到相应的位置。"
    ],
    "discovery": "同一封信，换条线路来送。",
    "math": "七循环与相邻换位生成 S₇，与第 77 关的初态、目标和可达状态完全相同，改变的是生成元。",
    "intent": "还是隔一站的两位客人，接驳车换成了一条完整环线。",
    "pair": "alternating_shuttles",
    "initial": [
      0,
      3,
      2,
      1,
      4,
      5,
      6
    ],
    "number": 78,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "route",
        "direction": -1
      },
      {
        "op": "cut",
        "direction": 1
      },
      {
        "op": "route",
        "direction": -1
      },
      {
        "op": "cut",
        "direction": 1
      },
      {
        "op": "route",
        "direction": 1
      },
      {
        "op": "cut",
        "direction": 1
      },
      {
        "op": "route",
        "direction": 1
      }
    ],
    "shortest": 7,
    "group_order": 5040,
    "diameter": 21
  },
  {
    "id": "three_leaves_one_quarter",
    "title": "三叶等一刻",
    "chapter": "第八间 · 园中的小停顿",
    "scene": "petal_pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "leaf",
        "title": "三叶回旋",
        "caption": "左页前三角依次轮换",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "linked",
        "title": "花钟联动",
        "caption": "左页后三角轮换，右钟同时走一格",
        "cycles": [
          [
            1,
            2,
            3
          ],
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 12,
        "notation": "(2 3 4)(5 6 7 8)"
      }
    ],
    "group": "A₄ × C₄",
    "subtitle": "右边的钟差一格，左边的花想原样留下。让三叶先绕满一圈。",
    "tag": "等花完整归来，时钟恰好走了一刻。",
    "hints": [
      "花钟联动的两侧，分别按三拍和四拍走。",
      "连续反拨三次，左侧回到原处，右侧恰好等于顺走一格。"
    ],
    "discovery": "等花完整归来，时钟恰好走了一刻。",
    "math": "两个相交三循环生成左侧 A₄。联动三循环与右四循环因互素周期可分别取出，整体为 A₄×C₄，阶 48。",
    "intent": "右边的钟差一格，左边的花想原样留下。让三叶先绕满一圈。",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "initial": [
      0,
      1,
      2,
      3,
      5,
      6,
      7,
      4
    ],
    "number": 79,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "linked",
        "direction": -1
      },
      {
        "op": "linked",
        "direction": -1
      },
      {
        "op": "linked",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 48,
    "diameter": 4
  },
  {
    "id": "two_gardens_return",
    "title": "双园归席",
    "chapter": "第八间 · 两边都要归还",
    "scene": "petal_pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "左页转动",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            240,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(1 2 3 4)"
      },
      {
        "id": "right",
        "title": "右页转动",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            560,
            235
          ]
        ],
        "angles": [
          1.5707963267948966
        ],
        "turnFrame": true,
        "notation": "(5 6 7 8)"
      },
      {
        "id": "cut",
        "title": "双园小剪刀",
        "caption": "两页的上边各交换一对",
        "cycles": [
          [
            0,
            1
          ],
          [
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(5 6)"
      }
    ],
    "group": "S₄ × S₄",
    "subtitle": "两园的错位在不同位置，剪刀却总同时剪两边。让两边分别对齐。",
    "tag": "两边各自借位，在同一刻归席。",
    "hints": [
      "左右转动可以独立安排，剪刀使用时要同时照顾两边。",
      "把两园需要交换的边分别送到上方，一起处理，再分别归还。"
    ],
    "discovery": "两边各自借位，在同一刻归席。",
    "math": "两个独立四循环与同步相邻双换位生成 S₄×S₄，阶 576。目标可通过分别对齐、共同换位、分别归还实现。",
    "intent": "两园的错位在不同位置，剪刀却总同时剪两边。让两边分别对齐。",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "initial": [
      0,
      1,
      3,
      2,
      4,
      6,
      5,
      7
    ],
    "number": 80,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": -1
      },
      {
        "op": "cut",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": 1
      }
    ],
    "shortest": 7,
    "group_order": 576,
    "diameter": 9
  },
  {
    "id": "five_stars_far_point",
    "title": "五星借远点",
    "chapter": "第九间 · 织星",
    "scene": "projective_post",
    "points": [
      [
        440.0,
        96.0
      ],
      [
        572.197,
        192.047
      ],
      [
        521.702,
        347.453
      ],
      [
        358.298,
        347.453
      ],
      [
        307.803,
        192.047
      ],
      [
        225,
        235
      ]
    ],
    "ops": [
      {
        "id": "orbit",
        "title": "星轮前行",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            440,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "far",
        "title": "穿过远点",
        "caption": "侧边远点与星轮一起按弧线换位",
        "cycles": [
          [
            0,
            5
          ],
          [
            1,
            4
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 6)(2 5)"
      }
    ],
    "group": "A₅",
    "subtitle": "远点与星轮牵着两条桥。把整组换位借到另一段星路上。",
    "tag": "远点留下的路，也能沿星轮搬走。",
    "hints": [
      "先留意远点把手交换哪两对，又留下哪两枚。",
      "转过两站，借用远点，再把星轮原路送回。"
    ],
    "discovery": "远点留下的路，也能沿星轮搬走。",
    "math": "六个位置标记射影直线 F₅∪{∞}。x↦x+1 与 x↦−1/x 生成 PSL(2,5)≅A₅；这是 A₅ 的六点作用。",
    "intent": "远点与星轮牵着两条桥。把整组换位借到另一段星路上。",
    "fieldPrime": 5,
    "haloCenter": [
      440,
      235
    ],
    "haloRadius": 139,
    "number": 81,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "initial": [
      0,
      1,
      4,
      5,
      2,
      3
    ],
    "certificate": [
      {
        "op": "orbit",
        "direction": 1
      },
      {
        "op": "orbit",
        "direction": 1
      },
      {
        "op": "far",
        "direction": 1
      },
      {
        "op": "orbit",
        "direction": -1
      },
      {
        "op": "orbit",
        "direction": -1
      }
    ],
    "shortest": 5,
    "group_order": 60,
    "diameter": 9
  },
  {
    "id": "far_point_new_measure",
    "title": "远点换尺",
    "chapter": "第九间 · 织星",
    "scene": "projective_post",
    "points": [
      [
        440.0,
        96.0
      ],
      [
        572.197,
        192.047
      ],
      [
        521.702,
        347.453
      ],
      [
        358.298,
        347.453
      ],
      [
        307.803,
        192.047
      ],
      [
        225,
        235
      ]
    ],
    "ops": [
      {
        "id": "orbit",
        "title": "星轮前行",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            440,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "far",
        "title": "穿过远点",
        "caption": "侧边远点与星轮一起按弧线换位",
        "cycles": [
          [
            0,
            5
          ],
          [
            1,
            4
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 6)(2 5)"
      },
      {
        "id": "measure",
        "title": "换一把星尺",
        "caption": "远点与零星留下，其余四枚重新轮换",
        "cycles": [
          [
            1,
            2,
            4,
            3
          ]
        ],
        "motion": "curve",
        "order": 4,
        "notation": "(2 3 5 4)"
      }
    ],
    "group": "S₅",
    "subtitle": "新星尺只留下两处不动。先借一格星轮，让它接住另一枚外星。",
    "tag": "尺子留下谁，也可以临时改变。",
    "hints": [
      "星轮能改变哪一枚外星停在尺子的起点。",
      "先让星轮走一站，换尺，再把星轮原路归还。"
    ],
    "discovery": "尺子留下谁，也可以临时改变。",
    "math": "加入 x↦2x 后生成 PGL(2,5)≅S₅，阶 120，仍作用在六个位置上。",
    "intent": "新星尺只留下两处不动。先借一格星轮，让它接住另一枚外星。",
    "fieldPrime": 5,
    "haloCenter": [
      440,
      235
    ],
    "haloRadius": 139,
    "number": 82,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "initial": [
      2,
      0,
      3,
      1,
      4,
      5
    ],
    "certificate": [
      {
        "op": "orbit",
        "direction": -1
      },
      {
        "op": "measure",
        "direction": -1
      }
    ],
    "shortest": 2,
    "group_order": 120,
    "diameter": 5
  },
  {
    "id": "seven_stars_far_voyage",
    "title": "七星远航",
    "chapter": "第九间 · 同一张星图",
    "scene": "projective_post",
    "points": [
      [
        440.0,
        96.0
      ],
      [
        548.675,
        148.335
      ],
      [
        575.515,
        265.93
      ],
      [
        500.31,
        360.235
      ],
      [
        379.69,
        360.235
      ],
      [
        304.485,
        265.93
      ],
      [
        331.325,
        148.335
      ],
      [
        225,
        235
      ]
    ],
    "ops": [
      {
        "id": "orbit",
        "title": "星轮前行",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "orbit",
        "order": 7,
        "centers": [
          [
            440,
            235
          ]
        ],
        "angles": [
          0.8975979010256552
        ],
        "notation": "(1 2 3 4 5 6 7)"
      },
      {
        "id": "far",
        "title": "穿过远点",
        "caption": "侧边远点与星轮一起按弧线换位",
        "cycles": [
          [
            0,
            7
          ],
          [
            1,
            6
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 8)(2 7)(3 4)(5 6)"
      }
    ],
    "group": "PSL(2,7)",
    "subtitle": "四座桥会一起动。把星轮与远点交替借来，接起两条三站路线。",
    "tag": "星轮借过远点，织出另一种轮换。",
    "hints": [
      "目标只轮换六枚，另外两枚需要最后留下。",
      "远点会改变星轮的落脚方式，尝试把短转动夹在两次远点之间。"
    ],
    "discovery": "星轮借过远点，织出另一种轮换。",
    "math": "射影直线 F₇∪{∞} 上，平移与负倒数生成 PSL(2,7)≅GL(3,2)，阶 168。与七星织网同构，但这里作用在八个位置上。",
    "intent": "四座桥会一起动。把星轮与远点交替借来，接起两条三站路线。",
    "pair": "voyage_second_measure",
    "fieldPrime": 7,
    "haloCenter": [
      440,
      235
    ],
    "haloRadius": 139,
    "initial": [
      0,
      1,
      6,
      5,
      3,
      4,
      7,
      2
    ],
    "number": 83,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "orbit",
        "direction": -1
      },
      {
        "op": "orbit",
        "direction": -1
      },
      {
        "op": "far",
        "direction": 1
      },
      {
        "op": "orbit",
        "direction": 1
      },
      {
        "op": "orbit",
        "direction": 1
      },
      {
        "op": "far",
        "direction": 1
      },
      {
        "op": "orbit",
        "direction": -1
      }
    ],
    "shortest": 7,
    "group_order": 168,
    "diameter": 10
  },
  {
    "id": "voyage_second_measure",
    "title": "远航的另一把尺",
    "chapter": "第九间 · 同一张星图",
    "scene": "projective_post",
    "points": [
      [
        440.0,
        96.0
      ],
      [
        548.675,
        148.335
      ],
      [
        575.515,
        265.93
      ],
      [
        500.31,
        360.235
      ],
      [
        379.69,
        360.235
      ],
      [
        304.485,
        265.93
      ],
      [
        331.325,
        148.335
      ],
      [
        225,
        235
      ]
    ],
    "ops": [
      {
        "id": "orbit",
        "title": "星轮前行",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        ],
        "motion": "orbit",
        "order": 7,
        "centers": [
          [
            440,
            235
          ]
        ],
        "angles": [
          0.8975979010256552
        ],
        "notation": "(1 2 3 4 5 6 7)"
      },
      {
        "id": "far",
        "title": "穿过远点",
        "caption": "侧边远点与星轮一起按弧线换位",
        "cycles": [
          [
            0,
            7
          ],
          [
            1,
            6
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 8)(2 7)(3 4)(5 6)"
      },
      {
        "id": "measure",
        "title": "星尺双行",
        "caption": "远点与零星留下，其余六枚分两路轮换",
        "cycles": [
          [
            1,
            2,
            4
          ],
          [
            3,
            6,
            5
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(2 3 5)(4 7 6)"
      }
    ],
    "group": "PSL(2,7)",
    "subtitle": "还是同一张星图。多出的一把尺，恰好能织出想要的两路轮换。",
    "tag": "合适的尺，把长路折成短路。",
    "hints": [
      "这把尺本来就沿两条三站路线走。",
      "先借远点，再借星轮一站；换尺后把借来的两段位置依次归还。"
    ],
    "discovery": "合适的尺，把长路折成短路。",
    "math": "2 是模 7 的平方数，x↦2x 已在 PSL(2,7) 中。新增生成元不改变群、初态或目标，只改变最短操作距离。",
    "intent": "还是同一张星图。多出的一把尺，恰好能织出想要的两路轮换。",
    "pair": "seven_stars_far_voyage",
    "fieldPrime": 7,
    "haloCenter": [
      440,
      235
    ],
    "haloRadius": 139,
    "initial": [
      0,
      1,
      6,
      5,
      3,
      4,
      7,
      2
    ],
    "number": 84,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "orbit",
        "direction": 1
      },
      {
        "op": "far",
        "direction": 1
      },
      {
        "op": "orbit",
        "direction": 1
      },
      {
        "op": "measure",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 168,
    "diameter": 6
  },
  {
    "id": "eight_star_palindrome",
    "title": "八星回文",
    "chapter": "第九间 · 星路的另一种回声",
    "scene": "semilinear_halo",
    "points": [
      [
        400,
        235
      ],
      [
        400.0,
        87.0
      ],
      [
        515.711,
        142.724
      ],
      [
        464.215,
        368.343
      ],
      [
        544.289,
        267.933
      ],
      [
        284.289,
        142.724
      ],
      [
        335.785,
        368.343
      ],
      [
        255.711,
        267.933
      ]
    ],
    "ops": [
      {
        "id": "ring",
        "title": "绕行七星",
        "caption": "中央留下，外侧七枚顺转一格",
        "cycles": [
          [
            1,
            2,
            4,
            3,
            6,
            7,
            5
          ]
        ],
        "motion": "orbit",
        "order": 7,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.8975979010256552
        ],
        "notation": "(2 3 5 4 7 8 6)"
      },
      {
        "id": "bridges",
        "title": "四座星桥",
        "caption": "中央与外侧三对颜色一起交换",
        "cycles": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)(3 4)(5 6)(7 8)"
      },
      {
        "id": "echo",
        "title": "星路回文",
        "caption": "两枚留下，其余六枚分两路轮换",
        "cycles": [
          [
            2,
            4,
            6
          ],
          [
            3,
            5,
            7
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(3 5 7)(4 6 8)"
      }
    ],
    "group": "AΓL(1,8)",
    "subtitle": "新的回文路线留下两枚星。用星桥借来另一对，再让回文经过。",
    "tag": "星桥换起点，回文便照顾另一片天。",
    "hints": [
      "回文的两条三站路线会留下中心与一枚外星。",
      "先用星桥与转轮借出这两个位置，回文经过后，再把借位收回来。"
    ],
    "discovery": "星桥换起点，回文便照顾另一片天。",
    "math": "在 F₈ 上加入 Frobenius 映射 x↦x²，得到 AΓL(1,8)，阶 8×7×3=168。它与前两关的 168 阶群不同。",
    "intent": "新的回文路线留下两枚星。用星桥借来另一对，再让回文经过。",
    "haloCenter": [
      400,
      235
    ],
    "haloRadius": 148,
    "number": 85,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      2,
      1,
      3,
      0,
      4,
      7,
      5,
      6
    ],
    "certificate": [
      {
        "op": "bridges",
        "direction": 1
      },
      {
        "op": "ring",
        "direction": -1
      },
      {
        "op": "bridges",
        "direction": 1
      },
      {
        "op": "echo",
        "direction": -1
      }
    ],
    "shortest": 4,
    "group_order": 168,
    "diameter": 5
  },
  {
    "id": "seven_star_three_shears",
    "title": "七星三道线",
    "chapter": "第九间 · 借一条中间线",
    "scene": "fano",
    "points": [
      [
        400,
        75
      ],
      [
        538.564,
        315
      ],
      [
        469.282,
        195
      ],
      [
        261.436,
        315
      ],
      [
        330.718,
        195
      ],
      [
        400,
        315
      ],
      [
        400,
        235
      ]
    ],
    "ops": [
      {
        "id": "first",
        "title": "第一道拨线",
        "caption": "第一位跟随第二位翻转",
        "cycles": [
          [
            1,
            2
          ],
          [
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(2 3)(6 7)"
      },
      {
        "id": "second",
        "title": "第二道拨线",
        "caption": "第二位跟随第三位翻转",
        "cycles": [
          [
            3,
            5
          ],
          [
            4,
            6
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(4 6)(5 7)"
      },
      {
        "id": "third",
        "title": "第三道拨线",
        "caption": "第三位跟随第一位翻转",
        "cycles": [
          [
            0,
            4
          ],
          [
            2,
            6
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 5)(3 7)"
      }
    ],
    "group": "GL(3,2)",
    "subtitle": "想拨的那条线没有把手。借两条现成的线，再把多余的变化收回来。",
    "tag": "借来的中间线，最后没有留下痕迹。",
    "hints": [
      "两条拨线的先后顺序会影响结果。",
      "两条线各拨一次，再按相同次序各拨一次，观察留下哪一小片变化。"
    ],
    "discovery": "借来的中间线，最后没有留下痕迹。",
    "math": "三个位坐标的循环初等剪切生成 GL(3,2)。[T₁₂,T₂₃] 给出缺少的 T₁₃，Fano 线关联始终保持。",
    "intent": "想拨的那条线没有把手。借两条现成的线，再把多余的变化收回来。",
    "lines": [
      [
        0,
        1,
        2
      ],
      [
        0,
        3,
        4
      ],
      [
        1,
        3,
        5
      ],
      [
        0,
        5,
        6
      ],
      [
        1,
        4,
        6
      ],
      [
        2,
        3,
        6
      ],
      [
        2,
        4,
        5
      ]
    ],
    "initial": [
      0,
      1,
      2,
      4,
      3,
      6,
      5
    ],
    "number": 86,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "first",
        "direction": 1
      },
      {
        "op": "second",
        "direction": 1
      },
      {
        "op": "first",
        "direction": 1
      },
      {
        "op": "second",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 168,
    "diameter": 8
  },
  {
    "id": "diagonal_mirror_window",
    "title": "斜镜转窗",
    "chapter": "第九间 · 旧窗的新把手",
    "scene": "diagonal_window",
    "points": [
      [
        270,
        105
      ],
      [
        400,
        105
      ],
      [
        530,
        105
      ],
      [
        530,
        235
      ],
      [
        530,
        365
      ],
      [
        400,
        365
      ],
      [
        270,
        365
      ],
      [
        270,
        235
      ]
    ],
    "ops": [
      {
        "id": "diagonal",
        "title": "斜向照镜",
        "caption": "沿左上到右下的对角线交换位置",
        "cycles": [
          [
            1,
            7
          ],
          [
            2,
            6
          ],
          [
            3,
            5
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(2 8)(3 7)(4 6)"
      },
      {
        "id": "wind",
        "title": "横向的风",
        "caption": "上排向左，下排向右，越过窗沿绕回",
        "cycles": [
          [
            0,
            2,
            1
          ],
          [
            4,
            6,
            5
          ]
        ],
        "motion": "shear",
        "order": 3,
        "axis": "x",
        "spacing": 130,
        "pivot": [
          400,
          235
        ],
        "notation": "(1 3 2)(5 7 6)"
      }
    ],
    "group": "GL(2,3)",
    "subtitle": "熟悉的窗又换了把手。借斜镜，把横风送去另一个方向。",
    "tag": "借一面斜镜，风就有了新的方向。",
    "hints": [
      "斜镜会交换横向和纵向的位置。",
      "斜镜、横风、斜镜，可以拼出没有直接提供的纵风。"
    ],
    "discovery": "借一面斜镜，风就有了新的方向。",
    "math": "坐标交换与横向剪切仍生成 GL(2,3)。本关与第 36 关初态、目标相同，生成元改为两枚。",
    "intent": "熟悉的窗又换了把手。借斜镜，把横风送去另一个方向。",
    "gridVectors": [
      [
        -1,
        -1
      ],
      [
        0,
        -1
      ],
      [
        1,
        -1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ],
      [
        0,
        1
      ],
      [
        -1,
        1
      ],
      [
        -1,
        0
      ]
    ],
    "pair": "mirror_window_return",
    "initial": [
      4,
      1,
      7,
      6,
      0,
      5,
      3,
      2
    ],
    "number": 87,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "wind",
        "direction": 1
      },
      {
        "op": "diagonal",
        "direction": 1
      },
      {
        "op": "wind",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 48,
    "diameter": 8
  },
  {
    "id": "two_handles_star_cube",
    "title": "两把手的星格",
    "chapter": "第九间 · 一扇门的两次脚步",
    "scene": "cube_shear",
    "points": [
      [
        240,
        181
      ],
      [
        464,
        181
      ],
      [
        240,
        353
      ],
      [
        464,
        353
      ],
      [
        336,
        117
      ],
      [
        560,
        117
      ],
      [
        336,
        289
      ],
      [
        560,
        289
      ]
    ],
    "ops": [
      {
        "id": "sky",
        "title": "转动星格",
        "caption": "绕斜轴转过三分之一圈，两角留下",
        "cycles": [
          [
            1,
            2,
            4
          ],
          [
            3,
            6,
            5
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axisVector": [
          1,
          1,
          1
        ],
        "angle": 2.0943951023931953,
        "notation": "(2 3 5)(4 7 6)"
      },
      {
        "id": "gate",
        "title": "折门带一层",
        "caption": "左右受下半边控制，再把上下整层交换",
        "cycles": [
          [
            0,
            2,
            1,
            3
          ],
          [
            4,
            6,
            5,
            7
          ]
        ],
        "motion": "curve",
        "order": 4,
        "notation": "(1 3 2 4)(5 7 6 8)"
      }
    ],
    "group": "AGL(3,2)",
    "subtitle": "折门一次会带走半边，两次却能只留下一个完整方向。借来上半边的工具。",
    "tag": "同一扇门走两次，出现另一枚工具。",
    "hints": [
      "连续使用两次折门，先看看它合成哪一种整体换位。",
      "借转向把整体换位搬到需要的方向，再配合折门的局部影响。"
    ],
    "discovery": "同一扇门走两次，出现另一枚工具。",
    "math": "仿射门 (x,y,z)↦(x+y,y+1,z) 的平方为 x 方向平移。配合坐标轮换生成 AGL(3,2)，阶 1344。",
    "intent": "折门一次会带走半边，两次却能只留下一个完整方向。借来上半边的工具。",
    "vertices": [
      [
        -1,
        -1,
        -1
      ],
      [
        1,
        -1,
        -1
      ],
      [
        -1,
        1,
        -1
      ],
      [
        1,
        1,
        -1
      ],
      [
        -1,
        -1,
        1
      ],
      [
        1,
        -1,
        1
      ],
      [
        -1,
        1,
        1
      ],
      [
        1,
        1,
        1
      ]
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        4
      ],
      [
        1,
        3
      ],
      [
        1,
        5
      ],
      [
        2,
        3
      ],
      [
        2,
        6
      ],
      [
        3,
        7
      ],
      [
        4,
        5
      ],
      [
        4,
        6
      ],
      [
        5,
        7
      ],
      [
        6,
        7
      ]
    ],
    "faces": [
      [
        0,
        1,
        3,
        2
      ],
      [
        4,
        5,
        7,
        6
      ],
      [
        0,
        1,
        5,
        4
      ]
    ],
    "initial": [
      1,
      0,
      2,
      3,
      5,
      4,
      6,
      7
    ],
    "number": 88,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "sky",
        "direction": -1
      },
      {
        "op": "gate",
        "direction": 1
      },
      {
        "op": "gate",
        "direction": 1
      },
      {
        "op": "sky",
        "direction": 1
      },
      {
        "op": "gate",
        "direction": 1
      }
    ],
    "shortest": 5,
    "group_order": 1344,
    "diameter": 12
  },
  {
    "id": "one_gate_in_sky",
    "title": "星格开一扇门",
    "chapter": "第九间 · 八星之中的两枚",
    "scene": "cube_shear",
    "points": [
      [
        240,
        181
      ],
      [
        464,
        181
      ],
      [
        240,
        353
      ],
      [
        464,
        353
      ],
      [
        336,
        117
      ],
      [
        560,
        117
      ],
      [
        336,
        289
      ],
      [
        560,
        289
      ]
    ],
    "ops": [
      {
        "id": "sky",
        "title": "转动星格",
        "caption": "绕斜轴转过三分之一圈，两角留下",
        "cycles": [
          [
            1,
            2,
            4
          ],
          [
            3,
            6,
            5
          ]
        ],
        "motion": "spatial",
        "order": 3,
        "axisVector": [
          1,
          1,
          1
        ],
        "angle": 2.0943951023931953,
        "notation": "(2 3 5)(4 7 6)"
      },
      {
        "id": "gate",
        "title": "折门带一层",
        "caption": "左右受下半边控制，再把上下整层交换",
        "cycles": [
          [
            0,
            2,
            1,
            3
          ],
          [
            4,
            6,
            5,
            7
          ]
        ],
        "motion": "curve",
        "order": 4,
        "notation": "(1 3 2 4)(5 7 6 8)"
      },
      {
        "id": "single",
        "title": "一扇小门",
        "caption": "只交换右下方深处的一对",
        "cycles": [
          [
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(7 8)"
      }
    ],
    "group": "S₈",
    "subtitle": "小门只接住一个角落，错位却在相反的角落。把那一小对借过来。",
    "tag": "一扇小门，也能借到另一角。",
    "hints": [
      "两把旧工具可以重新安排整片星空的方向。",
      "先把目标边送到小门，交换之后，按相反次序把星格送回。"
    ],
    "discovery": "一扇小门，也能借到另一角。",
    "math": "在 AGL(3,2) 中加入单换位后生成 S₈。全局仿射工具与局部单门配合，可只改变所需的一对位置。",
    "intent": "小门只接住一个角落，错位却在相反的角落。把那一小对借过来。",
    "vertices": [
      [
        -1,
        -1,
        -1
      ],
      [
        1,
        -1,
        -1
      ],
      [
        -1,
        1,
        -1
      ],
      [
        1,
        1,
        -1
      ],
      [
        -1,
        -1,
        1
      ],
      [
        1,
        -1,
        1
      ],
      [
        -1,
        1,
        1
      ],
      [
        1,
        1,
        1
      ]
    ],
    "edges": [
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        4
      ],
      [
        1,
        3
      ],
      [
        1,
        5
      ],
      [
        2,
        3
      ],
      [
        2,
        6
      ],
      [
        3,
        7
      ],
      [
        4,
        5
      ],
      [
        4,
        6
      ],
      [
        5,
        7
      ],
      [
        6,
        7
      ]
    ],
    "faces": [
      [
        0,
        1,
        3,
        2
      ],
      [
        4,
        5,
        7,
        6
      ],
      [
        0,
        1,
        5,
        4
      ]
    ],
    "gateFace": [
      2,
      3,
      7,
      6
    ],
    "initial": [
      1,
      0,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "number": 89,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "sky",
        "direction": -1
      },
      {
        "op": "gate",
        "direction": 1
      },
      {
        "op": "gate",
        "direction": 1
      },
      {
        "op": "sky",
        "direction": 1
      },
      {
        "op": "single",
        "direction": 1
      },
      {
        "op": "gate",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 40320,
    "diameter": 12
  },
  {
    "id": "double_star_knot",
    "title": "双星交织",
    "chapter": "第九间 · 两枚相接的星",
    "scene": "hinged_stars",
    "points": [
      [
        392.79,
        157.412
      ],
      [
        392.79,
        312.588
      ],
      [
        245.21,
        360.539
      ],
      [
        154.0,
        235.0
      ],
      [
        245.21,
        109.461
      ],
      [
        540.371,
        109.461
      ],
      [
        631.58,
        235.0
      ],
      [
        540.371,
        360.539
      ]
    ],
    "ops": [
      {
        "id": "left",
        "title": "左星轮转",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            286,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "right",
        "title": "右星轮转",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            5,
            6,
            7,
            1
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            499.5804865149861,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 6 7 8 2)"
      }
    ],
    "group": "A₈",
    "subtitle": "两颗五星轮共用两枚颜色。让两阵风经过，再收回多余的脚步。",
    "tag": "两处交接，织成一小段星结。",
    "hints": [
      "两处交接点会使来回转动留下局部变化。",
      "试着把一段交接动作搬到另一边，再接回原来的星轮。"
    ],
    "discovery": "两处交接，织成一小段星结。",
    "math": "两个共享两点的五循环生成 A₈。每次转动都是偶置换，适当组合可只在交接附近留下变化。",
    "intent": "两颗五星轮共用两枚颜色。让两阵风经过，再收回多余的脚步。",
    "starWheels": [
      {
        "center": [
          286,
          235
        ],
        "radius": 132,
        "cycle": [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "center": [
          499.5804865149861,
          235
        ],
        "radius": 132,
        "cycle": [
          0,
          5,
          6,
          7,
          1
        ]
      }
    ],
    "number": 90,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      3,
      4,
      2,
      0,
      1,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "left",
        "direction": 1
      },
      {
        "op": "right",
        "direction": -1
      },
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "right",
        "direction": 1
      },
      {
        "op": "left",
        "direction": -1
      },
      {
        "op": "right",
        "direction": -1
      }
    ],
    "shortest": 8,
    "group_order": 20160,
    "diameter": 13
  },
  {
    "id": "circular_letter_route",
    "title": "环路寄信",
    "chapter": "第十间 · 归一",
    "scene": "letter_ring",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        543.61,
        188.338
      ],
      [
        488.756,
        357.162
      ],
      [
        311.244,
        357.162
      ],
      [
        256.39,
        188.338
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "绕环前行",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "orbit",
        "order": 5,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          1.2566370614359172
        ],
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "bridge",
        "title": "站口小桥",
        "caption": "只交换开头相邻两枚",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "group": "S₅",
    "subtitle": "三封信要依次换一个收件处，另外两封最后仍要留下。",
    "tag": "两次小交换，接起三封信。",
    "hints": [
      "三枚轮换可以拆成两次共享一个位置的交换。",
      "让小桥依次接住两对需要交接的信，过程中可以顺路借位。"
    ],
    "discovery": "两次小交换，接起三封信。",
    "math": "五循环与相邻换位生成 S₅。本关目标为不经过位置 1 的三循环。",
    "intent": "三封信要依次换一个收件处，另外两封最后仍要留下。",
    "pair": "four_route_post",
    "initial": [
      0,
      3,
      1,
      2,
      4
    ],
    "number": 91,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "certificate": [
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": -1
      },
      {
        "op": "turn",
        "direction": -1
      }
    ],
    "shortest": 5,
    "group_order": 120,
    "diameter": 10
  },
  {
    "id": "four_route_post",
    "title": "四路邮亭",
    "chapter": "第十间 · 同一袋信",
    "scene": "post_hub",
    "points": [
      [
        400,
        235
      ],
      [
        400,
        87
      ],
      [
        552,
        235
      ],
      [
        400,
        383
      ],
      [
        248,
        235
      ]
    ],
    "ops": [
      {
        "id": "north",
        "title": "北边邮路",
        "caption": "中央与这一方向交换",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      },
      {
        "id": "east",
        "title": "东边邮路",
        "caption": "中央与这一方向交换",
        "cycles": [
          [
            0,
            2
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 3)"
      },
      {
        "id": "south",
        "title": "南边邮路",
        "caption": "中央与这一方向交换",
        "cycles": [
          [
            0,
            3
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 4)"
      },
      {
        "id": "west",
        "title": "西边邮路",
        "caption": "中央与这一方向交换",
        "cycles": [
          [
            0,
            4
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 5)"
      }
    ],
    "group": "S₅",
    "subtitle": "还是那三封信。这次借邮亭暂存一封，把交接连成一段。",
    "tag": "一处暂存，接起四条邮路。",
    "hints": [
      "中央颜色可以先寄存到一侧，最后再回来。",
      "沿三个收件处走一遍，再回到开始的那条邮路。"
    ],
    "discovery": "一处暂存，接起四条邮路。",
    "math": "四个星形换位生成 S₅，与第 91 关初态、目标相同。外侧三循环可以用四次中央换位完成。",
    "intent": "还是那三封信。这次借邮亭暂存一封，把交接连成一段。",
    "pair": "circular_letter_route",
    "initial": [
      0,
      3,
      1,
      2,
      4
    ],
    "number": 92,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4
    ],
    "certificate": [
      {
        "op": "north",
        "direction": 1
      },
      {
        "op": "south",
        "direction": 1
      },
      {
        "op": "east",
        "direction": 1
      },
      {
        "op": "north",
        "direction": 1
      }
    ],
    "shortest": 4,
    "group_order": 120,
    "diameter": 6
  },
  {
    "id": "two_three_leaf_letters",
    "title": "两张三叶笺",
    "chapter": "第十间 · 同一行笔迹",
    "scene": "petal_pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "la",
        "title": "左页上叶",
        "caption": "左页前三角轮换",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "lb",
        "title": "左页下叶",
        "caption": "左页后三角轮换",
        "cycles": [
          [
            1,
            2,
            3
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(2 3 4)"
      },
      {
        "id": "ra",
        "title": "右页上叶",
        "caption": "右页前三角轮换",
        "cycles": [
          [
            4,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(5 6 7)"
      },
      {
        "id": "rb",
        "title": "右页下叶",
        "caption": "右页后三角轮换",
        "cycles": [
          [
            5,
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(6 7 8)"
      }
    ],
    "group": "A₄ × A₄",
    "subtitle": "两张笺都要交换两对颜色。先把一张写好，再照顾另一张。",
    "tag": "一张笺上的发现，能写到另一张。",
    "hints": [
      "每张笺都有两枚三叶把手，可先单独摸清一边。",
      "一边找到的短动作，可以原样交给另一边使用。"
    ],
    "discovery": "一张笺上的发现，能写到另一张。",
    "math": "每页两个相交三循环生成 A₄，两页独立，整体 A₄×A₄，阶 144。",
    "intent": "两张笺都要交换两对颜色。先把一张写好，再照顾另一张。",
    "pair": "joined_three_leaf_letters",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "initial": [
      3,
      2,
      1,
      0,
      7,
      6,
      5,
      4
    ],
    "number": 93,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "la",
        "direction": 1
      },
      {
        "op": "lb",
        "direction": -1
      },
      {
        "op": "la",
        "direction": 1
      },
      {
        "op": "ra",
        "direction": 1
      },
      {
        "op": "rb",
        "direction": -1
      },
      {
        "op": "ra",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 144,
    "diameter": 6
  },
  {
    "id": "joined_three_leaf_letters",
    "title": "连笔三叶笺",
    "chapter": "第十间 · 同一行笔迹",
    "scene": "petal_pages",
    "points": [
      [
        165,
        160
      ],
      [
        315,
        160
      ],
      [
        315,
        310
      ],
      [
        165,
        310
      ],
      [
        485,
        160
      ],
      [
        635,
        160
      ],
      [
        635,
        310
      ],
      [
        485,
        310
      ]
    ],
    "ops": [
      {
        "id": "upper",
        "title": "两页上叶",
        "caption": "两页前三角同时轮换",
        "cycles": [
          [
            0,
            1,
            2
          ],
          [
            4,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)(5 6 7)"
      },
      {
        "id": "lower",
        "title": "两页下叶",
        "caption": "两页后三角同时轮换",
        "cycles": [
          [
            1,
            2,
            3
          ],
          [
            5,
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(2 3 4)(6 7 8)"
      }
    ],
    "group": "A₄",
    "subtitle": "同样的两张笺，现在可以连笔写。让同一段动作同时照顾两页。",
    "tag": "一段发现，两张笺同时归位。",
    "hints": [
      "两边的错位完全对应，可以同步使用上一关的一段短动作。",
      "两页共用把手，每次都留下同样的笔迹。"
    ],
    "discovery": "一段发现，两张笺同时归位。",
    "math": "两套同步三循环生成对角 A₄，阶 12。它是上一关 A₄×A₄ 的子群，同一目标可由六步缩为三步。",
    "intent": "同样的两张笺，现在可以连笔写。让同一段动作同时照顾两页。",
    "pair": "two_three_leaf_letters",
    "pairNote": "初态和目标相同。这次两页只能同步动作，生成对角 A₄；一段笔迹恰好可同时写完两页。",
    "panels": [
      [
        0,
        1,
        2,
        3
      ],
      [
        4,
        5,
        6,
        7
      ]
    ],
    "initial": [
      3,
      2,
      1,
      0,
      7,
      6,
      5,
      4
    ],
    "number": 94,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "upper",
        "direction": 1
      },
      {
        "op": "lower",
        "direction": -1
      },
      {
        "op": "upper",
        "direction": 1
      }
    ],
    "shortest": 3,
    "group_order": 12,
    "diameter": 3
  },
  {
    "id": "four_room_return_song",
    "title": "四室折返曲",
    "chapter": "第十间 · 换条路回来",
    "scene": "room_parade",
    "points": [
      [
        363.0,
        109.0
      ],
      [
        437.0,
        109.0
      ],
      [
        489.0,
        235.0
      ],
      [
        563.0,
        235.0
      ],
      [
        363.0,
        361.0
      ],
      [
        437.0,
        361.0
      ],
      [
        237.0,
        235.0
      ],
      [
        311.0,
        235.0
      ]
    ],
    "ops": [
      {
        "id": "tour",
        "title": "四室巡游",
        "caption": "四间小屋顺行一站，屋内朝向保留",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "carousel",
        "order": 4,
        "blocks": [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            6,
            7
          ]
        ],
        "centers": [
          [
            400.0,
            109.0
          ],
          [
            526.0,
            235.0
          ],
          [
            400.0,
            361.0
          ],
          [
            274.0,
            235.0
          ]
        ],
        "pivot": [
          400,
          235
        ],
        "angle": 1.5707963267948966,
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "mirror",
        "title": "园路照镜",
        "caption": "左右两间屋交换，上下两间留下",
        "cycles": [
          [
            2,
            6
          ],
          [
            3,
            7
          ]
        ],
        "motion": "mirror",
        "order": 2,
        "notation": "(3 7)(4 8)"
      },
      {
        "id": "bell",
        "title": "一屋换座",
        "caption": "只交换最上方屋里的两枚",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "group": "C₂ ≀ D₄",
    "subtitle": "房间的位置和屋内座位都变了。沿路修两间，再借镜面收好朝向。",
    "tag": "沿路归还座位，最后收好方向。",
    "hints": [
      "先区分整间屋的去向，与屋里一对颜色的次序。",
      "经过上方时顺手换座，园路镜面可以另行处理整体朝向。"
    ],
    "discovery": "沿路归还座位，最后收好方向。",
    "math": "房间可作 D₄ 对称，每间独立换座，群为 C₂≀D₄，阶 16×8=128。它与分层换位树的群同构，采用另一套生成元。",
    "intent": "房间的位置和屋内座位都变了。沿路修两间，再借镜面收好朝向。",
    "rooms": [
      [
        0,
        1
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        6,
        7
      ]
    ],
    "centers": [
      [
        400.0,
        109.0
      ],
      [
        526.0,
        235.0
      ],
      [
        400.0,
        361.0
      ],
      [
        274.0,
        235.0
      ]
    ],
    "number": 95,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "initial": [
      6,
      7,
      5,
      4,
      2,
      3,
      1,
      0
    ],
    "certificate": [
      {
        "op": "tour",
        "direction": -1
      },
      {
        "op": "mirror",
        "direction": 1
      },
      {
        "op": "bell",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "tour",
        "direction": 1
      },
      {
        "op": "bell",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 128,
    "diameter": 9
  },
  {
    "id": "seven_color_relay",
    "title": "七色传花",
    "chapter": "第十间 · 一口气的归途",
    "scene": "petal_chain",
    "points": [
      [
        169,
        310
      ],
      [
        246,
        160
      ],
      [
        323,
        310
      ],
      [
        400,
        160
      ],
      [
        477,
        310
      ],
      [
        554,
        160
      ],
      [
        631,
        310
      ]
    ],
    "ops": [
      {
        "id": "first",
        "title": "第一叶",
        "caption": "左侧三枚轮换",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "middle",
        "title": "中间叶",
        "caption": "中间三枚轮换",
        "cycles": [
          [
            2,
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(3 4 5)"
      },
      {
        "id": "last",
        "title": "最后叶",
        "caption": "右侧三枚轮换",
        "cycles": [
          [
            4,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(5 6 7)"
      }
    ],
    "group": "A₇",
    "subtitle": "每片叶子只接三枚。让交接顺着一条路，带动七种颜色。",
    "tag": "三个小交接，接起一整条七色路。",
    "hints": [
      "相邻叶子共用一个交接位置。",
      "顺着路线依次转动三片叶子，留意先后次序。"
    ],
    "discovery": "三个小交接，接起一整条七色路。",
    "math": "三个沿链相接的三循环生成 A₇，适当顺序的乘积为一个七循环。",
    "intent": "每片叶子只接三枚。让交接顺着一条路，带动七种颜色。",
    "pair": "seven_color_long_relay",
    "initial": [
      6,
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "number": 96,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "first",
        "direction": -1
      },
      {
        "op": "middle",
        "direction": -1
      },
      {
        "op": "last",
        "direction": -1
      }
    ],
    "shortest": 3,
    "group_order": 2520,
    "diameter": 11
  },
  {
    "id": "seven_color_long_relay",
    "title": "七色绕花",
    "chapter": "第十间 · 一口气的归途",
    "scene": "petal_chain",
    "points": [
      [
        169,
        310
      ],
      [
        246,
        160
      ],
      [
        323,
        310
      ],
      [
        400,
        160
      ],
      [
        477,
        310
      ],
      [
        554,
        160
      ],
      [
        631,
        310
      ]
    ],
    "ops": [
      {
        "id": "long",
        "title": "五色长叶",
        "caption": "左侧五枚依次轮换",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 5,
        "notation": "(1 2 3 4 5)"
      },
      {
        "id": "last",
        "title": "三色小叶",
        "caption": "右侧三枚依次轮换",
        "cycles": [
          [
            4,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(5 6 7)"
      }
    ],
    "group": "A₇",
    "subtitle": "同样的七色归途，前两段交接合成了一片长叶。",
    "tag": "把学会的一段路，收成一枚把手。",
    "hints": [
      "长叶一次接住五枚，小叶接住最后三枚。",
      "在共同的位置接一次力，就能走完上一关的整段路线。"
    ],
    "discovery": "把学会的一段路，收成一枚把手。",
    "math": "共享一点的五循环与三循环生成 A₇。与第 96 关同初态同目标，七循环由两次基本动作完成。",
    "intent": "同样的七色归途，前两段交接合成了一片长叶。",
    "pair": "seven_color_relay",
    "initial": [
      6,
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "number": 97,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "certificate": [
      {
        "op": "long",
        "direction": -1
      },
      {
        "op": "last",
        "direction": -1
      }
    ],
    "shortest": 2,
    "group_order": 2520,
    "diameter": 14
  },
  {
    "id": "eight_gate_journey",
    "title": "八门绕行",
    "chapter": "第十间 · 两封信顺路送",
    "scene": "eight_gate_ring",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "刻度走一格",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 8,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.7853981633974483
        ],
        "notation": "(1 2 3 4 5 6 7 8)"
      },
      {
        "id": "bridge",
        "title": "门边换位",
        "caption": "只交换顶部相邻两枚",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "group": "S₈",
    "subtitle": "两处相邻座位都想交换。沿同一趟环行顺路处理，最后回到原朝向。",
    "tag": "两封信，顺着同一趟环路送完。",
    "hints": [
      "可以分别借过去修两处，也可以把它们接在一次行程里。",
      "经过第一处换位后继续前行，处理第二处，再把总共借走的朝向收回来。"
    ],
    "discovery": "两封信，顺着同一趟环路送完。",
    "math": "八循环与相邻换位生成 S₈。目标为两个不相交换位，沿环路组织两次局部处理。",
    "intent": "两处相邻座位都想交换。沿同一趟环行顺路处理，最后回到原朝向。",
    "pair": "eight_gate_shortcut",
    "initial": [
      0,
      1,
      3,
      2,
      5,
      4,
      6,
      7
    ],
    "number": 98,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      },
      {
        "op": "turn",
        "direction": 1
      }
    ],
    "shortest": 10,
    "group_order": 40320,
    "diameter": 28
  },
  {
    "id": "eight_gate_shortcut",
    "title": "八门捷径",
    "chapter": "第十间 · 两封信顺路送",
    "scene": "eight_gate_ring",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "turn",
        "title": "刻度走一格",
        "caption": "这一圈的颜色前进1格",
        "cycles": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        ],
        "motion": "orbit",
        "order": 8,
        "centers": [
          [
            400,
            235
          ]
        ],
        "angles": [
          0.7853981633974483
        ],
        "notation": "(1 2 3 4 5 6 7 8)"
      },
      {
        "id": "double",
        "title": "跨过两门",
        "caption": "这一圈的颜色前进2格",
        "cycles": [
          [
            0,
            2,
            4,
            6
          ],
          [
            1,
            3,
            5,
            7
          ]
        ],
        "motion": "orbit",
        "order": 4,
        "centers": [
          [
            400,
            235
          ],
          [
            400,
            235
          ]
        ],
        "angles": [
          1.5707963267948966,
          1.5707963267948966
        ],
        "notation": "(1 3 5 7)(2 4 6 8)"
      },
      {
        "id": "bridge",
        "title": "门边换位",
        "caption": "只交换顶部相邻两枚",
        "cycles": [
          [
            0,
            1
          ]
        ],
        "motion": "curve",
        "order": 2,
        "notation": "(1 2)"
      }
    ],
    "group": "S₈",
    "subtitle": "还是同一趟环行。这次把两格路收成一枚把手，走得更轻快些。",
    "tag": "走过的长路，终于有了自己的捷径。",
    "hints": [
      "新增把手只是原来转轮的两次拨动，可达范围没有改变。",
      "两处站点都能用两格路对齐，再把这一趟借位一起归还。"
    ],
    "discovery": "走过的长路，终于有了自己的捷径。",
    "math": "加入 r² 不改变 S₈，但改变生成元度量。第 98、99 关保留相同初态、目标与位置。",
    "intent": "还是同一趟环行。这次把两格路收成一枚把手，走得更轻快些。",
    "pair": "eight_gate_journey",
    "initial": [
      0,
      1,
      3,
      2,
      5,
      4,
      6,
      7
    ],
    "number": 99,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "double",
        "direction": 1
      },
      {
        "op": "double",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "double",
        "direction": 1
      },
      {
        "op": "bridge",
        "direction": 1
      },
      {
        "op": "double",
        "direction": 1
      }
    ],
    "shortest": 6,
    "group_order": 40320,
    "diameter": 25
  },
  {
    "id": "hundredth_homecoming",
    "title": "百件归一",
    "chapter": "第十间 · 将一路巧思收好",
    "scene": "century_flower",
    "points": [
      [
        400.0,
        84.0
      ],
      [
        506.773,
        128.227
      ],
      [
        551.0,
        235.0
      ],
      [
        506.773,
        341.773
      ],
      [
        400.0,
        386.0
      ],
      [
        293.227,
        341.773
      ],
      [
        249.0,
        235.0
      ],
      [
        293.227,
        128.227
      ]
    ],
    "ops": [
      {
        "id": "dawn",
        "title": "晨光叶",
        "caption": "上方三枚依次轮换",
        "cycles": [
          [
            0,
            1,
            2
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(1 2 3)"
      },
      {
        "id": "noon",
        "title": "午风叶",
        "caption": "右下三枚依次轮换",
        "cycles": [
          [
            2,
            3,
            4
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(3 4 5)"
      },
      {
        "id": "dusk",
        "title": "暮色叶",
        "caption": "下方与左侧三枚依次轮换",
        "cycles": [
          [
            4,
            5,
            6
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(5 6 7)"
      },
      {
        "id": "night",
        "title": "星夜叶",
        "caption": "左上两枚与右上交接点轮换",
        "cycles": [
          [
            1,
            6,
            7
          ]
        ],
        "motion": "curve",
        "order": 3,
        "notation": "(2 7 8)"
      }
    ],
    "group": "A₈",
    "subtitle": "四片叶子牵着八种颜色。借过的位置、接过的路，这一次都收好。",
    "tag": "一百件机关，一路借来的巧思。",
    "hints": [
      "每片叶子都有只能由它接住的位置，四枚把手都需要参与。",
      "先选一枚颜色的归途，把相邻叶子的交接写成短动作，再让其他颜色沿路接上。"
    ],
    "discovery": "一百件机关，一路借来的巧思。",
    "math": "四个相接三循环生成 A₈。目标是四个不相交换位，仍是偶置换；每枚把手都有必须移动的专属位置，任何解都要使用四枚。",
    "intent": "四片叶子牵着八种颜色。借过的位置、接过的路，这一次都收好。",
    "initial": [
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "number": 100,
    "revision": 1,
    "target": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "certificate": [
      {
        "op": "dawn",
        "direction": 1
      },
      {
        "op": "night",
        "direction": 1
      },
      {
        "op": "dawn",
        "direction": -1
      },
      {
        "op": "noon",
        "direction": 1
      },
      {
        "op": "dusk",
        "direction": -1
      },
      {
        "op": "noon",
        "direction": 1
      },
      {
        "op": "dusk",
        "direction": 1
      },
      {
        "op": "night",
        "direction": 1
      }
    ],
    "shortest": 8,
    "group_order": 20160,
    "diameter": 9
  }
];
if(typeof module === "object" && module.exports) module.exports = levels;
else root.WorkshopLevels = levels;
})(globalThis);
