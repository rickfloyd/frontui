import express from "express";
import cors from "cors";
import { startCapacityChamber } from "../scalability/capacityManager.js";
import os from "os";

const app = express();
app.use(cors());
app.use(express.json());

// Example endpoint
app.get("/api/ping", (req, res) => res.json({ ok: true, msg: "Quantum Charts API alive" }));

app.get("/api/metrics", (_, res) =>
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    load: os.loadavg(),
    workers: process.env.WORKERS || 1,
  })
);

// Cluster start
startCapacityChamber(() => {
  app.listen(process.env.PORT || 8080, () =>
    console.log("⚡ Quantum Charts API worker online")
  );
});
