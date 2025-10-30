import cluster from "cluster";
import os from "os";

export function startCapacityChamber(startServer: () => void) {
  const cpuCount = Math.min(os.cpus().length, 8); // adjust for cloud size
  if (cluster.isPrimary) {
    console.log(`⚙️ Capacity Chamber active. Launching ${cpuCount} workers...`);
    for (let i = 0; i < cpuCount; i++) cluster.fork();
    cluster.on("exit", () => cluster.fork());
  } else {
    startServer();
  }
}
