import React, { useEffect, useState } from "react";
import { Activity, BarChart3, Cpu, Newspaper, Zap, Settings } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import QuantumChartsDashboard from "../components/QuantumChartsDashboard";

// ✅ Firebase init
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH,
  databaseURL: import.meta.env.VITE_FIREBASE_DB,
  projectId: "device-streaming-b33f356a",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface Widget {
  id: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}

const defaultWidgets: Widget[] = [
  { id: "markets", label: "Markets", icon: BarChart3, active: true },
  { id: "crypto", label: "Crypto", icon: Zap, active: true },
  { id: "ai", label: "AI Signals", icon: Cpu, active: true },
  { id: "news", label: "News Feed", icon: Newspaper, active: false },
];

const ModularDashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch layout
  useEffect(() => {
    const loadLayout = async () => {
      try {
        const snap = await get(ref(db, "dashboard/layout"));
        if (snap.exists()) setWidgets(snap.val());
      } catch (err) {
        console.error("Layout load failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadLayout();
  }, []);

  // 💾 Save layout
  const saveLayout = async (newLayout: Widget[]) => {
    setWidgets(newLayout);
    await set(ref(db, "dashboard/layout"), newLayout);
  };

  const toggleWidget = (id: string) => {
    const updated = widgets.map((w) =>
      w.id === id ? { ...w, active: !w.active } : w
    );
    saveLayout(updated);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-cyan-400">
        Loading Dashboard…
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-200 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
          AI Quantum Dashboard
        </h1>
        <button
          onClick={() =>
            saveLayout(defaultWidgets.map((w) => ({ ...w, active: true })))
          }
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-cyan-600 rounded-lg text-white font-bold hover:scale-105 transition"
        >
          <Settings className="w-4 h-4" /> Reset Layout
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {widgets.map((w) => (
          <div
            key={w.id}
            className={`p-6 rounded-xl border transition-all duration-300 ${
              w.active
                ? "bg-gradient-to-br from-pink-900/30 to-cyan-900/30 border-cyan-500/40"
                : "bg-black/40 border-gray-800 opacity-40"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <w.icon className="w-6 h-6 text-cyan-400" />
              <button
                onClick={() => toggleWidget(w.id)}
                className="text-sm text-pink-400 hover:text-cyan-400"
              >
                {w.active ? "Hide" : "Show"}
              </button>
            </div>
            <h2 className="text-lg font-bold text-pink-400">{w.label}</h2>
            {w.active ? (
              <div className="mt-3 text-sm text-gray-400">
                {w.id === "markets" && "Market summary widgets here…"}
                {w.id === "crypto" && "Crypto price tracker here…"}
                {w.id === "ai" && "AI signal feed here…"}
                {w.id === "news" && "Live financial headlines here…"}
              </div>
            ) : (
              <div className="mt-3 text-xs italic text-gray-600">
                Widget hidden
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Trading Engines</h2>
        <QuantumChartsDashboard />
      </div>
    </div>
  );
};

export default ModularDashboard;
