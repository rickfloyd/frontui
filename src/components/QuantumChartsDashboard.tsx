import React from "react";
import {
  QuantumChartsCore,
  QuantumChartsAutoFib,
  QuantumChartsPatternScope,
  QuantumChartsAISignal,
} from "../quantum-engine"; // barrel export optional

export default function QuantumChartsDashboard() {
  const engines = [
    "Core Engine",
    "AutoFib Engine",
    "PatternScope Engine",
    "AI-Signal Engine",
    "Backtest Engine",
    "MT4 Bridge",
    "Liquidity",
    "Depth",
    "Sentiment",
    "NewsFlow",
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
      {engines.map((e) => (
        <div
          key={e}
          className="bg-gradient-to-br from-gray-900 to-cyan-950 border border-cyan-700/40 rounded-xl p-4 hover:shadow-[0_0_15px_#22d3ee60] transition"
        >
          <h3 className="text-cyan-400 font-bold text-lg mb-2">
            Quantum Charts {e}
          </h3>
          <p className="text-gray-400 text-sm">
            Status: <span className="text-green-400">Active</span>
          </p>
        </div>
      ))}
    </div>
  );
}
