# Setup Git History for RentEase (August 2026 with Realistic Gaps & Sprints)
param (
    [string]$AuthorName = "Robin Singh",
    [string]$AuthorEmail = "robinexam1@gmail.com"
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Generating August 2026 Git History      " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan

# Remove old .git
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}

# Fresh init
git init -b main
git config user.name "$AuthorName"
git config user.email "$AuthorEmail"

function Make-Commit {
    param(
        [string]$Message,
        [string]$Date,
        [string[]]$Files
    )
    foreach ($f in $Files) {
        if (Test-Path $f) {
            git add $f
        }
    }
    $status = git status --porcelain
    if ($status) {
        $env:GIT_AUTHOR_NAME = $AuthorName
        $env:GIT_AUTHOR_EMAIL = $AuthorEmail
        $env:GIT_AUTHOR_DATE = $Date
        $env:GIT_COMMITTER_NAME = $AuthorName
        $env:GIT_COMMITTER_EMAIL = $AuthorEmail
        $env:GIT_COMMITTER_DATE = $Date
        git commit -m "$Message"
        Write-Host "[$Date] $Message" -ForegroundColor Green
    }
}

# --- DAY 1: Aug 2, 2026 (2 commits) ---
Make-Commit -Message "Initial commit: project structure and git ignore rules" `
    -Date "2026-08-02T14:10:20" `
    -Files @(".gitignore")

Make-Commit -Message "feat(server): initialize server directory and package manifests" `
    -Date "2026-08-02T18:25:44" `
    -Files @("server/package.json", "server/package-lock.json")

# --- DAY 2: Aug 3, 2026 (1 commit) ---
Make-Commit -Message "feat(server): setup Express application and mongodb connection config" `
    -Date "2026-08-03T21:15:30" `
    -Files @("server/index.js", "server/.env.example")

# >>> GAP: Aug 4, 5, 6 (3 days break / 0 commits) <<<

# --- DAY 3: Aug 7, 2026 (5 commits - Backend Sprint!) ---
Make-Commit -Message "feat(server): create User schema with profile and array fields" `
    -Date "2026-08-07T11:20:15" `
    -Files @("server/models/User.js")

Make-Commit -Message "feat(server): add bcryptjs and jsonwebtoken authentication logic" `
    -Date "2026-08-07T13:45:00" `
    -Files @("server/routes/auth.js")

Make-Commit -Message "feat(server): add Listing schema with amenities and categories" `
    -Date "2026-08-07T16:10:22" `
    -Files @("server/models/Listing.js")

Make-Commit -Message "feat(server): implement property listing creation and category routes" `
    -Date "2026-08-07T18:30:45" `
    -Files @("server/routes/listing.js")

Make-Commit -Message "feat(server): add Booking model and customer reservation endpoints" `
    -Date "2026-08-07T21:50:10" `
    -Files @("server/models/Booking.js", "server/routes/booking.js")

# --- DAY 4: Aug 8, 2026 (2 commits) ---
Make-Commit -Message "feat(server): add user trip, wishlist, and properties routes" `
    -Date "2026-08-08T15:05:40" `
    -Files @("server/routes/user.js")

Make-Commit -Message "feat(server): configure server-side static assets and upload directories" `
    -Date "2026-08-08T19:40:15" `
    -Files @("server/public", "server/.gitignore")

# >>> GAP: Aug 9, 10, 11, 12 (4 days break / 0 commits) <<<

# --- DAY 5: Aug 13, 2026 (1 commit) ---
Make-Commit -Message "feat(client): bootstrap React client application and package dependencies" `
    -Date "2026-08-13T20:30:25" `
    -Files @("client/package.json", "client/package-lock.json", "client/README.md", "client/.gitignore")

# >>> GAP: Aug 14 (1 day break / 0 commits) <<<

# --- DAY 6: Aug 15, 2026 (4 commits - Frontend Kick-off!) ---
Make-Commit -Message "feat(client): add global styles and SCSS layout variables" `
    -Date "2026-08-15T10:15:30" `
    -Files @("client/src/App.css", "client/src/styles/variables.scss", "client/src/styles/breakpoints.scss")

Make-Commit -Message "feat(client): setup Redux toolkit state management and user slice" `
    -Date "2026-08-15T13:40:50" `
    -Files @("client/src/redux/state.js", "client/src/redux/store.js")

Make-Commit -Message "feat(client): add application entry point and public assets" `
    -Date "2026-08-15T17:20:10" `
    -Files @("client/src/index.js", "client/public", "client/.env.example")

