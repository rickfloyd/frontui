// server.cjs
import fs from "fs";
import { exec } from "child_process";
import cron from "node-cron";
import path from "path";
import dotenv from "dotenv";
import bluetooth from "node-bluetooth";

dotenv.config();

const PROJECT_DIR = "C:\\AIQuantumCharts";
const REPO_URL = "https://github.com/rickfloyd/frontui.git";
const FIREBASE_PROJECT = "device-streaming-b33f356a";
const BACKUP_DIR = path.join(PROJECT_DIR, "backup");

function log(msg) {
  const stamp = new Date().toISOString();
  console.log(`[${stamp}] ${msg}`);
  fs.appendFileSync(path.join(PROJECT_DIR, "updater.log"), `[${stamp}] ${msg}\n`);
}

function run(cmd, cwd = PROJECT_DIR) {
  return new Promise((res, rej) =>
    exec(cmd, { cwd }, (err, out, errout) => (err ? rej(errout) : res(out)))
  );
}

// --- Bluetooth scan (info only)
async function scanBluetooth() {
  try {
    const device = new bluetooth.DeviceINQ();
    device.on("finished", () => log("🔵 Bluetooth scan complete."));
    device.on("found", (address, name) =>
      log(`📡 Found device: ${name || "Unknown"} (${address})`)
    );
    device.scan();
  } catch (e) {
    log("⚠️ Bluetooth not available: " + e);
  }
}

// --- Backup before pulling new code
async function backupCurrent() {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dest = path.join(BACKUP_DIR, stamp);
  fs.mkdirSync(dest);
  await run(`xcopy ${PROJECT_DIR} ${dest} /E /I /H /Y`);
  log(`📦 Backup created at ${dest}`);
  return dest;
}

// --- Rollback if deploy fails
async function rollback(lastBackup) {
  if (!lastBackup) return;
  log("⏪ Rolling back to previous backup...");
  await run(`xcopy ${lastBackup}\\* ${PROJECT_DIR} /E /I /H /Y`);
  log("✅ Rollback complete.");
}

// --- Main update routine
async function updateRepo() {
  let backup;
  try {
    log("🔍 Checking for updates...");
    await run("git fetch origin main");
    const diff = await run("git diff origin/main");
    if (!diff.trim()) {
      log("✅ No updates detected.");
      return;
    }

    backup = await backupCurrent();
    await scanBluetooth();

    log("⬇️ Pulling latest changes...");
    await run("git pull origin main");
    await run("npm install");
    await run("npm run build");
    await run(`firebase deploy --project ${FIREBASE_PROJECT}`);
    log("✨ Update and deploy complete.");
  } catch (err) {
    log("❌ Update failed: " + err);
    await rollback(backup);
  }
}

// Run immediately (manual)
if (process.argv.includes("--run-now")) updateRepo();

// Scheduled every 8 h
cron.schedule("0 */8 * * *", updateRepo);

log("🧠 AI Quantum Auto-Updater with self-healing active.");
