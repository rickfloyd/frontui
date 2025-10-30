import fs from "fs";
import crypto from "crypto";
import { execSync } from "child_process";
import path from "path";

const dirs = ["./src", "./server"];
const hashes = new Set();

function fileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(content).digest("hex");
}

function scan(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}. Skipping.`);
    return;
  }
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) return scan(fullPath);
    const hash = fileHash(fullPath);
    if (hashes.has(hash)) {
      console.log("🧹 Removing duplicate:", fullPath);
      fs.unlinkSync(fullPath);
    } else {
      hashes.add(hash);
    }
  });
}

// Run cleanup + optimization
console.log("🧠 Running Auto Optimizer...");
dirs.forEach(scan);
execSync("npx eslint src --fix", { stdio: "inherit" });
execSync("npx prettier --write .", { stdio: "inherit" });
execSync("npm run build", { stdio: "inherit" });
console.log("✅ Optimization complete!");
