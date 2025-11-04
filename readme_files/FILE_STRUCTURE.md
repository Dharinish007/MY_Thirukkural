# File Structure 📁

Complete file tree for ThirukkuralApp project.

## 📂 Project Root

```
my_thiru/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # Quick setup guide
├── 📄 DATA_GUIDE.md                # How to add Kurals
├── 📄 COMMANDS.md                  # Command reference
├── 📄 PROJECT_CHECKLIST.md         # Completion checklist
├── 📄 FEATURES.md                  # Feature list
├── 📄 PROJECT_SUMMARY.md           # Project overview
├── 📄 TROUBLESHOOTING.md           # Problem solving
├── 📄 FILE_STRUCTURE.md            # This file
│
├── 📁 backend/                     # Node.js API
│   ├── 📁 models/                 # Database schemas
│   │   ├── 📄 User.js             # User model
│   │   ├── 📄 Adhigaram.js        # Chapter model
│   │   └── 📄 Kural.js            # Verse model
│   │
│   ├── 📁 routes/                 # API endpoints
│   │   ├── 📄 auth.js             # Signup/Login routes
│   │   ├── 📄 kurals.js           # Kural routes (lazy loading)
│   │   └── 📄 users.js            # User routes (complete/wishlist)
│   │
│   ├── 📁 middleware/             # Express middleware
│   │   └── 📄 auth.js             # JWT authentication
│   │
│   ├── 📁 scripts/                # Database scripts
│   │   ├── 📄 seedKurals.js       # Seed runner
│   │   └── 📄 seedData.js         # Data (NEEDS COMPLETION!)
│   │
│   ├── 📄 server.js               # Main server file
│   ├── 📄 package.json            # Dependencies
│   ├── 📄 .env                    # Config (needs MongoDB URI)
│   ├── 📄 .gitignore              # Git ignore
│   └── 📁 node_modules/           # Installed packages
│
└── 📁 frontend/                    # React app
    ├── 📁 public/                 # Static files
    │
    ├── 📁 src/                    # Source code
    │   ├── 📁 pages/              # Page components
    │   │   ├── 📄 Home.jsx        # Home page
    │   │   ├── 📄 Login.jsx       # Login page
    │   │   ├── 📄 Signup.jsx      # Signup page
    │   │   ├── 📄 Lessons.jsx     # Lessons page
    │   │   ├── 📄 KuralDetail.jsx # Kural detail page
    │   │   ├── 📄 Wishlist.jsx    # Wishlist page
    │   │   ├── 📄 Completed.jsx   # Completed page
    │   │   ├── 📄 Profile.jsx     # Profile page
    │   │   ├── 📄 Quiz.jsx        # Quiz placeholder
    │   │   └── 📄 Reels.jsx       # Reels placeholder
    │   │
    │   ├── 📁 components/         # Reusable components
    │   │   ├── 📄 Navbar.jsx      # Navigation bar
    │   │   ├── 📄 ProtectedRoute.jsx # Route protection
    │   │   └── 📄 ProgressBar.jsx # Progress bar
    │   │
    │   ├── 📁 context/            # React context
    │   │   └── 📄 AuthContext.jsx # Auth state management
    │   │
    │   ├── 📁 utils/              # Utility functions
    │   │   └── 📄 localStorage.js # Guest wishlist helpers
    │   │
    │   ├── 📄 App.jsx             # Main app with routing
    │   ├── 📄 main.jsx            # React entry point
    │   └── 📄 index.css           # Global styles
    │
    ├── 📄 index.html              # HTML template
    ├── 📄 package.json            # Dependencies
    ├── 📄 vite.config.js          # Vite configuration
    ├── 📄 tailwind.config.js      # Tailwind config
    ├── 📄 postcss.config.js       # PostCSS config
    ├── 📄 .env                    # Config (API URL)
    ├── 📄 .gitignore              # Git ignore
    └── 📁 node_modules/           # Installed packages
```

## 📊 File Count Summary

### Backend (17 files)
- **Models**: 3 files
- **Routes**: 3 files
- **Middleware**: 1 file
- **Scripts**: 2 files
- **Config**: 4 files
- **Main**: 1 file

### Frontend (24 files)
- **Pages**: 10 files
- **Components**: 3 files
- **Context**: 1 file
- **Utils**: 1 file
- **Config**: 6 files
- **Main**: 3 files

### Documentation (9 files)
- Guides and references

### Total: ~50 files

## 🎯 Key Files to Know

### Must Configure
1. `backend/.env` - Add MongoDB URI
2. `frontend/.env` - Set API URL
3. `backend/scripts/seedData.js` - Add all 1,330 Kurals

### Main Entry Points
1. `backend/server.js` - Backend starts here
2. `frontend/src/main.jsx` - Frontend starts here
3. `frontend/src/App.jsx` - React routing

### Core Functionality
1. `backend/routes/kurals.js` - Lazy loading logic
2. `frontend/src/pages/Lessons.jsx` - Main learning page
3. `frontend/src/context/AuthContext.jsx` - Auth management

## 📝 File Descriptions

### Backend Files

#### `backend/server.js`
- Main Express server
- Connects to MongoDB
- Registers all routes
- CORS configuration
- Error handling

#### `backend/models/User.js`
- User schema
- Fields: name, email, password, completedKurals, wishlist
- Mongoose model

#### `backend/models/Adhigaram.js`
- Chapter schema
- Fields: number, nameTamil, nameEnglish, paal
- 133 chapters

