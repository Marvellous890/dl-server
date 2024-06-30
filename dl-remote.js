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

download('https://download.wetransfer.com/usgv/7a72c938d09a6607b02a91f4163b314420240622095600/2a88bc86e6423b9098231cac62ec39a545bbebbb/bento-cards-v1-multipurpose_NjM0YzVhMGY5MWI3NmIwMDRiZDdkMDY4.zip?cf=y&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRlZmF1bHQifQ.eyJleHAiOjE3MTkwNTgxMTQsImlhdCI6MTcxOTA1NzUxNCwiZG93bmxvYWRfaWQiOiI5MjdjMDI4YS04M2RhLTRlZDAtYjU5Yi02ODM1YmY5NzZmZDciLCJzdG9yYWdlX3NlcnZpY2UiOiJzdG9ybSJ9.w4bixZ3azlQYuj4oofViYcPP90IEzKsbmbu8UIWIKho', 'dlfiles/bento-cards-v1-multipurpose_NjM0YzVhMGY5MWI3NmIwMDRiZDdkMDY4.zip')