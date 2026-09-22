#!/usr/bin/env python3
"""Serve the native web game, or optionally the preserved Godot web export."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.wasm': 'application/wasm', '.pck': 'application/octet-stream', '.js': 'application/javascript'}

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8765)
    parser.add_argument('--bind', default='127.0.0.1')
    parser.add_argument('--legacy-godot', action='store_true', help='Serve the preserved Godot export instead')
    args = parser.parse_args()
    folder = ROOT / 'build/web' if args.legacy_godot else ROOT
    if not (folder / 'index.html').exists():
        parser.error('Game entry point is missing. See README.md.')
    server = ThreadingHTTPServer((args.bind, args.port), partial(Handler, directory=str(folder)))
    print(f'A Turn of Mind: http://{args.bind}:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
