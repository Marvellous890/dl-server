// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/Auto Layout - The Boring Guide.zip');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));