// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/Figma UI UX Design Advanced.rar');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));