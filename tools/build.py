#!/usr/bin/env python3
"""Import, verify, and export the pinned Godot project to Windows and Web."""
import argparse
import os
from pathlib import Path
import shutil
import subprocess
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[1]


def run(*args):
    subprocess.run([str(arg) for arg in args], cwd=ROOT, check=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--godot', default=os.environ.get('BORROWED_MOVES_GODOT', str(ROOT / '.tools/Godot_v4.7.2-stable_linux.x86_64')))
    parser.add_argument('--skip-tests', action='store_true')
    args = parser.parse_args()
    godot = args.godot
    if not Path(godot).exists() and not shutil.which(godot):
        parser.error('Godot not found. Run tools/bootstrap_godot.py --templates, or pass --godot PATH.')
    for name in ['windows', 'web']:
        (ROOT / 'build' / name).mkdir(parents=True, exist_ok=True)
    run(godot, '--headless', '--editor', '--path', '.', '--import')
    if not args.skip_tests:
        run(godot, '--headless', '--path', '.', '--script', 'tests/test_logic.gd')
        run(godot, '--headless', '--path', '.', '--script', 'tests/test_game.gd')
    run(godot, '--headless', '--path', '.', '--export-release', 'Windows Desktop', 'build/windows/BorrowedMoves.exe')
    run(godot, '--headless', '--path', '.', '--export-release', 'Web', 'build/web/index.html')
    copyright_path = ROOT / '.tools/GODOT_COPYRIGHT.txt'
    copyright_path.parent.mkdir(exist_ok=True)
    if not copyright_path.exists():
        with urllib.request.urlopen('https://raw.githubusercontent.com/godotengine/godot/4.7.2-stable/COPYRIGHT.txt', timeout=60) as response:
            copyright_path.write_bytes(response.read())
    for name in ['windows', 'web']:
        folder = ROOT / 'build' / name
        shutil.copy2(copyright_path, folder / 'GODOT_COPYRIGHT.txt')
        shutil.copy2(ROOT / 'assets/fonts/OFL.txt', folder / 'FONT_LICENSE.txt')
        shutil.copy2(ROOT / 'THIRD_PARTY.md', folder / 'THIRD_PARTY.md')
    shutil.copy2(ROOT / 'docs/PLAYTEST.md', ROOT / 'build/windows/PLAYTEST.md')
    (ROOT / 'build/windows/README.txt').write_text('借位工坊 · 第一阶段试玩版\n\n双击 BorrowedMoves.exe 即可开始，无需安装 Godot。\n左环 A/D，右环方向键，Z 撤销，Y 重做，R 重来，H 提示，空格叠看目标，F11 全屏。\n声音和动画可在右上角切换。进度自动保存在本机。\n试玩后可在左下角导出记录，配合 PLAYTEST.md 留下反馈。\n', encoding='utf-8-sig')
    with zipfile.ZipFile(ROOT / 'build/BorrowedMoves-windows.zip', 'w', compression=zipfile.ZIP_DEFLATED) as output:
        for path in sorted((ROOT / 'build/windows').iterdir()):
            if path.is_file() and not path.name.endswith('.console.exe'):
                output.write(path, arcname='BorrowedMoves/' + path.name)
    with zipfile.ZipFile(ROOT / 'build/BorrowedMoves-web.zip', 'w', compression=zipfile.ZIP_DEFLATED) as output:
        for path in sorted((ROOT / 'build/web').iterdir()):
            if path.is_file():
                output.write(path, arcname=path.name)
    print('Built build/BorrowedMoves-windows.zip and build/BorrowedMoves-web.zip')


if __name__ == '__main__':
    main()
