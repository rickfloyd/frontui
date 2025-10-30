import React from "react";
import { Users } from "lucide-react";
import LiveUserCount from "./LiveUserCount";

export default function CollabPresence() {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-cyan-950/30 to-pink-950/30 p-4 rounded-lg border border-cyan-700/40">
      <div className="flex items-center gap-2 text-cyan-400 font-semibold">
        <Users className="w-5 h-5" />
        <span>Quantum Community Live Feed</span>
      </div>
      <LiveUserCount />
    </div>
  );
}
