# RentEase Full-Stack Launcher for Windows
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "       Starting RentEase Full-Stack      " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# 1. Check Docker & MongoDB
Write-Host "`n[1/3] Checking MongoDB..." -ForegroundColor Yellow
$mongoRunning = docker ps --filter "name=rentease-mongo" --filter "status=running" -q
if (-not $mongoRunning) {
    Write-Host "Starting MongoDB container 'rentease-mongo'..." -ForegroundColor Gray
    docker start rentease-mongo 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Creating and running new 'rentease-mongo' container..." -ForegroundColor Gray
        docker run -d --name rentease-mongo -p 27017:27017 mongo:7-jammy
    }
}
Write-Host "MongoDB is ready on port 27017." -ForegroundColor Green

# 2. Start Backend Server
Write-Host "`n[2/3] Starting Backend Server (Port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; Write-Host '=== RentEase Backend Server ===' -ForegroundColor Cyan; npm start"

# 3. Start Frontend Client
Write-Host "`n[3/3] Starting Frontend Client (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; Write-Host '=== RentEase Frontend Client ===' -ForegroundColor Green; npm start"

Write-Host "`nRentEase full-stack processes launched!" -ForegroundColor Green
Write-Host "Backend API:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
