const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8888;
const distPath = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  console.log(`Request for: ${req.url}`);
  
  let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);
  
  // Handle SPA routing - serve index.html for any non-asset requests
  if (!path.extname(filePath) && !filePath.includes('assets')) {
    filePath = path.join(distPath, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`File not found: ${filePath}, serving index.html`);
        // If file not found, serve index.html (SPA fallback)
        fs.readFile(path.join(distPath, 'index.html'), (err, data) => {
          if (err) {
            console.error('Error serving index.html:', err);
            res.writeHead(500);
            res.end('Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
          }
        });
      } else {
        console.error('Server error:', err);
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      const headers = { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
      res.writeHead(200, headers);
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Serving files from: ${distPath}`);
  console.log('Files in dist:');
  try {
    const files = fs.readdirSync(distPath);
    files.forEach(file => {
      console.log(`  - ${file}`);
    });
  } catch (err) {
    console.error('Error reading dist directory:', err);
  }
});