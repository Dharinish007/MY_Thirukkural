# Troubleshooting Guide 🔧

Common issues and their solutions for ThirukkuralApp.

## 🚨 Backend Issues

### Issue: "Cannot connect to MongoDB"

**Error Message:**
```
❌ MongoDB connection error: MongoServerError
```

**Solutions:**
1. **Check MongoDB URI**
   - Open `backend/.env`
   - Verify `MONGO_URI` is correct
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/thirukkural`

2. **Verify MongoDB Atlas Setup**
   - Login to https://cloud.mongodb.com/
   - Check cluster is running (not paused)
   - Verify IP whitelist includes your IP (or use 0.0.0.0/0 for all)
   - Confirm database user exists with correct password

3. **Test Connection**
   ```bash
   cd backend
   node -e "require('dotenv').config(); console.log(process.env.MONGO_URI)"
   ```

### Issue: "Port 5000 already in use"

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)
```

**Or change port:**
- Edit `backend/.env`: `PORT=5001`
- Edit `frontend/.env`: `VITE_API_URL=http://localhost:5001`

### Issue: "JWT_SECRET is not defined"

**Error Message:**
```
Error: JWT_SECRET is not defined
```

**Solution:**
Add to `backend/.env`:
```env
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
```

### Issue: "No Kurals in database"

**Error Message:**
```
GET /api/adhigarams returns []
```

**Solutions:**
1. **Run seed script:**
   ```bash
   cd backend
   npm run seed
   ```

2. **Check seedData.js is complete:**
   - Open `backend/scripts/seedData.js`
   - Verify all 133 Adhigarams are present
   - Verify all 1,330 Kurals are present

3. **Check database in MongoDB Atlas:**
   - Go to Collections
   - Should see: adhigarams (133 docs), kurals (1330 docs)

## 🎨 Frontend Issues

### Issue: "Cannot connect to backend"

**Error Message:**
```
Network Error
or
ERR_CONNECTION_REFUSED
```

**Solutions:**
1. **Verify backend is running:**
   - Check terminal shows: `🚀 Server running on port 5000`
   - Test: `curl http://localhost:5000/api/health`

2. **Check API URL:**
   - Open `frontend/.env`
   - Should be: `VITE_API_URL=http://localhost:5000`
   - No trailing slash!

3. **Restart frontend:**
   ```bash
   cd frontend
   # Stop with Ctrl+C
   npm run dev
   ```

### Issue: "Tailwind styles not working"

**Symptoms:**
- No colors
- No spacing
- Plain HTML look

**Solutions:**
1. **Install dependencies:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Verify Tailwind config:**
   - Check `tailwind.config.js` exists
   - Check `postcss.config.js` exists
   - Check `src/index.css` has `@tailwind` directives

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Delete
   - Select "Cached images and files"
   - Clear data

### Issue: "Tamil font not showing"

**Symptoms:**
- Tamil text shows as boxes
- Tamil text looks wrong

**Solutions:**
1. **Check Google Fonts:**
   - Open `index.html`
   - Verify Google Fonts link is present
   - Should include: `Noto+Sans+Tamil`

2. **Check CSS:**
   - Open `tailwind.config.js`
   - Verify `fontFamily.tamil` includes `'Noto Sans Tamil'`

3. **Clear cache and reload:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue: "Page not found / 404"

**Symptoms:**
- Clicking links shows blank page
- URL changes but content doesn't

**Solutions:**
1. **Check React Router:**
   - Open `src/App.jsx`
   - Verify all routes are defined
   - Check path matches exactly

2. **Check imports:**
   - Verify all page components are imported
   - Check file paths are correct

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

## 🔐 Authentication Issues

### Issue: "Cannot signup - email already exists"

**Error Message:**
```
User already exists with this email
```

**Solutions:**
1. **Use different email**
2. **Or delete user from database:**
   - Go to MongoDB Atlas
   - Collections → users
   - Find and delete the user

### Issue: "Cannot login - invalid credentials"

**Error Message:**
```
Invalid email or password
```

**Solutions:**
1. **Check email spelling**
2. **Check password (case-sensitive)**
3. **Try signup if account doesn't exist**
4. **Check backend logs for errors**

### Issue: "Logged out automatically"

**Symptoms:**
- User gets logged out on refresh
- Token not persisting

**Solutions:**
1. **Check localStorage:**
   - Open browser DevTools (F12)
   - Application → Local Storage
   - Should see `token` key

2. **Check AuthContext:**
   - Verify token is saved to localStorage
   - Check token is loaded on mount

3. **Check JWT_SECRET:**
   - Backend `.env` must have JWT_SECRET
   - Must be same secret for all tokens

## 📊 Data Issues

### Issue: "Wishlist not saving"

**For Guests:**
1. **Check localStorage:**
   - DevTools → Application → Local Storage
   - Should see `thirukkural_guest_wishlist`

2. **Check browser settings:**
   - Ensure cookies/storage not blocked
   - Try different browser

