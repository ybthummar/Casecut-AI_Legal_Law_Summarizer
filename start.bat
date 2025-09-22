@echo off
echo 🚀 Starting AI Legal Law Summarizer Client...
echo.
echo 🔄 Checking for existing processes...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "3000">NUL
if "%ERRORLEVEL%"=="0" (
    echo ⚠️  Port 3000 may be in use. Stopping existing processes...
    for /f "tokens=2" %%i in ('netstat -ano ^| findstr :3000') do taskkill /PID %%i /F >NUL 2>&1
    timeout /t 2 >NUL
)

echo ✅ Installing dependencies...
call npm install

echo 🎨 Starting development server...
echo 📱 Client will be available at: http://localhost:3000
echo 🔗 Make sure server is running at: http://localhost:8001
echo.
call npm run dev

pause
