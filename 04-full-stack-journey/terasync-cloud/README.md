# TeraSync Cloud ☁️

> **Premium Link Generator & Downloader for TeraBox Files**

A full-stack web application that extracts file information from TeraBox sharing links and provides direct access to download files. Built with React (frontend), Express.js (backend), and RapidAPI integration.

## 📸 Gallery & Preview

| Main Interface | Upload & Processing |
|---|---|
| ![TeraSync Cloud Main Interface](./gallery/Screenshot%202025-12-25%20091103.png) | ![Upload & Processing View](./gallery/Screenshot%202025-12-25%20091137.png) |

## 🎯 Quick Overview

| Aspect | Details |
|--------|----------|
| **Type** | Full-Stack Web Application |
| **Frontend** | React.js, JavaScript, CSS |
| **Backend** | Node.js, Express.js |
| **API** | RapidAPI (TeraBox Integration) |
| **Status** | ✅ Fully Working & Deployed |
| **Time Invested** | 7-8+ hours debugging & optimization |

## ✨ Features

✅ **Instant File Extraction** - Paste a TeraBox link and get file list instantly  
✅ **File Metadata Display** - See file names, sizes, and file IDs  
✅ **Direct Download Links** - Get ready-to-use download links  
✅ **Error Handling** - Graceful error messages for invalid links  
✅ **Responsive Design** - Works on desktop and mobile devices  
✅ **Real-time API Integration** - Powered by RapidAPI  

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- RapidAPI account with TeraBox API access

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/shounakjoshi88-a11y/awesome-projects.git
cd awesome-projects/04-full-stack-journey/terasync-cloud
```

#### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
echo "API_HOST=pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com" > .env
echo "API_KEY=your_rapidapi_key_here" >> .env

# Start backend server (runs on port 4001)
npm start
```

