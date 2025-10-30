import React, { useState } from "react";
import { Send, Cpu, Trash2 } from "lucide-react";
import QuantumCopilot from "./QuantumCopilot";

export default function QuantumChat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    const currentInput = input;
    setInput("");

    const reply = await QuantumCopilot.ask(currentInput);
    setMessages((m) => [...m, { sender: "ai", text: reply }]);
  };

  const clearChat = () => setMessages([]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200 w-full h-full rounded-xl border border-cyan-600/40">
      <header className="flex justify-between items-center p-3 border-b border-cyan-600/30">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-cyan-400">Quantum Chat</h2>
        </div>
        <button onClick={clearChat} className="text-gray-500 hover:text-pink-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.sender === "user"
                ? "ml-auto bg-pink-600/30 border border-pink-500/50"
                : "mr-auto bg-cyan-900/30 border border-cyan-500/40"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <footer className="flex items-center border-t border-cyan-600/30 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Quantum…"
          className="flex-1 bg-black/40 text-gray-100 rounded-lg px-3 py-2 border border-gray-700 focus:border-cyan-400 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-gradient-to-r from-pink-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