**For Logged-in Users:**
1. **Check authentication:**
   - Verify user is logged in
   - Check token in localStorage

2. **Check API:**
   - Open Network tab in DevTools
   - Try adding to wishlist
   - Check for errors

### Issue: "Completed Kurals not showing"

**Solutions:**
1. **Verify logged in:**
   - Completed page requires login
   - Check token exists

2. **Check API response:**
   - Network tab → `/api/users/completed`
   - Should return array of Kurals

3. **Try marking a Kural complete:**
   - Go to any Kural detail page
   - Click "Mark as Complete"
   - Check if it appears in completed page

### Issue: "Progress not updating"

**Solutions:**
1. **Refresh the page:**
   - Stats may need refresh to update

2. **Check API:**
   - Network tab → `/api/users/stats`
   - Verify correct numbers returned

3. **Re-mark Kurals:**
   - Unmark and re-mark a Kural
   - Check if progress updates

## 🚀 Performance Issues

### Issue: "App is slow / laggy"

**Solutions:**
1. **Check lazy loading:**
   - Kurals should load only when Adhigaram expanded
   - Not all 1,330 at once

2. **Clear cache:**
   - Browser cache
   - npm cache: `npm cache clean --force`

3. **Check network:**
   - Open DevTools → Network tab
   - Look for slow requests
   - Check response sizes

4. **Optimize images:**
   - If you added images, compress them
   - Use appropriate formats

### Issue: "Lessons page takes long to load"

**Solutions:**
1. **Verify lazy loading:**
   - Should load Adhigaram names only
   - Kurals load on expand

2. **Check API response:**
   - `/api/adhigarams` should be fast
   - Should return only names, not Kurals

3. **Check database:**
   - Ensure indexes exist
   - MongoDB Atlas should auto-index

## 📱 Mobile Issues

### Issue: "Not responsive on mobile"

**Solutions:**
1. **Check viewport meta tag:**
   - `index.html` should have:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

2. **Check Tailwind responsive classes:**
   - Use `md:`, `lg:` prefixes
   - Test with browser DevTools mobile view

3. **Check CSS:**
   - Avoid fixed widths
   - Use `max-w-` classes

### Issue: "Text too small on mobile"

**Solutions:**
1. **Increase base font size:**
   - Check Tailwind config
   - Use responsive text sizes: `text-base md:text-lg`

2. **Test on real device:**
   - Emulator may differ from real device

## 🔧 Development Issues

### Issue: "npm install fails"

**Solutions:**
1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node version:**
   ```bash
   node --version
   ```
   Should be v16 or higher

4. **Try with npm ci:**
   ```bash
   npm ci
   ```

### Issue: "Module not found"

**Error Message:**
```
Cannot find module 'xyz'
```

**Solutions:**
1. **Install the module:**
   ```bash
   npm install xyz
   ```

2. **Check import path:**
   - Verify file exists
   - Check spelling
   - Use correct relative path

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

### Issue: "Hot reload not working"

**Solutions:**
1. **Restart dev server**
2. **Check Vite config**
3. **Try hard refresh:** Ctrl+Shift+R

## 🌐 Browser Issues

### Issue: "Works in Chrome but not Firefox/Safari"

**Solutions:**
1. **Check browser console for errors**
2. **Clear browser cache**
3. **Check for browser-specific CSS issues**
4. **Test with latest browser version**

### Issue: "CORS errors"

**Error Message:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. **Verify CORS enabled in backend:**
   - `server.js` should have: `app.use(cors())`

2. **Check API URL:**
   - Must match exactly
   - No trailing slashes

3. **Restart backend:**
   ```bash
   cd backend
   npm run dev
   ```

## 🐛 General Debugging Tips

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Read error carefully

### Check Network Tab
1. Open DevTools → Network
2. Perform action
3. Look for failed requests (red)
4. Check request/response details

### Check Backend Logs
1. Look at terminal running backend
2. Check for error messages
3. Look for stack traces

### Test API Directly
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test adhigarams
curl http://localhost:5000/api/adhigarams

# Test specific kural
curl http://localhost:5000/api/kurals/1
```

### Clear Everything and Start Fresh
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json dist
npm install
npm run dev
```

## 📞 Still Stuck?

If none of these solutions work:

1. **Check all documentation files:**
   - README.md
   - QUICKSTART.md
   - COMMANDS.md

2. **Verify environment variables:**
   - Both `.env` files configured correctly

3. **Check file structure:**
   - All files in correct locations
   - No typos in filenames

4. **Test step by step:**
   - Backend works alone?
   - Frontend works alone?
   - Database has data?

5. **Start from scratch:**
   - Follow QUICKSTART.md exactly
   - Don't skip steps

## ✅ Prevention Tips

1. **Always check terminal output**
2. **Read error messages carefully**
3. **Test after each change**
4. **Keep backups of working code**
5. **Use version control (Git)**
6. **Document your changes**

---

**Most issues are solved by:**
1. Checking environment variables
2. Restarting servers
3. Clearing cache
4. Reading error messages

**Good luck! 🚀**
