import React, { useState, useEffect } from "react";
import { ArrowLeft, PlusCircle, Trash2, Save, RotateCcw } from "lucide-react";

export default function CustomView() {
  const [widgets, setWidgets] = useState<
    { id: number; title: string; type: string }[]
  >([]);

  // ✅ Load saved layout when page loads
  useEffect(() => {
    const saved = localStorage.getItem("quantumCustomLayout");
    if (saved) {
      setWidgets(JSON.parse(saved));
    } else {
      // Default starting widget
      setWidgets([{ id: 1, title: "Chart", type: "chart" }]);
    }
  }, []);

  // ✅ Auto-save whenever widgets change
  useEffect(() => {
    localStorage.setItem("quantumCustomLayout", JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (type: string) => {
    const id = Date.now();
    setWidgets([...widgets, { id, title: type, type }]);
  };

  const removeWidget = (id: number) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const resetLayout = () => {
    setWidgets([{ id: 1, title: "Chart", type: "chart" }]);
    localStorage.removeItem("quantumCustomLayout");
  };

  const goBack = () => {
    window.localStorage.setItem("siteTheme", "neon");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b border-cyan-500 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Custom View — Build Your Own AI Quantum Dashboard
        </h1>
        <button
          onClick={goBack}
          className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-cyan-500 text-white font-semibold hover:from-pink-500 hover:to-cyan-400 transition shadow-[0_0_15px_#ec4899]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Neon UI</span>
        </button>
      </header>

      {/* Widget Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => addWidget("Chart")}
          className="flex items-center gap-2 px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 transition"
        >
          <PlusCircle className="w-4 h-4" /> Add Chart
        </button>
        <button
          onClick={() => addWidget("News")}
          className="flex items-center gap-2 px-4 py-2 rounded bg-pink-600 hover:bg-pink-500 transition"
        >
          <PlusCircle className="w-4 h-4" /> Add News
        </button>
        <button
          onClick={() => addWidget("AI Insights")}
          className="flex items-center gap-2 px-4 py-2 rounded bg-orange-600 hover:bg-orange-500 transition"
        >
          <PlusCircle className="w-4 h-4" /> Add AI Insight
        </button>
        <button
          onClick={() => addWidget("Economic Calendar")}
          className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition"
        >
          <PlusCircle className="w-4 h-4" /> Add Calendar
        </button>

        {/* Reset Button */}
        <button
          onClick={resetLayout}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          <RotateCcw className="w-4 h-4" /> Reset Layout
        </button>
      </div>

      {/* Widget Area */}
      {widgets.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No widgets yet — add some to start building your dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-lg p-6 shadow-[0_0_20px_#22d3ee33] relative"
            >
              <button
                onClick={() => removeWidget(widget.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-3 text-cyan-400">
                {widget.title}
              </h2>

              {widget.type === "chart" && (
                <div className="h-48 bg-gray-900 border border-cyan-800 rounded-lg flex items-center justify-center text-gray-500">
                  [ Trading Chart Placeholder ]
                </div>
              )}

              {widget.type === "News" && (
                <div className="h-48 bg-gray-900 border border-pink-800 rounded-lg p-4 overflow-auto text-sm text-gray-300">
                  Live Market News & AI Reports...
                </div>
              )}

              {widget.type === "AI Insights" && (
                <div className="h-48 bg-gray-900 border border-orange-800 rounded-lg flex items-center justify-center text-gray-400">
                  Quantum AI Predictions...
                </div>
              )}

              {widget.type === "Economic Calendar" && (
                <div className="h-48 bg-gray-900 border border-green-800 rounded-lg flex items-center justify-center text-gray-400">
                  Economic Calendar Placeholder...
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Save Layout Button (manual backup) */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() =>
            alert("Your layout is already auto-saved locally 🔒")
          }
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold hover:from-cyan-400 hover:to-pink-400 transition shadow-[0_0_15px_#22d3ee88]"
        >
          <Save className="w-5 h-5" /> Save Layout
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 mt-10 border-t border-cyan-800">
        Quantum Charts © 2025 — Your Dashboard, Your Way.
      </footer>
    </div>
  );
}