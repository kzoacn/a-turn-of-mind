#!/usr/bin/env python3
"""Subset the existing OFL font for the native web game; Godot assets stay intact."""
from pathlib import Path
import urllib.request
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
import shutil

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / '.tools/NotoSansSC.ttf'
if not source.exists():
    source.parent.mkdir(exist_ok=True)
    with urllib.request.urlopen('https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf',timeout=90) as response:
        source.write_bytes(response.read())
font = instantiateVariableFont(TTFont(source), {'wght':400}, inplace=True)
text = ''.join(chr(i) for i in range(32,127)) + (ROOT/'index.html').read_text()
for p in (ROOT/'web-native').glob('*'):
    if p.suffix in ['.js','.css']:text += p.read_text()
options=subset.Options();options.layout_features=['*']
worker=subset.Subsetter(options=options);worker.populate(text=text);worker.subset(font)
for record in font['name'].names:
    if record.nameID in [1,4,6]:record.string='WorkshopWebSans'.encode(record.getEncoding())
output=ROOT/'web-native/assets/WorkshopSans.ttf';output.parent.mkdir(parents=True,exist_ok=True)
font.save(output)
shutil.copy2(ROOT/'assets/fonts/OFL.txt',output.parent/'OFL.txt')
print('Native web font:',output.stat().st_size,'bytes')
