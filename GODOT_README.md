**借位工坊 · Borrowed Moves · 第一阶段原型**

这是保留的 Godot 八关版本，新版十关原生网页见根目录 README。若要读取先前在 8765 端口积累的 Godot 网页存档，可先停止新版网页服务，再用 `python3 tools/serve.py --legacy-godot --port 8765` 打开旧版；不同端口的浏览器存储彼此独立。

用两个共用插槽的转环，把徽章修成目标图案。八个手工关卡逐步引入逆向操作、联动、借位、局部变化和相同符号的替代。群论解释在可选的“原理札记”里。

Windows 直接双击根目录的 `StartGodot.bat`，或运行 `build/windows/BorrowedMoves.exe`。可分享的压缩包是 `build/BorrowedMoves-windows.zip`，解压后运行其中的 EXE，无需安装引擎。试玩版完全离线运行。

浏览器版本在 `build/web/`。在项目根目录运行：

```bash
python3 tools/serve.py --legacy-godot --port 8766
```

然后打开 <http://localhost:8766>。网页需要通过 HTTP 打开；不要直接双击 HTML。浏览器需支持 WebGL 2 和 WebAssembly。服务器默认只监听本机，Ctrl+C 停止。

| 操作 | 鼠标 / 键盘 |
| --- | --- |
| 左环逆转 / 顺转 | 屏幕按钮，或 A / D |
| 右环逆转 / 顺转 | 屏幕按钮，或 ← / → |
| 直接拨动把手 | 点击中央把手顺转，右键或 Shift+点击逆转 |
| 预览影响范围 | 指向把手或操作按钮 |
| 对照目标 | 按住空格 |
| 撤销 / 重做 | Z / Y |
| 重来 / 提示 | R / H |
| 全屏 | F11 |
| 玩法说明 / 关闭说明 | Esc |

所有关卡都可以直接选择。提示先讲思路，再提供当前局面的一步建议。途中允许打乱已经正确的徽章；只需最终吻合。相同颜色与形状的徽章可以互相替代。

进度、声音和动画设置自动存到本机。Windows 通常在 `%APPDATA%\BorrowedMovesPrototype\progress.json`，Linux 在 `~/.local/share/BorrowedMovesPrototype/progress.json`，Web 在浏览器站点存储中。切换浏览器或清理站点数据会影响 Web 存档。重来只重置当前关卡的操作，不抹掉已完成记录。

试玩者可以从左下角导出记录，用 [试玩表](docs/PLAYTEST.md) 补充实际感受。真实陌生玩家反馈尚未收集，15–20 分钟体验仍是待验证目标。

开发使用 **Godot 4.7.2 stable / GDScript / Compatibility renderer**。用该版本的 Godot 打开 [project.godot](project.godot)，按 F6/F5 运行场景/项目。源代码和素材均在本目录，运行时不依赖 Node、Python 或网络。

在当前 Linux / WSL 开发环境中，首次安装工具及所需导出模板：

```bash
python3 tools/bootstrap_godot.py --templates
```

脚本校验官方编辑器的 SHA-512，通过 HTTPS ZIP 范围读取只下载 Windows 与 Web 模板。工具放在 `.tools/`，模板安装到本机 Godot 模板目录。已经安装引擎的开发者也可直接在编辑器使用 `export_presets.cfg` 中的两个预设导出。

运行测试并重新打包：

```bash
python3 tools/build.py
```

已有其他位置的同版本引擎时使用 `--godot /path/to/godot`。构建脚本导入资源、运行逻辑与交互测试、导出 Windows 与 Web 并附带许可文件。Windows 原生 Python 环境也可传入 Godot EXE 路径；自动下载脚本目前服务于 Linux / WSL。

可选的浏览器验收使用 Playwright 1.63.0。先启动本地 Web 服务器，再在另一终端执行：

```bash
npm --prefix .tools/browser install playwright@1.63.0 --no-audit --no-fund
node .tools/browser/node_modules/playwright/cli.js install chromium
BORROWED_MOVES_URL=http://127.0.0.1:8766 node tests/test_web.cjs
```

已有 Chromium 时，可以设置 `BORROWED_MOVES_CHROMIUM` 为其可执行文件路径。测试会使用独立的临时浏览器上下文，结果写入 `test-results/`。

| 文件 | 用途 |
| --- | --- |
| `src/permutation.gd` | 纯置换逻辑及有界 BFS 提示求解 |
| `src/game_session.gd` | 操作、撤销、重做和完成判定 |
| `src/level_catalog.gd` | 关卡读取与 JSON 数字类型规范化 |
| `src/board.gd` | 自绘机关、形状标识、移动动画和预览 |
| `src/main.gd` | 游戏界面、输入、关卡流程和提示 |
| `src/progress_store.gd` | 本地存档和自愿导出的试玩记录 |
| `data/levels.json` | 八关的初态、目标、提示与解法证书 |
| `tools/design_levels.py` | 人工设定关卡及独立 Python BFS 校验 |
| `tools/build_assets.py` | 字体裁剪和原创合成音效 |
| `tests/test_logic.gd` | 数学规则、解法、撤销、存档与损坏恢复 |
| `tests/test_game.gd` | 引擎内鼠标/键盘流程与八关通关 |
| `docs/level-validation.json` | 各关最短距离及一条验证过的解法 |

改变关卡设计后运行 `python3 tools/design_levels.py`。改动中文文本后运行 `python3 tools/build_assets.py` 更新字体子集；该可选素材工具需要 Python fontTools。常规运行和构建使用已随项目提供的字体与音效，不需要该依赖。

第一阶段包含可玩原型、自动验证、分发包和试玩记录表。宏操作、创意工坊、Steam 集成、正式商店页与大规模关卡生产属于后续阶段。原始策划见 [GAME_PLAN.md](GAME_PLAN.md)，第三方许可见 [THIRD_PARTY.md](THIRD_PARTY.md)。
