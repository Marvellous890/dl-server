// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

// eg dlfiles/UI Kit & Design System for Figma.zip
const stats = fs.statSync(process.argv[2]);

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));