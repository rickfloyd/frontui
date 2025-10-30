import React from "react";
import QuantumChat from "../components/QuantumChat";
import SenseiPanel from "../qubitsensei/SenseiPanel";

export default function QubitSenseiDemo() {
  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 text-white">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
        Quantum Sensei Demo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[85%]">
        <QuantumChat />
        <SenseiPanel />
      </div>
    </div>
  );
}
