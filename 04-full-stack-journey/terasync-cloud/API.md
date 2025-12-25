# API Documentation

## RapidAPI TeraBox Integration

This document provides comprehensive API integration details for the TeraSync Cloud project.

### Base Endpoint

```
https://pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com
```

### Authentication

**Header Requirements:**
```
X-RapidAPI-Key: [Your RapidAPI Key]
X-RapidAPI-Host: pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com
```

### Available Endpoints

#### 1. Extract Files from TeraBox Link

**Endpoint:** `/url`

**Method:** `GET`

**Parameters:**
- `url` (required, string) - TeraBox sharing link
  - Example: `https://www.1024tera.com/wap/share/filelist?surl=Kw_da7vqNpvrJfBIRGLvxg`

**Example Request:**
```bash
curl -X GET "https://pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com/url?url=https://www.1024tera.com/wap/share/filelist" \
  -H "X-RapidAPI-Key: YOUR_API_KEY" \
  -H "X-RapidAPI-Host: pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com"
```

**Response (Success 200):**
```json
{
  "status": "success",
  "data": {
    "list": [
      {
        "fs_id": "123456789",
        "server_filename": "document.pdf",
        "filename": "document.pdf",
        "size": 5242880,
        "md5": "abc123def456",
        "category": 1,
        "isdir": 0
      },
      {
        "fs_id": "987654321",
        "server_filename": "image.jpg",
        "filename": "image.jpg",
        "size": 2097152,
        "md5": "xyz789uvw123",
        "category": 4,
        "isdir": 0
      }
    ]
  }
}
```

**Response (Error):**
```json
{
  "status": "error",
  "message": "Invalid TeraBox URL",
  "code": 400
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `fs_id` | string | File system ID for the file |
| `server_filename` | string | Server-side filename |
| `filename` | string | Display filename |
| `size` | integer | File size in bytes |
| `md5` | string | MD5 hash of the file |
| `category` | integer | File category (1=doc, 4=image, etc.) |
| `isdir` | integer | 0 for file, 1 for directory |

### Common Error Codes

| Code | Error | Solution |
|------|-------|----------|
| 400 | Invalid URL | Verify TeraBox link format |
| 403 | Forbidden | Check API key and host header |
| 404 | Not Found | Link may be expired or invalid |
| 429 | Rate Limited | Wait before making next request |
| 500 | Server Error | Try again later |

### Rate Limiting

- **Free Plan:** 100 requests/month
- **Pro Plan:** 1000 requests/month
- **Enterprise:** Unlimited

Check current quota in RapidAPI dashboard

### Backend Implementation

**Location:** `terasync-backend/index.js`

**Key Route:**
```javascript
app.get('/api/files', async (req, res) => {
  try {
    const teraBoxUrl = req.query.url;
    
    const response = await axios.get(
      'https://pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com/url',
      {
        params: { url: teraBoxUrl },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': process.env.API_HOST
        },
        timeout: 5000
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Frontend Integration

**Location:** `frontend/src/App.js`

**Fetch Example:**
```javascript
const handleExtractFiles = async (teraBoxUrl) => {
  try {
    const response = await fetch(
      `http://localhost:4001/api/files?url=${encodeURIComponent(teraBoxUrl)}`
    );
    const data = await response.json();
    setFiles(data.data.list);
  } catch (error) {
    console.error('Error fetching files:', error);
    setError('Failed to extract files. Please check the URL.');
  }
};
```

### Testing the API

**Using Postman:**
1. Create a new GET request
2. URL: `https://pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com/url`
3. Params: `url = [TeraBox Link]`
4. Headers: Add X-RapidAPI-Key and X-RapidAPI-Host
5. Send and view response

**Using cURL:**
```bash
curl -X GET "https://pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com/url?url=YOUR_TERABOX_LINK" \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -H "X-RapidAPI-Host: pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com"
```

### Troubleshooting

**Q: Getting 403 Forbidden error**
- A: Check that API key and host are correct in .env file

**Q: Empty file list returned**
- A: Verify the TeraBox URL is still valid (links can expire)

**Q: Timeout errors**
- A: TeraBox API may be slow, increase timeout in backend to 10s

**Q: Rate limit exceeded**
- A: Implement request caching or upgrade RapidAPI plan

### Related Files

- [`README.md`](README.md) - Main project documentation
- [`ARCHITECTURE.md`](ARCHITECTURE.md) - System architecture overview
- [`terasync-backend/README.md`](terasync-backend/README.md) - Backend setup
- [RapidAPI Console](https://rapidapi.com/user/dashboard) - Check API usage and keys

### Last Updated

December 25, 2025
