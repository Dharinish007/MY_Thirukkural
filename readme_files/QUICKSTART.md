# Quick Start Guide 🚀

Get your ThirukkuralApp up and running in 5 minutes!

## ⚡ Prerequisites

- Node.js installed (v16+)
- MongoDB Atlas account (free)
- Terminal/Command Prompt

## 📋 Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Backend Environment

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=thirukkural-secret-key-change-in-production-min-32-chars
```

**Get MongoDB URI:**
1. Go to https://cloud.mongodb.com/
2. Create free cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database password

### 3. Complete Seed Data (IMPORTANT!)

Edit `backend/scripts/seedData.js` and add all 1,330 Kurals.

See `DATA_GUIDE.md` for complete instructions.

### 4. Seed Database

```bash
npm run seed
```

Expected output:
```
✅ MongoDB connected
✅ 133 Adhigarams inserted
✅ 1330 Kurals inserted
```

### 5. Start Backend

```bash
npm run dev
```

Should see: `🚀 Server running on port 5000`

### 6. Install Frontend Dependencies

Open NEW terminal:
```bash
cd frontend
npm install
```

### 7. Configure Frontend Environment

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 8. Start Frontend

```bash
npm run dev
```

Should see: `Local: http://localhost:3000`

### 9. Open Browser

Visit: http://localhost:3000

## ✅ Test the App

1. **Guest Mode**:
   - Browse lessons
   - Click on a Kural
   - Add to wishlist (saves in browser)

2. **Create Account**:
   - Click "Sign Up"
   - Enter name, email, password
   - Login automatically

3. **Logged-in Features**:
   - Mark Kurals as complete
   - View progress on home page
   - Check profile stats
   - Wishlist syncs to database

## 🐛 Common Issues

### "Cannot connect to MongoDB"
- Check your MongoDB URI in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure password is correct

### "Port 5000 already in use"
- Change PORT in `backend/.env` to 5001
- Update `VITE_API_URL` in `frontend/.env` to match

### "Tailwind styles not working"
- Run `npm install` in frontend
- Restart dev server
- Clear browser cache

### "No Kurals showing"
- Ensure seed script ran successfully
- Check MongoDB has data
- Verify backend is running

## 📱 What You Should See

### Home Page
- Welcome message
- 4 colorful cards (Lessons, Completed, Quiz, Reels)
- Progress circle (if logged in)

### Lessons Page
- 3 tabs (Green, Yellow, Pink)
- List of chapters
- Click to expand and see 10 Kurals

### Kural Detail Page
- Tamil text (2 lines)
- Tamil meaning
- Complete button
- Wishlist button

## 🎨 Color Scheme

- **Green** = Arathupal (Virtue)
- **Yellow/Amber** = Porutpal (Wealth)
- **Pink** = Kamathupal (Love)
- **Blue** = Primary actions

## 📞 Need Help?

Check:
1. `README.md` - Full documentation
2. `DATA_GUIDE.md` - How to add Kurals
3. Browser console for errors
4. Backend terminal for API errors

## 🎉 Success!

If you see the home page with colorful cards, you're all set!

Start learning Thirukkural! 📚✨
