# TechTest - Developer Skill Assessment

A full-stack application demonstrating backend API design and frontend state management for a games/products library.

## 📋 Project Overview

This project implements two developer skill test tickets:

### ✅ Ticket 1: Frontend - Global Loading & Error State
A Next.js frontend application showcasing:
- Proper loading state with spinner
- Error state with user-friendly messages
- Success state with data rendering
- React hooks (useState, useEffect) for state management
- Responsive UI with Tailwind CSS

**Status**: ✅ Complete  
**Location**: `./frontend/`

### ✅ Ticket 2: Backend - API Search & Filtering
An Express.js backend API with:
- Games/products REST endpoint
- Search filtering with query parameters
- Case-insensitive name matching
- Backward compatible design
- Sample data with 6 games

**Status**: ✅ Complete  
**Location**: `./` (root)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Install dependencies
npm install

# Start the server (runs on port 5000)
npm start
```

The backend API will be available at `http://localhost:5000`

#### API Endpoints

**Get all games:**
```bash
curl http://localhost:5000/api/games
```

**Search games by name:**
```bash
curl "http://localhost:5000/api/games?search=zelda"
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev
```

The frontend will be available at `http://localhost:3000`

Navigate to `http://localhost:3000/games` to view the games library.

## 📁 Project Structure

```
techtest/
├── server.js                 # Express backend server
├── package.json              # Backend dependencies
├── README.md                 # This file
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Home page
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── games/
│   │   │       └── page.tsx  # Games page with state handling
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.ts
└── .git/                     # Git repository
```

## 🎯 Ticket 1: Frontend Implementation

### Features
- ✅ **Loading State**: Animated spinner with message
- ✅ **Error State**: User-friendly error message with refresh button
- ✅ **Success State**: Responsive grid layout with game cards
- ✅ **Search Integration**: Real-time search with backend filtering
- ✅ **Responsive Design**: Mobile-first responsive layout
- ✅ **TypeScript**: Full type safety
- ✅ **Clean Code**: Well-documented components

### Component: GamesPage

Located at `frontend/src/app/games/page.tsx`

**State Management:**
- `loading`: Boolean indicating data fetch in progress
- `error`: String containing error message or null
- `games`: Array of game objects from API
- `searchQuery`: Current search input value

**Three-State Lifecycle:**

1. **Loading State** (initial & during fetch)
   - Displays spinning loader
   - Shows "Loading games..." message
   - Prevents layout shift

2. **Error State** (on API failure)
   - Displays error message in red container
   - Shows error details
   - Provides "Refresh Page" button
   - Maintains current layout

3. **Success State** (after successful fetch)
   - Renders games in responsive grid
   - Shows count of results
   - Displays game details per card
   - Implements search box for filtering

### Testing the Frontend

1. Start the backend first:
   ```bash
   npm start
   ```

2. In another terminal, start the frontend:
   ```bash
   cd frontend && npm run dev
   ```

3. Navigate to `http://localhost:3000/games`

4. Test each state:
   - **Loading**: Appears briefly on page load
   - **Success**: Games display in grid after loading
   - **Search**: Type in search box to filter games
   - **Error**: Stop backend and refresh to see error state

## 🎯 Ticket 2: Backend Implementation

### Features
- ✅ **Search Endpoint**: GET /api/games?search=keyword
- ✅ **Case-Insensitive**: Matches partial game names
- ✅ **Backward Compatible**: Returns all games when no search param
- ✅ **Preserved Structure**: Consistent API response format
- ✅ **Sample Data**: 6 games for testing
- ✅ **Documentation**: Inline code comments and examples
- ✅ **Clean Code**: Readable and maintainable

### API Endpoint: GET /api/games

**Query Parameters:**
- `search` (optional): Filter games by name (case-insensitive)

