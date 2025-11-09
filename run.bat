@echo off
REM Weather Graphics - Run Script for Windows

echo ╔══════════════════════════════════════╗
echo ║   Weather Graphics - Run Script     ║
echo ╚══════════════════════════════════════╝
echo.

set COMMAND=%1
if "%COMMAND%"=="" set COMMAND=dev

if "%COMMAND%"=="dev" goto start_all
if "%COMMAND%"=="start" goto start_all
if "%COMMAND%"=="backend" goto start_backend
if "%COMMAND%"=="web" goto start_web
if "%COMMAND%"=="mobile" goto start_mobile
if "%COMMAND%"=="install" goto install_all
if "%COMMAND%"=="help" goto show_help
if "%COMMAND%"=="--help" goto show_help
if "%COMMAND%"=="-h" goto show_help
goto unknown_command

:start_all
echo 🚀 Starting backend + web frontend...
echo.
echo Backend will run on: http://localhost:3000
echo Web app will run on: http://localhost:3001
echo.
call npm run dev
goto end

:start_backend
echo 🚀 Starting backend only...
echo Backend will run on: http://localhost:3000
cd backend
call npm run dev
goto end

:start_web
echo 🚀 Starting web frontend only...
echo Web app will run on: http://localhost:3001
cd frontend\web
call npm run dev
goto end

:start_mobile
echo 🚀 Starting mobile app...
cd frontend\mobile
call npm start
goto end

:install_all
echo 📦 Installing all dependencies...
call npm run install:all
goto end

:show_help
echo Usage: run.bat [command]
echo.
echo Commands:
echo   dev, start    - Start backend + web frontend (default)
echo   backend       - Start backend only
echo   web          - Start web frontend only
echo   mobile        - Start mobile app only
echo   install       - Install all dependencies
echo   help          - Show this help message
echo.
echo Examples:
echo   run.bat           # Start backend + web
echo   run.bat backend   # Start backend only
echo   run.bat web       # Start web only
goto end

:unknown_command
echo Unknown command: %COMMAND%
echo Run 'run.bat help' for usage information
goto end

:end

