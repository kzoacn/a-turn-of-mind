@echo off
cd /d "%~dp0"
if exist "index.html" (
    start "" "index.html"
) else (
    echo Game entry missing. See README.md for instructions.
    pause
)
