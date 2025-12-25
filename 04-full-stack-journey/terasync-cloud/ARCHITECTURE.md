# TeraSync Cloud - System Architecture

## Overview

TeraSync Cloud is a full-stack web application designed with a clear separation between frontend and backend. This document outlines the system architecture, component interactions, and data flow.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                          │
│              (React.js Frontend - Port 3000)                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  TeraSync Cloud UI Components                        │  │
│  │  ├── Input Form (paste TeraBox URL)                 │  │
│  │  ├── File List Display                              │  │
│  │  ├── Download Buttons                               │  │
│  │  └── Error Messages & Loading States                │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ HTTP GET/POST Requests
                   │ (Axios/Fetch)
                   │
┌──────────────────▼──────────────────────────────────────────┐
│           Express.js Backend (Port 4001)                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes & Controllers                            │  │
│  │  ├── GET /api/files                                 │  │
│  │  │   └── Validates URL → Calls RapidAPI            │  │
│  │  │       └── Returns file list                      │  │
│  │  ├── GET /health                                    │  │
│  │  └── Error Handlers (CORS, validation, etc.)       │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          │ Axios HTTP Request               │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware Stack                                    │  │
│  │  ├── CORS Handler                                   │  │
│  │  ├── Body Parser                                    │  │
│  │  └── Error Handler                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ API Call with Headers
                   │ (API_KEY, API_HOST)
                   │
┌──────────────────▼──────────────────────────────────────────┐
│            RapidAPI Gateway                                 │
│                                                              │
│   pb068528-terabox-downloader                              │
│   Direct Download Link Generator                            │
│                                                              │
│   GET /url?url=[terabox_sharing_link]                      │
│   Returns: File metadata (name, size, md5, fs_id)          │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ API Response JSON
                   │
┌──────────────────▼──────────────────────────────────────────┐
│            TeraBox Servers                                  │
│                                                              │
│   File metadata and sharing information                     │
└──────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React.js (Create React App)
- **Language**: JavaScript (ES6+)
- **HTTP Client**: Axios / Fetch API
- **Styling**: CSS3 with Responsive Design
- **State Management**: React Hooks (useState, useEffect)
- **Port**: 3000 (development)

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **HTTP Client**: Axios
- **CORS**: Express-CORS middleware
- **Environment Config**: dotenv
- **Port**: 4001 (development)

### External Services
- **RapidAPI**: Gateway for TeraBox API access
- **TeraBox**: File sharing platform

## Data Flow

### 1. User Input → File Extraction

```
User enters TeraBox link
         │
         ▼
Frontend validates URL
         │
         ▼
Frontend sends GET /api/files?url=...
         │
         ▼
Backend receives request
         │
         ├── Validate URL format
         │
         ├── Prepare RapidAPI headers
         │   ├── X-RapidAPI-Key
         │   └── X-RapidAPI-Host
         │
         ▼
Backend calls RapidAPI endpoint
         │
         ▼
RapidAPI queries TeraBox
         │
         ▼
Response: File metadata array
  {
    fs_id: "123",
    filename: "document.pdf",
    size: 5242880,
    md5: "abc123"
  }
         │
         ▼
Backend returns to Frontend
         │
         ▼
Frontend renders file list
         │
         ▼
User can see and download files
```

## Component Structure

### Frontend Components

```
App.js (Main Component)
├── InputSection
│   └── Form with URL input field
├── LoadingSpinner
│   └── Shows during API request
├── ErrorDisplay
│   └── Shows error messages
└── FileList
    ├── FileItem (for each file)
    │   ├── File name
    │   ├── File size (formatted)
    │   └── Download button
    └── Summary (total files, total size)
```

### Backend Structure

```
index.js (Main Server)
├── Middleware Setup
│   ├── CORS configuration
│   ├── Express JSON parser
│   └── Request logging
├── Route Handlers
│   ├── GET /api/files
│   │   ├── URL validation
│   │   ├── RapidAPI call
│   │   └── Response formatting
│   └── GET /health
│       └── Server status check
└── Error Handlers
    ├── Global error handler
    └── 404 handler
```

## Data Models

### FileItem (from API response)
```javascript
{
  fs_id: String,           // File system ID
  filename: String,        // Display name
  server_filename: String, // Server-side name
  size: Number,           // Bytes
  md5: String,            // File hash
  category: Number,       // File type (1=doc, 4=image, etc.)
  isdir: Number          // 0=file, 1=directory
}
```

### API Response
```javascript
{
  status: "success",
  data: {
    list: [FileItem, FileItem, ...]
  }
}
```

## Request/Response Cycle

### Example Request
```
GET http://localhost:4001/api/files?url=https://www.1024tera.com/wap/share/filelist?surl=...
```

### Example Response
```json
{
  "status": "success",
  "data": {
    "list": [
      {
        "fs_id": "123456",
        "filename": "document.pdf",
        "size": 5242880,
        "md5": "abc123def456"
      }
    ]
  }
}
```

## Security Considerations

### 1. API Key Management
- **Storage**: Environment variables (.env file)
- **Protection**: Added to .gitignore
- **Rotation**: Can be regenerated in RapidAPI dashboard

### 2. Input Validation
- **Frontend**: URL format validation
- **Backend**: URL validation before API call
- **Prevention**: Protects against malformed requests

### 3. CORS Policy
- **Origin**: Only localhost:3000 allowed
- **Purpose**: Prevents unauthorized cross-origin requests
- **Credentials**: Enabled for authenticated requests

### 4. Error Handling
- **Messages**: Don't expose sensitive information
- **Logging**: Errors logged server-side
- **HTTP Status**: Proper status codes returned

## Performance Considerations

### Frontend Optimization
- React component memoization
- Event handler optimization with useCallback
- Conditional rendering for loading states
- CSS media queries for responsive design

### Backend Optimization
- Request timeout (5 seconds)
- Rate limiting awareness
- Minimal middleware stack
- Direct API passthrough without transformation

## Error Handling Flow

```
User enters URL
     │
     ▼
   Valid?
   ├─ No → Show error message
   │
   └─ Yes → Send to backend
            │
            ▼
         API call to RapidAPI
            │
       ┌────┴────┐
       │         │
       ▼         ▼
    Success   Error
       │         │
       │         ├─ 403 → Invalid API key
       │         ├─ 404 → Invalid TeraBox link
       │         ├─ 429 → Rate limited
       │         └─ 500 → Server error
       │
       ▼
   Return files
       │
       ▼
   Render list
```

## Deployment Considerations

### Frontend Deployment
- Build: `npm run build`
- Host: Vercel, Netlify, or static hosting
- Environment: Update API endpoint from localhost:4001

### Backend Deployment
- Host: Heroku, Railway, or VPS
- Environment: Set API_KEY and API_HOST via platform variables
- Port: Use process.env.PORT for dynamic port assignment

## Future Architecture Improvements

1. **Database Integration**
   - Store download history
   - User preferences
   - Cache API responses

2. **Authentication**
   - User accounts
   - JWT tokens
   - Session management

3. **Caching**
   - Redis for API response caching
   - Reduce RapidAPI calls

4. **Microservices**
   - Separate file extraction service
   - Link validation service
   - Analytics service

5. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - API usage analytics

## Related Documentation

- [README.md](README.md) - Main project overview
- [API.md](API.md) - Complete API reference
- [terasync-backend/README.md](terasync-backend/README.md) - Backend setup guide

## Last Updated

December 25, 2025
