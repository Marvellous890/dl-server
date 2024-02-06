import express from 'express';
import { File } from "megajs";
import path from "path";

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));


// a route to serve the homepage
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html');
  res.send('Welcome to Mega Downloader API');
});

app.get('/mega/:link', async (req, res) => {
    const link = req.params.link;
  
    const file = File.fromURL(link);
    await file.loadAttributes();

    console.log(`🌩️ Downloading ${file.name}, size:${formatBytes(file.size)} ... Please wait.`);

    const data = await file.downloadBuffer();

    console.log(`🚀 Download complete!`);

    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Length', file.size);
    res.end(data);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
