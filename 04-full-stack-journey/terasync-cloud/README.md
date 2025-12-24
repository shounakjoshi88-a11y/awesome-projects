# TeraSync Cloud ☁️

> **Premium Link Generator & Downloader for TeraBox Files**

A full-stack web application that extracts file information from TeraBox sharing links and provides direct access to download files. Built with React (frontend), Express.js (backend), and RapidAPI integration.

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
