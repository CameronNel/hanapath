$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$promptPath = Join-Path $PSScriptRoot "GEMINI_MEGABATCH_PROMPT.md"
$agy = "C:\Users\Camer\AppData\Local\Microsoft\WinGet\Packages\Google.AntigravityCLI_Microsoft.Winget.Source_8wekyb3d8bbwe\agy.exe"

Set-Location $repoRoot
$promptText = Get-Content -LiteralPath $promptPath -Raw
Write-Host "[gemini-megabatch] repo=$repoRoot model=gemini-3.6-flash-medium"
& $agy --print $promptText --print-timeout 24h --dangerously-skip-permissions --model gemini-3.6-flash-medium
$exitCode = $LASTEXITCODE
Write-Host "[gemini-megabatch] exit=$exitCode"
exit $exitCode
