$ErrorActionPreference = "Stop"

$tmux = "C:\Users\Camer\AppData\Local\Microsoft\WinGet\Packages\arndawg.tmux-windows_Microsoft.Winget.Source_8wekyb3d8bbwe\tmux.exe"
$launcher = "C:\Users\Camer\OneDrive\Documents\Korean-gemini-android\ops\agents\run-gemini-megabatch.ps1"

& $tmux has-session -t worker-gemini 2>$null
if ($LASTEXITCODE -eq 0) {
  exit 0
}

& $tmux new-session -d -s worker-gemini powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $launcher
exit $LASTEXITCODE
