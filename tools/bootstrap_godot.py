#!/usr/bin/env python3
"""Fetch the pinned Godot editor and only the desktop/web export templates we use."""
import argparse
import hashlib
import io
import os
from pathlib import Path
import urllib.request
import zipfile

VERSION = '4.7.2-stable'
BASE = f'https://github.com/godotengine/godot/releases/download/{VERSION}/'
ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / '.tools'


def fetch(url, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        return
    print('Downloading', dest.name, flush=True)
    temp = dest.with_suffix(dest.suffix + '.tmp')
    with urllib.request.urlopen(url, timeout=90) as response, temp.open('wb') as out:
        while block := response.read(1024 * 1024):
            out.write(block)
    temp.replace(dest)


class RangeFile(io.RawIOBase):
    """Seekable HTTPS ZIP, without downloading all mobile/console templates."""
    def __init__(self, url):
        super().__init__()
        req = urllib.request.Request(url, headers={'Range': 'bytes=0-0'})
        with urllib.request.urlopen(req, timeout=90) as response:
            if response.status != 206:
                raise RuntimeError('This mirror does not support byte ranges.')
            self.url = response.url
            self.length = int(response.headers['Content-Range'].split('/')[-1])
        self.pos = 0

    def seekable(self):
        return True

    def readable(self):
        return True

    def tell(self):
        return self.pos

    def seek(self, offset, whence=0):
        self.pos = offset if whence == 0 else (self.pos if whence == 1 else self.length) + offset
        return self.pos

    def read(self, size=-1):
        if size < 0:
            size = self.length - self.pos
        size = min(size, self.length - self.pos)
        if size <= 0:
            return b''
        req = urllib.request.Request(self.url, headers={'Range': f'bytes={self.pos}-{self.pos + size - 1}'})
        with urllib.request.urlopen(req, timeout=120) as response:
            if response.status != 206:
                raise RuntimeError('Expected a byte-range response')
            data = response.read()
        if len(data) != size:
            raise RuntimeError(f'Incomplete range: expected {size}, got {len(data)}')
        self.pos += len(data)
        return data


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--templates', action='store_true')
    args = parser.parse_args()
    TOOLS.mkdir(exist_ok=True)
    name = f'Godot_v{VERSION}_linux.x86_64.zip'
    archive = TOOLS / name
    fetch(BASE + name, archive)
    sums = urllib.request.urlopen(BASE + 'SHA512-SUMS.txt', timeout=90).read().decode()
    expected = next(line.split()[0] for line in sums.splitlines() if line.split()[-1].lstrip('*') == name)
    if hashlib.sha512(archive.read_bytes()).hexdigest() != expected:
        raise RuntimeError('Editor SHA-512 verification failed')
    binary = TOOLS / f'Godot_v{VERSION}_linux.x86_64'
    if not binary.exists():
        with zipfile.ZipFile(archive) as zf:
            binary.write_bytes(zf.read(binary.name))
        binary.chmod(0o755)
    print('Editor verified:', binary, flush=True)
    if args.templates:
        destination = Path(os.environ.get('XDG_DATA_HOME', str(Path.home() / '.local/share'))) / 'godot/export_templates' / VERSION.replace('-stable', '.stable')
        destination.mkdir(parents=True, exist_ok=True)
        wanted = ['windows_release_x86_64.exe', 'windows_debug_x86_64.exe', 'web_nothreads_release.zip', 'web_nothreads_debug.zip', 'version.txt']
        missing = [name for name in wanted if not (destination / name).exists()]
        if missing:
            with zipfile.ZipFile(RangeFile(BASE + f'Godot_v{VERSION}_export_templates.tpz')) as zf:
                for name in missing:
                    entry = next(info for info in zf.infolist() if info.filename.endswith('/' + name))
                    print('Extracting', name, entry.compress_size, 'bytes', flush=True)
                    data = zf.read(entry)  # zipfile verifies the member CRC.
                    (destination / name).write_bytes(data)
        print('Templates:', destination, flush=True)


if __name__ == '__main__':
    main()
