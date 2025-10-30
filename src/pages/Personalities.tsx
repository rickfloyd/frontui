import React, { useState } from "react";
import personalities from "../data/personalities.json";
import useNewsFeeds from "../hooks/useNewsFeeds";
import FeedCard from "../components/FeedCard";
import useLivePopup from "../hooks/useLivePopup";
import LivePopup from "../components/LivePopup";

export default function Personalities() {
  const [party, setParty] = useState("Republican");
  const endpoints = personalities[party as keyof typeof personalities];
  const { items, loading } = useNewsFeeds(endpoints);
  const { popup, triggerPopup } = useLivePopup();

  const handlePartyChange = (key: string) => {
    setParty(key);
    triggerPopup(`${key} feed live`, key === "Republican" ? "pink" : "cyan");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-900 text-white p-10">
       <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Political Personalities
      </h1>

      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(personalities).map((key) => (
          <button
            key={key}
            onClick={() => handlePartyChange(key)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              party === key
                ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-[0_0_15px_#ec489988]"
                : "bg-gray-800 text-gray-400 hover:text-cyan-400 hover:shadow-[0_0_10px_#22d3ee55]"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {endpoints.categories.map((cat, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-cyan-500/40 bg-gradient-to-br from-gray-900 to-neutral-900 shadow-[0_0_20px_#22d3ee33]"
          >
            <h2 className="text-lg font-semibold mb-3 text-pink-400">{cat}</h2>
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <ul className="space-y-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700">
                {items.slice(0, 4).map((article: any, j: number) => (
                  <li key={j}>
                    <FeedCard title={article.title} link={article.link} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-lg shadow-[0_0_20px_#22d3eeaa] hover:shadow-[0_0_25px_#ec4899aa] transition"
        >
          ⬅ Back to Dashboard
        </a>
      </div>

      {/* 🔴 Live popup at bottom-right */}
      <LivePopup message={popup.message} color={popup.color} />
    </div>
  );
}
