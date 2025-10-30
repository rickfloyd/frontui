import React from "react";
import { Gamepad2, Rocket, Trophy } from "lucide-react";

export default function QuantumGameHub() {
  const games = [
    { icon: <Gamepad2 className="w-6 h-6 text-pink-400" />, title: "Crypto Quest" },
    { icon: <Rocket className="w-6 h-6 text-cyan-400" />, title: "Forex Runner" },
    { icon: <Trophy className="w-6 h-6 text-orange-400" />, title: "Trading Arena" },
  ];

  return (
    <div className="bg-gradient-to-t from-black to-[#111] border-t border-cyan-700/30 p-8 text-center">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Quantum Game Systems</h2>
      <div className="flex justify-center gap-8">
        {games.map((g) => (
          <div
            key={g.title}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-900 to-cyan-950/50 border border-cyan-700/40 hover:scale-105 transition"
          >
            {g.icon}
            <p className="text-gray-300 mt-2">{g.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