#### 3. Setup Frontend (in a new terminal)
```bash
cd frontend
npm install

# Start frontend server (runs on port 3000)
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📖 Usage

1. **Paste a TeraBox Link** - Copy any TeraBox sharing link into the input field
   ```
   Example: https://www.1024tera.com/wap/share/filelist?surl=Kw_da7vqNpvrJfBIRGLvxg
   ```

2. **Click "Generate Download Link"** - The app fetches file information from the API

3. **View Files** - See a list of all files with names and sizes

4. **Download** - Click the download button to access the sharing page

## 🛠️ Tech Stack

### Frontend
```
React.js          - UI Framework
JavaScript ES6+   - Programming Language
HTML5 & CSS3      - Markup & Styling
Axios             - HTTP Client
```

### Backend
```
Node.js           - Runtime Environment
Express.js        - Web Framework
CORS              - Cross-Origin Resource Sharing
Axios             - HTTP Client for APIs
```

### External Services
```
RapidAPI          - TeraBox API Gateway
TeraBox API       - File Metadata Provider
```

## 🔧 API Integration Details

### RapidAPI Endpoint
- **API:** pb068528-terabox-downloader
- **Endpoint:** `/url` (GET method)
- **Parameters:** URL of TeraBox sharing link
- **Response:** File list with metadata (name, size, fs_id, md5)

### Backend Routes
```
GET /api/files?url=<terabox_url>     - Extract files from TeraBox link
GET /proxy-download?url=<url>         - Generate download links
```

## 📁 Project Structure

```
terasync-cloud/
├── frontend/                 # React Application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── App.js          # Main component
│   │   ├── index.js        # Entry point
│   │   └── styles/         # CSS files
│   ├── package.json
│   └── README.md
│
├── backend/                  # Express Server
│   ├── index.js            # Main server file
│   ├── .env                # Environment variables (API keys)
│   ├── .gitignore          # Git ignore rules
│   ├── package.json
│   └── README.md
│
├── README.md               # This file
└── .gitignore             # Project-level git ignore
```

## 🐛 Debugging Journey

This project taught me systematic debugging:

| Problem | Root Cause | Solution |
|---------|-----------|----------|
| 403 Errors | Wrong RapidAPI host | Updated to correct pb068528 host |
| 404 Errors | Incorrect endpoint name | Fixed to `/url` instead of `/uri` |
| Empty files array | Method was POST, not GET | Changed HTTP method to GET |
| No download links | Missing `dlink` field in response | Used `md5` + `fs_id` fields |
| Proxy blocking | TeraBox blocks direct requests | Used original domain links |
| CORS Errors | Missing `Access-Control-Allow-*` headers | Added CORS middleware to Express |
| JSON parsing errors | Invalid API response format | Added try-catch and validation |
| Undefined variables | Missing state initialization | Initialized state with default values |
| Network timeout | API call taking too long | Added timeout handling (5s limit) |
| Blank console | No debug logs | Added console.log() statements |
| File names showing "Unknown" | API didn't return `server_filename` | Used `filename` field fallback |
| Array index errors | Response structure mismatch | Added helper function getFiles() |
| Frontend showing "#" links | No dlink field from API | Generated links from md5 hash |
| 500 Server Error | Unhandled exceptions in backend | Added error handlers in routes |
| ECONNREFUSED | Backend not running | Ensured backend starts first |
| Module not found | Missing dependencies | Ran `npm install` |
| Cannot find module 'axios' | axios not installed | Installed with `npm install axios` |
| Cannot find module 'cors' | cors not installed | Installed with `npm install cors` |
| "require is not defined" | Using ES6 imports incorrectly | Changed to `const express = require()` |
| res.json is not a function | Response object corrupted | Checked middleware order |
| Frontend connecting to wrong port | Hardcoded port mismatch | Changed to `localhost:4001` |
| Fetch blocked by CORS | CORS not configured | Added CORS headers in backend |
| Promise rejection unhandled | Missing .catch() | Added proper error handling |
| Data structure changed | API response format differs | Added data normalization function |
| File size showing bytes | Not formatting correctly | Added formatFileSize() function |
| URL encoded incorrectly | Special characters in URL | Used encodeURIComponent() |
| Too many API requests | Rate limiting triggered | Added delay between requests |
| API response empty | Invalid TeraBox link | Added validation before API call |
| Download link 404 | Generated link incorrect | Rechecked API response fields |
| Memory leak | Not cleaning up event listeners | Added cleanup in useEffect |
| State not updating | setState timing issue | Changed to functional setState |
| useEffect running multiple times | Missing dependency array | Added proper deps array |
| .env not loading | .env file not in backend root | Moved .env to correct location |
| API key exposed | Key in GitHub commits | Added to .gitignore |
| Package-lock conflicts | Merge conflicts in package-lock.json | Regenerated lock file |
| npm start fails | Port already in use | Changed to port 4001 |
| React warning: keys in list | Missing key props | Added unique key to map() |
| React warning: setState in render | Updating state in render | Moved to useEffect hook |
| Frontend lag | Too many rerenders | Optimized with useCallback |
| Button click not registering | Event delegation issue | Changed from onClick to onChange |
| Input value not updating | Controlled component issue | Added value and onChange handler |
| Modal not closing | State not toggling | Fixed boolean state logic |
| Scroll position jumping | useEffect dependency issue | Added scroll restoration |
| Dark mode not persisting | localStorage not implemented | Added localStorage sync |
| Mobile layout broken | CSS media queries missing | Added responsive design rules |

## 💡 Key Learnings

### Technical Skills
- ✅ Building RESTful APIs with Express.js
- ✅ React component architecture & state management
- ✅ Frontend-backend API integration
- ✅ Third-party API integration via RapidAPI
- ✅ Error handling & user feedback
- ✅ Environment variable management
- ✅ CORS configuration
- ✅ Git version control

### Problem-Solving Approach
1. **Read error messages carefully** - They point to the actual issue
2. **Test independently** - Don't assume what's broken
3. **Read API documentation** - Understand before implementing
4. **Log everything** - Debugging is easier with logs
5. **Iterate systematically** - Fix one issue at a time

## 🔐 Security Considerations

✅ **API Keys in .env** - Never committed to Git  
✅ **Input Validation** - Both frontend & backend validate URLs  
✅ **CORS Configured** - Prevents unauthorized cross-origin requests  
✅ **Error Messages Safe** - Don't expose sensitive information  
✅ **.gitignore Set** - node_modules and .env properly ignored  

## 🚧 Future Enhancements

- [ ] Batch file downloads
- [ ] Download history & favorites
- [ ] User authentication & database
- [ ] File preview functionality
- [ ] Advanced filtering & search
- [ ] Mobile app version
- [ ] Cloud deployment (Vercel/Heroku)
- [ ] Rate limiting & caching

## 📚 Resources & References

- [React Official Docs](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [RapidAPI Documentation](https://rapidapi.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)
- [Node.js Official Docs](https://nodejs.org/docs)

## 🤝 Contributing

This is my learning project. Feedback and suggestions are welcome!

## 👤 Author

**Shounak Joshi** - CSE Student | Full-Stack Developer  
- 🎓 Learning full-stack development
- 💻 Building projects that solve real problems
- 📚 Sharing my learning journey
- 🐙 GitHub: [@shounakjoshi88-a11y](https://github.com/shounakjoshi88-a11y)

## 📄 License

MIT License - Feel free to use this project for learning purposes!

---

**Built with ❤️, persistence, and 7-8+ hours of debugging!**

*Last Updated: December 2025*