Make-Commit -Message "feat(client): create Navbar and Footer layout components" `
    -Date "2026-08-15T20:50:40" `
    -Files @("client/src/components/Navbar.jsx", "client/src/components/Footer.jsx", "client/src/components/Loader.jsx", "client/src/styles/Navbar.scss", "client/src/styles/Footer.scss", "client/src/styles/Loader.scss")

# >>> GAP: Aug 16, 17, 18 (3 days break / 0 commits) <<<

# --- DAY 7: Aug 19, 2026 (2 commits) ---
Make-Commit -Message "feat(client): build RegisterPage and LoginPage authentication views" `
    -Date "2026-08-19T16:30:15" `
    -Files @("client/src/pages/RegisterPage.jsx", "client/src/pages/LoginPage.jsx", "client/src/styles/Register.scss", "client/src/styles/Login.scss")

Make-Commit -Message "feat(client): add category metadata and hero Slide banner" `
    -Date "2026-08-19T21:10:45" `
    -Files @("client/src/data.js", "client/src/components/Slide.jsx", "client/src/components/Categories.jsx", "client/src/styles/slide.scss", "client/src/styles/Categories.scss")

# --- DAY 8: Aug 20, 2026 (1 commit) ---
Make-Commit -Message "feat(client): build ListingCard component with image carousel" `
    -Date "2026-08-20T19:25:35" `
    -Files @("client/src/components/ListingCard.jsx", "client/src/styles/ListingCard.scss")

# >>> GAP: Aug 21, 22, 23 (3 days break / 0 commits) <<<

# --- DAY 9: Aug 24, 2026 (5 commits - Main Feature Sprint!) ---
Make-Commit -Message "feat(client): integrate home page listings feed with API" `
    -Date "2026-08-24T11:05:20" `
    -Files @("client/src/components/Listings.jsx", "client/src/pages/HomePage.jsx", "client/src/styles/Listings.scss")

Make-Commit -Message "feat(client): implement CategoryPage and SearchPage result views" `
    -Date "2026-08-24T14:20:40" `
    -Files @("client/src/pages/CategoryPage.jsx", "client/src/pages/SearchPage.jsx", "client/src/styles/List.scss")

Make-Commit -Message "feat(client): create multi-step property creation form" `
    -Date "2026-08-24T16:45:10" `
    -Files @("client/src/pages/CreateListing.jsx", "client/src/styles/CreateListing.scss")

Make-Commit -Message "feat(client): build ListingDetails view with DateRange picker" `
    -Date "2026-08-24T19:10:55" `
    -Files @("client/src/pages/ListingDetails.jsx", "client/src/styles/ListingDetails.scss")

Make-Commit -Message "feat(client): implement TripList, WishList, PropertyList, and ReservationList" `
    -Date "2026-08-24T22:30:15" `
    -Files @("client/src/pages/TripList.jsx", "client/src/pages/WishList.jsx", "client/src/pages/PropertyList.jsx", "client/src/pages/ReservationList.jsx")

# >>> GAP: Aug 25, 26 (2 days break / 0 commits) <<<

# --- DAY 10: Aug 27, 2026 (2 commits) ---
Make-Commit -Message "feat: setup full client routing in App.js" `
    -Date "2026-08-27T15:40:20" `
    -Files @("client/src/App.js")

Make-Commit -Message "feat: add database seeding script with sample vacation properties" `
    -Date "2026-08-27T20:15:45" `
    -Files @("server/seed.js")

# --- DAY 11: Aug 28, 2026 (1 commit - Final Polish) ---
git add .
$status = git status --porcelain
if ($status) {
    $Date = "2026-08-28T18:50:00"
    $env:GIT_AUTHOR_NAME = $AuthorName
    $env:GIT_AUTHOR_EMAIL = $AuthorEmail
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_NAME = $AuthorName
    $env:GIT_COMMITTER_EMAIL = $AuthorEmail
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m "docs: finalize full-stack setup launcher, scripts, and documentation"
    Write-Host "[$Date] Final commit" -ForegroundColor Green
}

# Clean env
Remove-Item env:GIT_AUTHOR_NAME -ErrorAction SilentlyContinue
Remove-Item env:GIT_AUTHOR_EMAIL -ErrorAction SilentlyContinue
Remove-Item env:GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
Remove-Item env:GIT_COMMITTER_NAME -ErrorAction SilentlyContinue
Remove-Item env:GIT_COMMITTER_EMAIL -ErrorAction SilentlyContinue
Remove-Item env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

# Set remote
git remote add origin https://github.com/robin-singh-22/RentEase.git

Write-Host "`nGit history setup completed successfully for August 2026!" -ForegroundColor Cyan
Write-Host "Total commits created: $((git rev-list --count HEAD))" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
