@echo off
cd /d "%~dp0"
if exist "build\windows\BorrowedMoves.exe" (
    start "" "build\windows\BorrowedMoves.exe"
) else (
    echo Build missing. See README.md for build instructions.
    pause
)
