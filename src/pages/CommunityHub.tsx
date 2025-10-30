import React from "react";
import CollabPresence from "../../src/components/CollabPresence";
import LiveCollabRoom from "../../src/components/LiveCollabRoom";

export default function CommunityHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-8 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          Quantum Community Hub
        </h1>
        <CollabPresence />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold text-pink-400 mb-3">Discussion Room</h2>
          <LiveCollabRoom />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-3">Announcements</h2>
          <div className="bg-black/50 border border-cyan-700/40 rounded-xl p-6 text-gray-300 text-sm space-y-3">
            <p>🎉 Welcome to the Quantum Community Beta Build!</p>
            <p>🧠 Collaborate on market analysis and strategy in real-time.</p>
            <p>💬 Your feedback shapes the AI Quantum experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
