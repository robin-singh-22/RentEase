# 🏡 RentEase - Vacation Rental & Booking Platform (Full-Stack MERN)

RentEase is a full-stack vacation rental platform (Airbnb clone) built with **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Quick Start (One Command)

To launch the entire application (MongoDB + Backend + Frontend):

### Option 1: Using PowerShell Launcher
```powershell
./run-all.ps1
```
or
```powershell
npm start
```

This will automatically:
1. Ensure the MongoDB container is running on port `27017`.
2. Start the Express Backend API on `http://localhost:3001`.
3. Start the React Frontend on `http://localhost:3000`.

---

## 🛠 Manual Execution

If you prefer to start each service individually:

### 1. Start MongoDB
Make sure Docker is running, then run:
```powershell
docker start rentease-mongo
```
*(If the container is not created yet: `docker run -d --name rentease-mongo -p 27017:27017 mongo:7-jammy`)*

### 2. Start Backend API
```powershell
cd server
npm start
```
- Server URL: **`http://localhost:3001`**
- Health check: **`http://localhost:3001/`**
- API Base routes: `/auth`, `/properties`, `/bookings`, `/users`

### 3. Start Frontend App
```powershell
cd client
npm start
```
- Web App URL: **`http://localhost:3000`**

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
MONGO_URL="mongodb://127.0.0.1:27017/rentease"
JWT_SECRET="bhaisudharja"
PORT=3001
```

### Frontend (`client/.env`)
```env
PORT=3000
BROWSER=none
REACT_APP_SERVER_URL=http://localhost:3001
```

---

## 📦 What Was Fixed & Configured

1. **MongoDB Connection**: Replaced non-existent/unreachable Atlas cluster DNS with automated local MongoDB running via Docker (`rentease-mongo`), and added resilient connection fallback logic in [server/index.js](file:///c:/Users/navee/Downloads/RentEase1-master/server/index.js).
2. **Multer Windows Path Compatibility**: Fixed upload path separators in [server/routes/auth.js](file:///c:/Users/navee/Downloads/RentEase1-master/server/routes/auth.js) and [server/routes/listing.js](file:///c:/Users/navee/Downloads/RentEase1-master/server/routes/listing.js) so image paths don't break with Windows backslashes.
3. **Port Conflicts**: Cleared zombie development processes occupying port 3000.
4. **Build & Bundler Verification**: Verified production build and development compilation for React 18 / Webpack 5.
5. **Unified Startup Script**: Added root [package.json](file:///c:/Users/navee/Downloads/RentEase1-master/package.json) and [run-all.ps1](file:///c:/Users/navee/Downloads/RentEase1-master/run-all.ps1) for one-click startup.
