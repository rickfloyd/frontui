import React, { useState } from "react";
import { MessageSquare, Mic, Video } from "lucide-react";

export default function LiveCollabRoom() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { user: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="bg-black/60 border border-cyan-700/40 rounded-xl p-6 flex flex-col h-[500px]">
      <div className="flex items-center gap-3 mb-4 text-cyan-400 font-semibold">
        <MessageSquare className="w-5 h-5" />
        <span>Live Collab Room</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="text-pink-400 font-bold">{m.user}: </span>
            <span>{m.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something to your peers…"
          className="flex-1 bg-gray-900 text-gray-100 rounded-lg px-3 py-2 border border-cyan-700 focus:border-cyan-400 focus:outline-none"
        />
        <button
          onClick={send}
          className="bg-gradient-to-r from-pink-600 to-cyan-600 px-4 py-2 rounded-lg text-white font-bold hover:scale-105 transition"
        >
          Send
        </button>
      </div>

      <div className="flex gap-4 mt-4 text-cyan-500">
        <Mic className="w-5 h-5 cursor-pointer hover:text-pink-400" />
        <Video className="w-5 h-5 cursor-pointer hover:text-pink-400" />
      </div>
    </div>
  );
}
