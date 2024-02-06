// calculate the size of the file
import fs from "fs";
import { formatBytes } from "./utils.js";

const stats = fs.statSync('/workspaces/dl-server/dlfiles/Ant Design System for Figma 5.6.rar');

const fileSizeInBytes = stats.size;

console.log(formatBytes(fileSizeInBytes));