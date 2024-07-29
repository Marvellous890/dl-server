// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/Build a ModernCreative portfolio html css js three js 2022.part1.rar');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));