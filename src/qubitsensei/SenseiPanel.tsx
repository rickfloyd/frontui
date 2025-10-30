import React from "react";
import { BrainCircuit } from "lucide-react";
import { useSensei } from "./useSensei";

export default function SenseiPanel() {
  const { context } = useSensei();

  return (
    <div className="fixed top-4 right-4 w-64 bg-black/70 border border-cyan-600/50 rounded-lg shadow-[0_0_20px_#22d3ee55] text-gray-300 p-3 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <BrainCircuit className="w-5 h-5 text-cyan-400" />
        <h3 className="font-bold text-cyan-400">Quantum Sensei Panel</h3>
      </div>
      <div className="text-xs max-h-48 overflow-y-auto space-y-1">
        {context.length === 0
          ? "No context yet."
          : context.map((c, i) => <div key={i}>• {c}</div>)}
      </div>
    </div>
  );
}
