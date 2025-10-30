import fs from "fs";
import path from "path";

const projectDir = process.cwd();
const errors = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    // Simple exclusion for node_modules and other unecessary folders
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist' && entry.name !== 'build') {
        scanDir(full);
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx") || entry.name.endsWith(".js") || entry.name.endsWith(".jsx")) {
      const data = fs.readFileSync(full, "utf8");
      if (data.includes("console.log(")) errors.push(`⚠️  Console log found in ${full}`);
      if (data.includes("eval(")) errors.push(`🚫 Eval detected in ${full}`);
      if (data.includes("alert(")) errors.push(`⚠️  Alert found in ${full}`);
    }
  }
}

console.log("🔍 Running Quantum Diagnostics...");
scanDir(projectDir);

if (errors.length === 0) console.log("✅ Clean build. No risky code found.");
else {
  console.log(`\n${errors.length} issues detected:`);
  errors.forEach((e) => console.log(e));
}