**Response Format:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "The Legend of Zelda: Breath of the Wild",
      "developer": "Nintendo",
      "platform": "Nintendo Switch",
      "releaseYear": 2017,
      "rating": 9.3
    }
  ]
}
```

**Examples:**

All games:
```bash
GET /api/games
# Returns: 6 games
```

Search for "zelda":
```bash
GET /api/games?search=zelda
# Returns: 1 game (case-insensitive)
```

Search for "cd projekt":
```bash
GET /api/games?search=cd projekt
# Returns: 2 games (The Witcher 3 and Cyberpunk 2077)
```

### Implementation Details

**File**: `server.js`

**Key Features:**

1. **Search Filtering Logic:**
   - Accepts query parameter `search`
   - Converts to lowercase for case-insensitive matching
   - Uses `Array.filter()` with `String.includes()`
   - Returns filtered or full list

2. **Response Structure:**
   - `success`: Boolean indicating success
   - `count`: Number of results
   - `data`: Array of game objects

3. **Sample Data:**
   - 6 games with realistic data
   - Fields: id, name, developer, platform, releaseYear, rating

4. **Documentation:**
   - JSDoc comments in code
   - Example requests in README
   - Example responses with actual data

### Testing the Backend

```bash
# Start server
npm start

# Test all games
curl http://localhost:5000/api/games

# Test search
curl "http://localhost:5000/api/games?search=zelda"
curl "http://localhost:5000/api/games?search=witcher"
curl "http://localhost:5000/api/games?search=hades"

# Test health check
curl http://localhost:5000/health
```

## 🛠 Technologies Used

### Backend
- **Express.js** 4.18.2 - Web framework
- **Node.js** - JavaScript runtime

### Frontend
- **Next.js** 16.0+ - React framework
- **React** 18+ - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📊 Code Quality

### Backend
- ✅ Modular Express structure
- ✅ Clear separation of concerns
- ✅ Comprehensive JSDoc documentation
- ✅ Error handling
- ✅ Backward compatibility

### Frontend
- ✅ React best practices (hooks, state management)
- ✅ TypeScript for type safety
- ✅ Responsive design
- ✅ Accessibility considerations
- ✅ Clean component structure
- ✅ Comprehensive code comments

## 🔄 Integration

The frontend and backend work together:

1. Frontend loads `/games` page
2. Component uses `useEffect` to fetch from backend
3. Backend API at `http://localhost:5000/api/games` serves data
4. Frontend displays loading → success/error states
5. Search box sends query to backend for filtering
6. Results update in real-time

## 📝 Git Commits

Track implementation progress:

1. **Backend Implementation** - API with search filtering
   ```
   feat: implement API search & filtering for /api/games endpoint
   ```

2. **Frontend Implementation** - Next.js with state handling
   ```
   feat: implement frontend games page with loading and error states
   ```

3. **Documentation** - Comprehensive README files
   ```
   docs: add comprehensive frontend documentation
   ```

## ✨ Key Learning Points

### Ticket 1 - Frontend
- React state management with hooks
- useEffect for side effects and data fetching
- Conditional rendering for multiple states
- Error handling and recovery UI
- Responsive design with Tailwind CSS
- TypeScript for better code safety

### Ticket 2 - Backend
- Query parameter handling in Express
- Array filtering and data manipulation
- Case-insensitive string matching
- API design and response structure
- Backward compatibility
- Code documentation

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Backend
```bash
npm start
```

Or deploy to a platform like Vercel (frontend) and Heroku/Railway (backend).

## 📖 Documentation

- **Backend**: See `README.md` for API documentation
- **Frontend**: See `frontend/README.md` for component details
- **Code Comments**: Comprehensive JSDoc and inline comments throughout

## 🔗 Links

- **GitHub Repository**: https://github.com/findsah/techtest
- **Frontend Code**: `/frontend/src/app/games/page.tsx`
- **Backend Code**: `/server.js`

---

**Implementation Date**: December 2025  
**Status**: Complete ✅  
**Code Quality**: Production-Ready

