@echo off
REM Quick setup script to configure local Azure Storage connection

echo.
echo ========================================
echo  Azure Storage Connection Setup
echo ========================================
echo.

cd /d "%~dp0.."

powershell.exe -ExecutionPolicy Bypass -File ".\scripts\get-azure-storage-connection.ps1"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  Setup Complete!
    echo ========================================
    echo.
) else (
    echo.
    echo ========================================
    echo  Setup Failed
    echo ========================================
    echo.
    echo See above for error details
)

pause
