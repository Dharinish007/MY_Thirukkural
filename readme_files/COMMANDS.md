# Command Reference 📝

All commands you need to run the ThirukkuralApp.

## 🔧 Initial Setup

### Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (then edit it with your MongoDB URI)
# On Windows:
type nul > .env
# On Mac/Linux:
touch .env

# Seed database (after completing seedData.js)
npm run seed
```

### Frontend Setup
```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
# On Windows:
type nul > .env
# On Mac/Linux:
touch .env
```

## 🚀 Running the App

### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

## 🗄️ Database Commands

### Seed Database
```bash
cd backend
npm run seed
```

### Clear and Re-seed
The seed script automatically clears existing data before inserting new data.

## 🏗️ Build Commands

### Build Frontend for Production
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

### Preview Production Build
```bash
cd frontend
npm run preview
```

## 🧪 Testing API

### Using curl

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

#### Get Adhigarams
```bash
curl http://localhost:5000/api/adhigarams
```

#### Get Kurals for Adhigaram 1
```bash
curl http://localhost:5000/api/adhigarams/1/kurals
```

#### Get Specific Kural
```bash
curl http://localhost:5000/api/kurals/1
```

## 🔍 Debugging Commands

### Check if Backend is Running
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Check if Frontend is Running
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

### View Backend Logs
Backend logs appear in the terminal where you ran `npm run dev`

### Clear Node Modules (if issues)
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📦 Package Management

### Update Dependencies
```bash
# Backend
cd backend
npm update

# Frontend
cd frontend
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

## 🌐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/thirukkural
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🚨 Emergency Commands

### Kill Process on Port (if stuck)

#### Windows
```bash
# Find process
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### Mac/Linux
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Kill process on port 3000
kill -9 $(lsof -t -i:3000)
```

### Reset Everything
```bash
# Stop all servers (Ctrl+C in terminals)

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run seed

# Frontend
cd frontend
rm -rf node_modules package-lock.json dist
npm install

# Restart servers
```

## 📊 Useful npm Scripts

### Backend (package.json)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database

### Frontend (package.json)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Install backend | `cd backend && npm install` |
| Install frontend | `cd frontend && npm install` |
| Seed database | `cd backend && npm run seed` |
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm run dev` |
| Build frontend | `cd frontend && npm run build` |
| Test API | `curl http://localhost:5000/api/health` |

## 💡 Pro Tips

1. **Use two terminals**: One for backend, one for frontend
2. **Keep terminals open**: Don't close them while developing
3. **Check logs**: Always check terminal output for errors
4. **Restart on changes**: Restart servers if .env changes
5. **Clear cache**: Clear browser cache if styles don't update

---

**Happy Coding! 🚀**
