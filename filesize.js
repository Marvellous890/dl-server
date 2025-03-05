// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/[FreeCourseSite.com] Udemy - Blockchain A-Z Build a Blockchain, a Crypto + ChatGPT Prize.part1.rar');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));