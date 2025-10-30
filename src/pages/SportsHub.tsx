import React, { useEffect, useState } from "react";

export default function SportsHub() {
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.sportsdata.io/v4/nfl/scores/json/Standings/2025?key=0c28b26bd13441dfadf9a5001932be88`
    )
      .then((res) => res.json())
      .then((data) => setSportsData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
        AI Quantum Sports Analytics
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sportsData.slice(0, 12).map((team, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-cyan-500/40 bg-gradient-to-br from-gray-900 to-neutral-900 shadow-[0_0_20px_#22d3ee33]"
          >
            <h2 className="text-xl font-semibold text-pink-400">
              {team.FullName}
            </h2>
            <p className="text-gray-300 text-sm">
              Wins: {team.Wins} | Losses: {team.Losses} | Win %:{" "}
              {(team.Percentage * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}