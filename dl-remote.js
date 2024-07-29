// download a remote file
import { createWriteStream } from 'fs';
import { get } from 'https';
import { formatBytes } from './utils.js';

export function download(link, dest) {
  const file = createWriteStream(dest);

  const request = get(link, function (response) {
    const totalSize = parseInt(response.headers['content-length'], 10);
    let downloadedSize = 0;

    /*response.on('data', (chunk) => {
      downloadedSize += chunk.length;
      const progress = (downloadedSize / totalSize) * 100;
      console.log(`Downloading: ${progress.toFixed(2)}%, ${formatBytes(downloadedSize)} out of ${formatBytes(totalSize)}`);
    });*/

    response.pipe(file);
  });
}

export function downloadCopilot(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, response => {
      if (response.statusCode !== 200) {
        reject(`Error: ${response.statusCode}`);
      }
      const len = parseInt(response.headers['content-length'], 10);
      console.log(`Downloading ${url} (${formatBytes(len)}) to ${dest}`);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      reject(err);
    });
  });
}
