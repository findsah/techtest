const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Simple CORS headers for local dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Sample games/products data
const games = [
  {
    id: 1,
    name: 'The Legend of Zelda: Breath of the Wild',
    developer: 'Nintendo',
    platform: 'Nintendo Switch',
    releaseYear: 2017,
    rating: 9.3
  },
  {
    id: 2,
    name: 'Elden Ring',
    developer: 'FromSoftware',
    platform: 'Multi-platform',
    releaseYear: 2022,
    rating: 9.1
  },
  {
    id: 3,
    name: 'The Witcher 3: Wild Hunt',
    developer: 'CD Projekt Red',
    platform: 'Multi-platform',
    releaseYear: 2015,
    rating: 9.2
  },
  {
    id: 4,
    name: 'Cyberpunk 2077',
    developer: 'CD Projekt Red',
    platform: 'Multi-platform',
    releaseYear: 2020,
    rating: 7.7
  },
  {
    id: 5,
    name: 'Hades',
    developer: 'Supergiant Games',
    platform: 'Multi-platform',
    releaseYear: 2020,
    rating: 9.0
  },
  {
    id: 6,
    name: 'Hollow Knight',
    developer: 'Team Cherry',
    platform: 'Multi-platform',
    releaseYear: 2017,
    rating: 8.7
  }
];

/**
 * GET /api/games
 * 
 * Fetch all games or filter by search query parameter.
 * 
 * Query Parameters:
 *   - search (optional): Filter games by name (case-insensitive)
 * 
 * Example Requests:
 *   GET /api/games                           // Returns all games
 *   GET /api/games?search=zelda              // Returns games with "zelda" in name
 *   GET /api/games?search=Witcher            // Returns games with "witcher" in name
 * 
 * Example Response (with search=zelda):
 * {
 *   "success": true,
 *   "count": 1,
 *   "data": [
 *     {
 *       "id": 1,
 *       "name": "The Legend of Zelda: Breath of the Wild",
 *       "developer": "Nintendo",
 *       "platform": "Nintendo Switch",
 *       "releaseYear": 2017,
 *       "rating": 9.3
 *     }
 *   ]
 * }
 */
app.get('/api/games', (req, res) => {
  const searchQuery = req.query.search;

  let filteredGames = games;

  // Apply search filter if query parameter exists
  if (searchQuery && searchQuery.trim() !== '') {
    const lowerSearchQuery = searchQuery.toLowerCase();
    filteredGames = games.filter(game =>
      game.name.toLowerCase().includes(lowerSearchQuery)
    );
  }

  res.json({
    success: true,
    count: filteredGames.length,
    data: filteredGames
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/games`);
  console.log(`Try: http://localhost:${PORT}/api/games?search=zelda`);
});
