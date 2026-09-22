#!/usr/bin/env python3
"""Build original synthesized sounds and a redistributable OFL font subset."""
import math
from pathlib import Path
import struct
import urllib.request
import wave
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]


def write_sound(name, duration, notes):
    sample_rate = 22050
    samples = []
    for i in range(int(sample_rate * duration)):
        t = i / sample_rate
        value = 0.0
        for start, hz, length, gain in notes:
            age = t - start
            if 0 <= age < length:
                envelope = min(1.0, age / 0.007) * math.exp(-age * 6.5 / length)
                value += gain * envelope * (math.sin(2 * math.pi * hz * age) + 0.25 * math.sin(2 * math.pi * hz * 2.01 * age))
        samples.append(struct.pack('<h', int(max(-0.98, min(0.98, value)) * 32767)))
    with wave.open(str(ROOT / 'assets/audio' / name), 'wb') as output:
        output.setnchannels(1)
        output.setsampwidth(2)
        output.setframerate(sample_rate)
        output.writeframes(b''.join(samples))


def main():
    font_path = ROOT / '.tools/NotoSansSC.ttf'
    if not font_path.exists():
        font_path.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen('https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf', timeout=90) as response:
            font_path.write_bytes(response.read())
    font = TTFont(font_path)
    font = instantiateVariableFont(font, {'wght': 400}, inplace=True)
    text = ''.join(chr(i) for i in range(32, 127))
    for directory in ['src', 'data']:
        for source in (ROOT / directory).rglob('*'):
            if source.suffix in ['.gd', '.json']:
                text += source.read_text()
    text += '加载中正在打开工坊错误关闭继续返回确认取消保存桌面文件夹名字路径位置需要选择覆盖存在是否重试键盘鼠标空格编辑文件系统' + '←→✓…—·'
    missing = sorted(set(text) - set(map(chr, font.getBestCmap())))
    print('Unmapped non-whitespace characters:', [x for x in missing if not x.isspace()])
    options = subset.Options()
    options.layout_features = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(text=text)
    sub.subset(font)
    for record in font['name'].names:
        if record.nameID in [1, 4, 6]:
            record.string = 'WorkshopSans'.encode(record.getEncoding())
    output = ROOT / 'assets/fonts/WorkshopSans.ttf'
    font.save(output)
    print('Font subset:', output.stat().st_size, 'bytes')
    write_sound('turn.wav', 0.22, [(0, 640, 0.12, 0.25), (0.015, 1150, 0.17, 0.11)])
    write_sound('complete.wav', 1.4, [(0, 523.25, 0.65, 0.18), (0.14, 659.25, 0.65, 0.18), (0.28, 783.99, 0.7, 0.17), (0.44, 1046.5, 0.9, 0.18)])


if __name__ == '__main__':
    main()
