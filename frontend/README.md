# Games Library Frontend

A Next.js frontend application that displays a games library with proper loading and error state handling.

## Features

- ✅ **Loading State**: Displays a spinner while fetching data from the API
- ✅ **Error State**: Shows user-friendly error messages when API requests fail
- ✅ **Success State**: Renders games in a responsive grid layout
- ✅ **Search Integration**: Search games by name with real-time backend filtering
- ✅ **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- ✅ **TypeScript**: Fully typed React components
- ✅ **Clean Code**: Well-documented and maintainable code

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

To view the games library, navigate to `http://localhost:3000/games`

### Environment Setup

Make sure the backend API is running on `http://localhost:5000` before testing the games page.

To start the backend:
```bash
cd ..
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page with navigation
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── games/
│   │       └── page.tsx       # Games page with state handling
│   └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Component Details

### GamesPage Component (`src/app/games/page.tsx`)

The main component that handles three distinct states:

#### 1. Loading State
- Displays a spinning loader while fetching data
- Shows "Loading games..." message with helpful text
- Prevents layout shift during loading

#### 2. Error State
- Shows user-friendly error message
- Displays error details for debugging
- Includes a "Refresh Page" button to retry
- Uses red styling to indicate error condition

#### 3. Success State
- Displays games in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- Shows game details: name, developer, platform, release year, and rating
- Implements search functionality that filters games in real-time
- Shows "No results" message when search returns no games

### State Management

```typescript
const [games, setGames] = useState<Game[]>([]);           // Stores fetched games
const [loading, setLoading] = useState(true);             // Loading state
const [error, setError] = useState<string | null>(null);  // Error message
const [searchQuery, setSearchQuery] = useState('');       // Search input
```

### Data Fetching

Uses `useEffect` hook to fetch data when component mounts or search query changes:

```typescript
useEffect(() => {
  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const query = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
      const response = await fetch(`http://localhost:5000/api/games${query}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load game data. Status: ${response.status}`);
      }
      
      const data = await response.json();
      setGames(data.data || []);
    } catch (err) {
      setError('Failed to load game data. Please refresh the page.');
      setGames([]);
    } finally {
      setLoading(false);
    }
  };
  
  fetchGames();
}, [searchQuery]);
```

## Styling

The application uses Tailwind CSS for styling with:
- Dark theme (slate-900 to slate-800 gradient background)
- Blue accent colors for interactive elements
- Red styling for error states
- Yellow for rating displays
- Responsive spacing and grid layouts

## Testing

### Manual Testing Steps

1. **Test Loading State**: The loading spinner should appear briefly when the page loads
2. **Test Success State**: Games should appear in a grid after loading completes
3. **Test Search**: Type in the search box to filter games (e.g., "zelda", "witcher")
4. **Test Error Handling**: Temporarily stop the backend API and refresh to see error state
5. **Test Responsive Design**: Resize the browser window to test mobile and tablet layouts

### API Endpoints Used

- `GET /api/games` - Fetch all games
- `GET /api/games?search=keyword` - Search games by name

## Technologies

- **Next.js 16.x** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript Fetch API** - Data fetching

## Development Best Practices

- ✅ React hooks (useState, useEffect) for state and side effects
- ✅ Error handling and validation
- ✅ Loading state management
- ✅ Responsive mobile-first design
- ✅ Accessibility considerations
- ✅ Clean, readable code with comments
- ✅ TypeScript for type safety

## Build for Production

```bash
npm run build
npm run start
```

## What This Implementation Tests

- React/Next.js state handling
- useEffect and async data fetching
- UI/UX awareness (proper feedback for all states)
- Conditional rendering
- Clean frontend coding practices
- API integration
- Error handling
- Loading states
- Search/filter functionality

