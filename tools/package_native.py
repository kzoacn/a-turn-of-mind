#!/usr/bin/env python3
"""Package just the native web game, preserving the existing Godot artifacts."""
from pathlib import Path
import zipfile

ROOT=Path(__file__).resolve().parents[1]
output=ROOT/'build/BorrowedMoves-native-web.zip'
output.parent.mkdir(exist_ok=True)
files=[ROOT/'index.html',ROOT/'assets/icon.svg',ROOT/'docs/NATIVE_PLAYTEST.md']
files+=sorted(p for p in (ROOT/'web-native').rglob('*') if p.is_file())
with zipfile.ZipFile(output,'w',compression=zipfile.ZIP_DEFLATED) as archive:
    for source in files:archive.write(source,source.relative_to(ROOT))
    archive.writestr('README.txt','转念之间 · A Turn of Mind · 网页版 0.6.1\n\n双击 index.html 即可开始，无需安装或服务器。\n十间工坊各有十关，可以自由选关。\n初见 01–10；巧思 11–20；回响 21–30；织路 31–40；归藏 41–50。\n新增合拍 51–60；折光 61–70；游园 71–80；织星 81–90；归一 91–100。\n可在浏览器打开 index.html#level=51，从这次的五十关开始。\n1 / 2 / 3 / 4 拨动；Shift + 数字反向；Z 撤销；Y 重做；R 重来；H 提示。\n按住空格叠看目标。可从展柜导出本地试玩记录。\n\n字体采用 SIL OFL 1.1，许可见 web-native/assets/OFL.txt。\n图形与音效在本项目中生成。此包使用原生网页，不包含 Godot 引擎。\n')
with zipfile.ZipFile(output) as archive:
    assert archive.testzip() is None
print(output,round(output.stat().st_size/1024,1),'KiB; CRC verified')
