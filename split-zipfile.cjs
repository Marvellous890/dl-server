const { exec } = require('child_process');

// Replace 'file.zip' with your file name
// Replace 'part' with the prefix for the output files
// Replace '5m' with the maximum size for each part
const command = 'zip -s 5m -r file.zip.part file.zip';

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});