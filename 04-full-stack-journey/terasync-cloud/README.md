# TeraSync Cloud ☁️

> Premium Link Generator & Downloader for TeraBox files

## 🎯 Project Overview

TeraSync Cloud is a full-stack web application that allows users to extract file information from TeraBox sharing links and download files directly. Built with React (frontend) and Express.js (backend), it provides a seamless experience for managing TeraBox downloads.

## ✨ Features

✅ **Fast Link Processing** - Paste a TeraBox link and instantly get file details
✅ **File Information Display** - See file names, sizes, and metadata
✅ **Direct Download Links** - Get ready-to-use download links for all files
✅ **Modern UI** - Clean, responsive interface built with React
✅ **Real-time API Integration** - Uses TeraBox API via RapidAPI
✅ **Error Handling** - Graceful error messages for invalid links

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **JavaScript/HTML/CSS** - Core web technologies
- **Responsive Design** - Mobile-friendly interface

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **RapidAPI** - TeraBox API integration
- **Axios** - HTTP client for API calls

## 📁 Project Structure

```
terasync-cloud/
├── frontend/           # React application
├── backend/            # Express.js server
├── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- RapidAPI account with TeraBox API access

### Installation

#### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file with:
API_HOST=pb068528-terabox-downloader-direct-download-link-generator.p.rapidapi.com
API_KEY=your_rapidapi_key_here

npm start
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4001`

## 📖 Usage

1. Open the TeraSync Cloud web app
2. Paste a TeraBox sharing link
3. Click "Generate Download Link"
4. View the extracted files with names and sizes
5. Click "Download" to access the sharing page

## 🔧 API Integration

### TeraBox API (via RapidAPI)
- **Endpoint**: `/url` (GET method)
- **Response**: File list with metadata (name, size, file ID, MD5 hash)

## 🎓 Learning Journey

This project was built to practice:
- Full-stack web development
- RESTful API design
- Frontend-backend integration
- Error handling and debugging
- Third-party API integration
- React component development
- Express.js middleware patterns

## 🐛 Known Issues & Solutions

### Issue: 403 Errors from API
**Solution**: Ensure RapidAPI host is correct

### Issue: No download links appearing
**Solution**: Check API response contains file metadata

### Issue: Proxy download not working
**Solution**: TeraBox blocks direct proxy requests; use original domain links

## 🚧 Future Enhancements

- [ ] Batch file downloads
- [ ] File preview functionality
- [ ] Download history tracking
- [ ] User authentication
- [ ] Direct file streaming
- [ ] Mobile app version

## 👤 Author

**Shounak Joshi** - CSE Student | Full-Stack Developer

---

**Built with ❤️ during my full-stack learning journey**
