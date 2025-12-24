const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

function formatBytes(bytes) {
  if (bytes === 0 || bytes === null || bytes === undefined) return 'Unknown';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function getTeraBoxDownloadLink(originalUrl) {
  try {
    console.log('📥 Extracting download link from TeraBox URL...');
    
    // Extract the domain from original URL
    const domainMatch = originalUrl.match(/https?:\/\/([^/]+)/);
    const domain = domainMatch ? domainMatch[1] : 'www.1024tera.com';
    console.log('Extracted domain:', domain);
    
    const surlMatch = originalUrl.match(/surl=([^&?]+)/);
    if (!surlMatch) {
      throw new Error('Invalid TeraBox URL');
    }
    
    const surl = surlMatch[1];
    console.log('Extracted surl:', surl);
    
    const response = await axios.get(
      `https://www.terabox.com/share/list`,
      {
        params: {
          app_id: 250528,
          shorturl: surl,
          root: 1
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 15000
      }
    );
    
    console.log('\n✅ Response received:', response.status);
    
    if (response.data && response.data.list && response.data.list.length > 0) {
      const files = response.data.list.map((item, index) => {
        const fileName = item.server_filename || `File ${index + 1}`;
        const sizeBytes = parseInt(item.size) || 0;
        const sizeFormatted = formatBytes(sizeBytes);
        
        // Use the ORIGINAL domain from the input URL
        const downloadLink = `https://${domain}/wap/share/filelist?surl=${surl}`;
        
        console.log(`\n📄 File ${index + 1}: ${fileName}`);
        console.log(`   Size: ${sizeFormatted}`);
        console.log(`   Download link: ${downloadLink}`);
        
        return {
          file_name: fileName,
          name: fileName,
          link: downloadLink,
          download_link: downloadLink,
          size: sizeFormatted,
          sizebytes: item.size,
          category: item.category || 'file'
        };
      });
      
      console.log('\n✅ Successfully extracted', files.length, 'file(s)');
      return files;
    } else {
      throw new Error('No files found');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

app.get("/download", async (req, res) => {
  try {
    const url = req.query.url;
    
    console.log('\n=== DOWNLOAD REQUEST ===');
    console.log('URL:', url);

    if (!url) {
      return res.status(400).json({ 
        success: false,
        error: "URL is required" 
      });
    }

    const files = await getTeraBoxDownloadLink(url);
    
    res.json({ 
      success: true,
      data: files
    });

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "✅ Backend running" });
});

app.listen(PORT, () => {
  console.log(`\n✅ Server on http://localhost:${PORT}`);
});
