// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/Milan Jovanovic - Modular Monolith Architecture.zip.002');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));