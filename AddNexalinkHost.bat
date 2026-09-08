@echo off
:: Adds "nexalink" custom hostname — must run as Administrator
NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ====================================================
    echo  ERROR: Please right-click this file and choose
    echo         "Run as administrator"
    echo ====================================================
    pause
    exit /b 1
)

echo 127.0.0.1   nexalink >> C:\Windows\System32\drivers\etc\hosts
echo.
echo  SUCCESS! "nexalink" hostname added.
echo  Open your browser and go to: http://nexalink
echo.
pause
