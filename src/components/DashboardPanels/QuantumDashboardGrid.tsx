import React from "react";

export default function QuantumDashboardGrid() {
  const panels = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    title: `Quantum Panel ${i + 1}`,
    size: i % 3 === 0 ? "large" : i % 3 === 1 ? "medium" : "small",
  }));

  const sizeClass = (s: string) =>
    s === "large"
      ? "col-span-2 row-span-2"
      : s === "medium"
      ? "col-span-2"
      : "col-span-1";

  return (
    <div className="grid grid-cols-4 auto-rows-[180px] gap-4 p-6 bg-gradient-to-b from-black to-[#1a1a1a]">
      {panels.map((p) => (
        <div
          key={p.id}
          className={`rounded-xl border border-cyan-700/40 bg-gradient-to-br from-gray-900 to-cyan-950/60 shadow-[0_0_20px_#22d3ee40] hover:shadow-[0_0_30px_#22d3ee80] transition ${sizeClass(
            p.size
          )} p-4`}
        >
          <h3 className="text-cyan-400 font-bold mb-2">{p.title}</h3>
          <p className="text-gray-400 text-sm">Status: Active</p>
        </div>
      ))}
    </div>
  );
}
