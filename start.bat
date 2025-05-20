@echo off
setlocal enabledelayedexpansion

echo Starting application setup...

:: Store the current directory
set "CURRENT_DIR=%~dp0"

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not installed. Please install npm first.
    pause
    exit /b 1
)

:: Setup Frontend
echo.
echo Setting up Frontend...
if not exist "%CURRENT_DIR%frontend" (
    echo Error: Frontend directory not found at %CURRENT_DIR%frontend
    pause
    exit /b 1
)

cd /d "%CURRENT_DIR%frontend"
if %errorlevel% neq 0 (
    echo Error: Could not access frontend directory.
    pause
    exit /b 1
)

:: Install frontend dependencies
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install frontend dependencies.
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully.

:: Setup Backend
echo.
echo Setting up Backend...
if not exist "%CURRENT_DIR%backend" (
    echo Error: Backend directory not found at %CURRENT_DIR%backend
    pause
    exit /b 1
)

cd /d "%CURRENT_DIR%backend"
if %errorlevel% neq 0 (
    echo Error: Could not access backend directory.
    pause
    exit /b 1
)

:: Install backend dependencies
echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install backend dependencies.
    pause
    exit /b 1
)
echo Backend dependencies installed successfully.

echo Starting the application...

REM Start backend server
start cmd /k "cd /d %CURRENT_DIR%backend && npm run dev"

REM Wait for backend to start
timeout /t 5

REM Start frontend server
start cmd /k "cd /d %CURRENT_DIR%frontend && npm run dev"

echo Application started successfully!
echo Frontend is running on http://localhost:5173
echo Backend is running on http://localhost:5000
echo.
echo Servers are running in separate windows. Close those windows to stop the servers.
pause
