// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/Build a 3D Site Without Code with Framer.zip');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));