#### `backend/models/Kural.js`
- Verse schema
- Fields: number, adhigaramNumber, tamilText, purul, paal
- 1,330 verses

#### `backend/routes/auth.js`
- POST /api/auth/signup
- POST /api/auth/login
- JWT token generation
- Password hashing

#### `backend/routes/kurals.js`
- GET /api/adhigarams (names only)
- GET /api/adhigarams/:number/kurals (10 Kurals)
- GET /api/kurals/:number (single Kural)
- Lazy loading implementation

#### `backend/routes/users.js`
- GET /api/users/me
- POST /api/users/complete/:kuralNumber
- GET /api/users/completed
- POST /api/users/wishlist/:kuralNumber
- GET /api/users/wishlist
- GET /api/users/stats

#### `backend/middleware/auth.js`
- JWT verification
- Protects routes
- Adds user to request

#### `backend/scripts/seedKurals.js`
- Connects to MongoDB
- Clears existing data
- Inserts Adhigarams and Kurals
- Run with: `npm run seed`

#### `backend/scripts/seedData.js`
- Contains all Adhigaram data
- Contains all Kural data
- **NEEDS COMPLETION**: Add all 1,330 Kurals

### Frontend Files

#### `frontend/src/main.jsx`
- React entry point
- Renders App component
- Mounts to #root

#### `frontend/src/App.jsx`
- Main app component
- React Router setup
- All route definitions
- AuthProvider wrapper

#### `frontend/src/index.css`
- Tailwind directives
- Global styles
- Custom scrollbar
- Font definitions

#### `frontend/src/pages/Home.jsx`
- Welcome message
- Progress circle
- 4 main cards
- Stats display

#### `frontend/src/pages/Login.jsx`
- Email/password form
- Show/hide password
- Error handling
- Link to signup

#### `frontend/src/pages/Signup.jsx`
- Name/email/password form
- Validation
- Auto-login after signup
- Link to login

#### `frontend/src/pages/Lessons.jsx`
- 3 paal tabs
- Adhigaram list
- Expand/collapse
- Lazy loading
- Caching

#### `frontend/src/pages/KuralDetail.jsx`
- Tamil text display
- Tamil meaning
- Complete button
- Wishlist button
- Back navigation

#### `frontend/src/pages/Wishlist.jsx`
- Guest + user wishlist
- Grid layout
- Remove functionality
- Empty state

#### `frontend/src/pages/Completed.jsx`
- Protected route
- Filter by paal
- Completion dates
- Progress bar

#### `frontend/src/pages/Profile.jsx`
- Protected route
- User info
- Stats cards
- Progress breakdown
- Logout button

#### `frontend/src/pages/Quiz.jsx`
- Placeholder page
- Coming soon message
- Back button

#### `frontend/src/pages/Reels.jsx`
- Placeholder page
- Coming soon message
- Back button

#### `frontend/src/components/Navbar.jsx`
- Always visible
- Logo and title
- Wishlist icon with count
- Login button / User menu
- Dropdown

#### `frontend/src/components/ProtectedRoute.jsx`
- Route wrapper
- Checks authentication
- Redirects to login
- Loading state

#### `frontend/src/components/ProgressBar.jsx`
- Reusable progress bar
- Color-coded by paal
- Percentage display
- Animated

#### `frontend/src/context/AuthContext.jsx`
- Auth state management
- Login/signup/logout functions
- User data
- Token handling
- API URL

#### `frontend/src/utils/localStorage.js`
- Guest wishlist functions
- Get/add/remove/clear
- LocalStorage helpers

### Configuration Files

#### `backend/package.json`
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node scripts/seedKurals.js"
  }
}
```

#### `frontend/package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### `frontend/tailwind.config.js`
- Custom colors (green, amber, pink)
- Custom fonts (Tamil, English)
- Custom shadows
- Responsive breakpoints

#### `frontend/vite.config.js`
- React plugin
- Dev server port (3000)
- Auto-open browser

## 🔍 Finding Files

### To find a specific feature:
- **Authentication**: `backend/routes/auth.js`, `frontend/src/context/AuthContext.jsx`
- **Lazy Loading**: `backend/routes/kurals.js`, `frontend/src/pages/Lessons.jsx`
- **Progress Tracking**: `backend/routes/users.js`, `frontend/src/pages/Profile.jsx`
- **Wishlist**: `backend/routes/users.js`, `frontend/src/pages/Wishlist.jsx`
- **Colors**: `frontend/tailwind.config.js`
- **Routing**: `frontend/src/App.jsx`

### To modify UI:
- **Layout**: Individual page files in `frontend/src/pages/`
- **Colors**: `frontend/tailwind.config.js`
- **Fonts**: `frontend/index.html`, `frontend/tailwind.config.js`
- **Navigation**: `frontend/src/components/Navbar.jsx`

### To modify API:
- **Endpoints**: Files in `backend/routes/`
- **Database**: Files in `backend/models/`
- **Auth**: `backend/middleware/auth.js`

## 📦 Dependencies

### Backend
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon (dev)

### Frontend
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- vite

## 🚀 Quick Navigation

| Need to... | Go to... |
|------------|----------|
| Add Kurals | `backend/scripts/seedData.js` |
| Configure DB | `backend/.env` |
| Change colors | `frontend/tailwind.config.js` |
| Modify home page | `frontend/src/pages/Home.jsx` |
| Add API endpoint | `backend/routes/` |
| Change navbar | `frontend/src/components/Navbar.jsx` |
| Fix auth | `frontend/src/context/AuthContext.jsx` |

---

**Use this as a reference to navigate the project! 🗺️**
