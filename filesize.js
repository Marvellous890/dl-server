// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('dlfiles/Next Level CSS Creative Hover & Animation Effects Updated 5-2022 [1080P].part2.rar');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));