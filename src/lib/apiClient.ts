const servers = [
  "https://us.quantumcharts.app",
  "https://eu.quantumcharts.app",
  "https://asia.quantumcharts.app",
];

export async function qcFetch(path: string, opts: RequestInit = {}) {
  const server = servers[Math.floor(Math.random() * servers.length)];
  const res = await fetch(`${server}/api${path}`, opts);
  if (!res.ok) throw new Error("Quantum server busy");
  return res.json();
}
