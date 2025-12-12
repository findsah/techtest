# TechTest API

A simple Express.js backend API for games/products with search filtering capability.

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET /api/games

Fetch all games or filter by search query parameter.

**Query Parameters:**
- `search` (optional): Filter games by name (case-insensitive)

**Examples:**

1. Get all games:
```
GET /api/games
```

Response:
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "name": "The Legend of Zelda: Breath of the Wild",
      "developer": "Nintendo",
      "platform": "Nintendo Switch",
      "releaseYear": 2017,
      "rating": 9.3
    },
    ...
  ]
}
```

2. Search for games (case-insensitive):
```
GET /api/games?search=zelda
```

Response:
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

3. Another example with different search:
```
GET /api/games?search=witcher
```

Response:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 3,
      "name": "The Witcher 3: Wild Hunt",
      "developer": "CD Projekt Red",
      "platform": "Multi-platform",
      "releaseYear": 2015,
      "rating": 9.2
    }
  ]
}
```

## Features

- ✅ Backend-side search filtering
- ✅ Case-insensitive name matching
- ✅ Backward compatible (returns full list when no search parameter)
- ✅ Preserves existing API response structure
- ✅ Clean and readable code
- ✅ Comprehensive documentation

## Implementation Details

The search filtering is implemented in the `GET /api/games` endpoint:

1. Accepts optional `search` query parameter
2. Converts search query to lowercase for case-insensitive matching
3. Filters the games array using `Array.filter()` with `String.includes()`
4. Returns results with count and success status
5. If no search parameter provided, returns all games (default behavior)

## Testing

You can test the API using curl or any HTTP client:

```bash
# Get all games
curl http://localhost:5000/api/games

# Search for games
curl "http://localhost:5000/api/games?search=zelda"
curl "http://localhost:5000/api/games?search=hollow"
```
