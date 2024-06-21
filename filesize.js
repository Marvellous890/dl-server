// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/Emil Kowalski - Animations on the web Updated 5-2024.zip.001');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));