import { statSync, openSync, readSync, writeFileSync, closeSync, createReadStream, createWriteStream, readFileSync, unlinkSync, readdirSync } from 'fs';
import { join, } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to split the file into parts based on size
function splitFileBySize(filePath, partSize) {
    let bytesRead = 0;
    let partNumber = 1;

    const readStream = createReadStream(filePath, { highWaterMark: partSize });

    readStream.on('data', (chunk) => {
        const partFileName = `${filePath}.part${partNumber}`;
        const writeStream = createWriteStream(partFileName);
        writeStream.write(chunk);
        writeStream.end();
        console.log(`Created part ${partNumber}: ${partFileName}`);
        bytesRead += chunk.length;
        partNumber++;
    });

    readStream.on('end', () => {
        console.log('File split completed.');
    });

    readStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });
}

// Function to join the parts back into a single file synchronously without sorting
function joinFilesSync(partFiles, outputFileName) {
    const outputStream = createWriteStream(outputFileName);

    partFiles.forEach((partFile, index) => {
        const partFilePath = join(__dirname, partFile);
        const data = readFileSync(partFilePath);
        outputStream.write(data);
        console.log(`Joined part ${index+1}: ${partFile}`);
        unlinkSync(partFilePath); // Remove the part file after it's joined
    });

    outputStream.end();
    console.log(`File joined successfully: ${outputFileName}`);
}

// Example usage
const filePath = __dirname + '/fg-06.bin'; // Change this to the path of your file
const partSize = 2_000_000_000; // Specify the part size in bytes (e.g., 1 MB)

// Split the file into parts based on size
splitFileBySize(filePath, partSize);

// Simulate a delay to ensure all parts are created before joining
// setTimeout(() => {
//     // Define the list of part files
//     const partFiles = readdirSync(__dirname).filter(file => file.startsWith(`${filePath}.part`));
//     // Define the output file name
//     const outputFileName = 'joined_file.rar'; // Change this to desired output file name
//     // Join the parts back into a single file
//     joinFilesSync(partFiles, outputFileName);
// }, 1000); // Adjust this timeout value as necessary
