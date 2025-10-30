import React, { useState } from "react";
import { QuantumSanitizerShield } from "../security/QuantumSanitizerShield";

const shield = new QuantumSanitizerShield();

export default function QuantumCopilot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!shield.isSafe(query)) {
      setResponse("⚠️ Suspicious input blocked by Quantum Shield.");
      return;
    }
    const clean = shield.sanitize(query);
    const res = await fetch("/api/quantumcopilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: clean }),
    });
    const data = await res.json();
    setResponse(data.output || "No response.");
  };

  return (
    <div className="p-6 bg-black/60 rounded-xl border border-cyan-700/30 text-gray-100">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask Quantum Copilot..."
        className="w-full bg-black/40 p-2 rounded border border-cyan-600 focus:border-cyan-400 mb-3"
      />
      <button
        onClick={handleAsk}
        className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-pink-600 rounded text-white font-bold"
      >
        Ask
      </button>
      <div className="mt-4 text-sm text-cyan-300 whitespace-pre-wrap">{response}</div>
    </div>
  );
}
