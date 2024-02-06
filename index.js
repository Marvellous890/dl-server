import express from 'express';
import { File } from "megajs";
import path from "path";
import { writeFileSync } from "fs";
import fg from 'api-dylux'
import { formatBytes } from './utils.js';
import { download } from './dl-remote.js';

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));


// a route to serve the homepage
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html');
  res.send('Welcome to Downloader API');
});

app.get('/mega/:link', async (req, res) => {
  const link = req.params.link;

  const file = File.fromURL(link);
  await file.loadAttributes();

  console.log(`🌩️ Downloading ${file.name}, size:${formatBytes(file.size)} ... Please wait.`);

  const data = await file.downloadBuffer();

  console.log(`🚀 Download complete!`);

  /* send to client */
  // res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
  // res.setHeader('Content-Type', file.type);
  // res.setHeader('Content-Length', file.size);
  // res.end(data);

  // write to file
  const filePath = path.join(__dirname, 'dlfiles', file.name);
  writeFileSync(filePath, data);

  res.send(`Downloaded ${file.name} to dlfiles folder`);
});

app.get('/gdrive/:link', async (req, res) => {
  let resource = await fg.GDriveDl(req.params.link)

  let fileName = resource.fileName;
  
  download(resource.downloadUrl, 'dlfiles/' + fileName);

  res.send(`Downloading ${fileName} in the background`);

});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
