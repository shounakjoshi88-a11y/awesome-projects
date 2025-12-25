# TeraSync Cloud - Backend Server

🚀 Express.js REST API for TeraBox file extraction

## Overview

This is the backend server for the TeraSync Cloud project. It provides a secure REST API that handles TeraBox link processing and file metadata extraction via RapidAPI integration.

**Tech Stack:**
- Node.js (v14+)
- Express.js
- Axios (HTTP client)
- CORS (Cross-Origin Resource Sharing)
- Environment Variables (.env)

## Setup & Installation

### 1. Prerequisites

```bash
# Check Node.js version
node --version  # v14 or higher
npm --version
```

### 2. Install Dependencies

```bash
cd terasync-backend
npm install
```

Required packages:
- `express` - Web framework
- `axios` - HTTP client for API calls
- `cors` - Enable CORS
- `dotenv` - Load environment variables

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# RapidAPI Configuration
API_HOST=pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com
API_KEY=your_rapidapi_key_here

# Server Configuration
PORT=4001
NODE_ENV=development
```

### 4. Start the Server

```bash
npm start
```

Server will run on `http://localhost:4001`

## Project Structure

```
terasync-backend/
├── index.js           # Main server file
├── .env              # Environment variables (ADD TO .gitignore)
├── .gitignore        # Git ignore rules
├── package.json      # Dependencies & scripts
├── package-lock.json # Locked dependency versions
└── README.md         # This file
```

## API Endpoints

### 1. Extract Files from TeraBox Link

**Endpoint:** `GET /api/files`

**Query Parameters:**
- `url` (required) - TeraBox sharing link

**Example Request:**
```bash
curl "http://localhost:4001/api/files?url=https://www.1024tera.com/wap/share/filelist?surl=..."
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "list": [
      {
        "fs_id": "123456",
        "filename": "document.pdf",
        "size": 5242880,
        "md5": "abc123"
      }
    ]
  }
}
```

**Error Response (400):**
```json
{
  "error": "Invalid TeraBox URL"
}
```

### 2. Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-25T09:15:00Z"
}
```

## Middleware & Configuration

### CORS Configuration

CORS is configured to allow requests from the frontend:

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Error Handling

All errors return proper HTTP status codes:
- `400` - Bad Request (invalid input)
- `403` - Forbidden (API key issues)
- `404` - Not Found (invalid TeraBox link)
- `500` - Server Error (internal issues)

## Key Features

✅ **Secure API Key Management** - Keys stored in .env, not in code
✅ **Input Validation** - Validates TeraBox URLs before API calls
✅ **Error Handling** - Comprehensive error responses
✅ **CORS Enabled** - Allows frontend-backend communication
✅ **Timeout Protection** - 5-second timeout on API calls
✅ **Environment-based Config** - Different settings per environment

## Environment Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `API_HOST` | RapidAPI host | `pb068528-terabox...` |
| `API_KEY` | RapidAPI key | `xxxxxx` |
| `PORT` | Server port | `4001` |
| `NODE_ENV` | Environment | `development` |

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env or use:
PORT=4002 npm start
```

### Cannot Find Module 'express'
```bash
npm install
```

### API Key Invalid (403 Error)
- Verify API_KEY in .env is correct
- Check API_HOST is spelled correctly
- Regenerate key in RapidAPI dashboard

### CORS Errors
- Ensure frontend is running on `http://localhost:3000`
- Update CORS origin if frontend port is different

## Testing with Postman

1. Create new GET request
2. URL: `http://localhost:4001/api/files`
3. Params: `url = [your_terabox_link]`
4. Send request
5. Check response

## Related Documentation

- [`../API.md`](../API.md) - Complete API documentation
- [`../ARCHITECTURE.md`](../ARCHITECTURE.md) - System architecture
- [`../README.md`](../README.md) - Main project documentation

## License

MIT - See main README for details
