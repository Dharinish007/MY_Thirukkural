# ThirukkuralApp - Learn Tamil Wisdom 📚

A beautiful, modern web application to learn all 1,330 Thirukkural verses. Built with a clean UI inspired by Instagram, Facebook, and Duolingo with vibrant colors.

## 🎯 Features

### Stage 1 (Current)
- ✅ **Browse 1,330 Kurals** - All verses organized into 133 chapters (Adhigarams)
- ✅ **Three Paal Categories** - Arathupal (Virtue), Porutpal (Wealth), Kamathupal (Love)
- ✅ **Guest Mode** - Browse and wishlist without login (LocalStorage)
- ✅ **User Authentication** - Signup/Login with JWT
- ✅ **Progress Tracking** - Mark Kurals as complete (logged-in users only)
- ✅ **Wishlist Feature** - Save favorite Kurals
- ✅ **Completed Page** - View all completed Kurals with dates
- ✅ **Profile Dashboard** - View stats and progress by category
- ✅ **Lazy Loading** - Fast performance with on-demand Kural loading
- ✅ **Mobile Responsive** - Works beautifully on all devices
- 🔜 **Quiz Feature** - Coming in Stage 2
- 🔜 **Reels Feature** - Coming in Stage 2

## 🎨 Design

- **Color Scheme**: Instagram/Facebook inspired with bright, vibrant colors
- **Typography**: Noto Sans Tamil for Tamil text, Inter for English
- **UI Components**: Clean cards, smooth transitions, hover effects
- **Accessibility**: Clear contrast, readable fonts, intuitive navigation

## 💻 Tech Stack

### Frontend
- React 18 (JavaScript, no TypeScript)
- React Router v6
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📁 Project Structure

```
thirukkural-app/
├── frontend/
│   ├── src/
│   │   ├── pages/          # All 11 pages
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Auth context
│   │   ├── utils/          # LocalStorage helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── models/            # User, Adhigaram, Kural
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── scripts/           # Seed script
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- npm or yarn

### 1. Clone the Repository
```bash
cd my_thiru
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
```

**Important**: Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.

### 3. Seed the Database

**Note**: You need to complete the `seedData.js` file with all 1,330 Kurals before running this command.

```bash
npm run seed
```

This will populate your database with:
- 133 Adhigarams (chapters)
- 1,330 Kurals (verses)

### 4. Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```env
VITE_API_URL=http://localhost:5000
```

### 6. Start Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📝 Completing the Seed Data

The `backend/scripts/seedData.js` file contains a sample structure. You need to:

1. Add all 133 Adhigarams to the `adhigarams` array
2. Add all 1,330 Kurals to the `kurals` array

Each Kural should follow this structure:
```javascript
{
  number: 1,
  adhigaramNumber: 1,
  tamilText: "அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு",
  purul: "எழுத்துக்கள் எல்லாம் அகரத்தை அடிப்படையாகக் கொண்டிருப்பது போல...",
  paal: "Arathupal"
}
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login

### Kurals (Public)
- `GET /api/adhigarams` - Get all Adhigaram names (fast!)
- `GET /api/adhigarams/:number/kurals` - Get 10 Kurals for specific Adhigaram
- `GET /api/kurals/:number` - Get single Kural detail

### User Actions (Protected)
- `GET /api/users/me` - Get user profile
- `POST /api/users/complete/:kuralNumber` - Mark Kural complete
- `DELETE /api/users/complete/:kuralNumber` - Unmark complete
- `GET /api/users/completed` - Get all completed Kurals
- `POST /api/users/wishlist/:kuralNumber` - Add to wishlist
- `DELETE /api/users/wishlist/:kuralNumber` - Remove from wishlist
- `GET /api/users/wishlist` - Get wishlist
- `GET /api/users/stats` - Get progress statistics

## 🎨 Color Reference

### Main Colors
- Background: `#F5F7FA`
- Text: `#1C1E21`
- Border: `#E4E6EB`

### Paal Colors
- **Arathupal (Green)**: `#10B981` (primary), `#D1FAE5` (light)
- **Porutpal (Amber)**: `#F59E0B` (primary), `#FEF3C7` (light)
- **Kamathupal (Pink)**: `#EC4899` (primary), `#FCE7F3` (light)

### Action Colors
- Primary Button: `#3B82F6` (Facebook blue)
- Success: `#10B981` (green)
- Danger: `#EF4444` (red)

## 📱 Pages

1. **Home** (`/`) - Hero section, progress circle, 4 main cards
2. **Login** (`/login`) - Email/password login
3. **Signup** (`/signup`) - Create account
4. **Lessons** (`/lessons`) - Browse all Adhigarams with lazy loading
5. **Kural Detail** (`/kural/:id`) - View Kural with Tamil text and meaning
6. **Wishlist** (`/wishlist`) - Saved Kurals (guest + logged-in)
7. **Completed** (`/completed`) - Completed Kurals with dates (protected)
8. **Profile** (`/profile`) - User stats and progress (protected)
9. **Quiz** (`/quiz`) - Placeholder for Stage 2
10. **Reels** (`/reels`) - Placeholder for Stage 2

## 🔐 Guest vs Logged-in Users

### Guest Users Can:
- Browse all Kurals
- Add to wishlist (saved in LocalStorage)
- View wishlist

### Logged-in Users Can:
- Everything guests can do
- Mark Kurals as complete
- Track progress across devices
- View completed Kurals with dates
- See progress statistics
- Sync wishlist to database

## ⚡ Performance Features

- **Lazy Loading**: Kurals load only when Adhigaram is expanded
- **Caching**: Fetched Kurals cached in browser
- **Pagination**: Small API responses (10 Kurals at a time)
- **Optimized Queries**: Separate endpoints for names vs content

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username/password are correct

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check `.env` file in frontend has correct API URL
- Verify CORS is enabled in backend

### Tailwind Styles Not Working
- Run `npm install` in frontend
- Restart dev server
- Clear browser cache

## 🚀 Deployment

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Thirukkural by Thiruvalluvar
- Tamil literature and culture
- Modern web design inspiration from Instagram, Facebook, and Duolingo

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for Tamil language learners**
