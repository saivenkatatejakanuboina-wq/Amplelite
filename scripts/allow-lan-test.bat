@echo off
echo Allowing testers on your Wi-Fi to open AmpleLite on port 4300...
netsh advfirewall firewall delete rule name="AmpleLite LAN test 4300" >nul 2>&1
netsh advfirewall firewall add rule name="AmpleLite LAN test 4300" dir=in action=allow protocol=TCP localport=4300 profile=private,domain
if errorlevel 1 (
  echo.
  echo FAILED: Right-click this file and choose "Run as administrator".
  pause
  exit /b 1
)
echo.
echo Done. Testers on the same Wi-Fi should open:
echo   http://192.168.1.63:4300/
echo.
pause
