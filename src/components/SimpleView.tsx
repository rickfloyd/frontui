import React from "react";
import { ArrowLeft } from "lucide-react";

export default function SimpleView() {
  const goBack = () => {
    window.localStorage.setItem("siteTheme", "neon");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-8">
        Simple View
      </h1>
      <p className="text-cyan-300 mb-10 text-center max-w-lg">
        This is your simplified market interface — lightweight, clean, and distraction-free.
      </p>
      <button
        onClick={goBack}
        className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-cyan-500 
                   text-white font-semibold hover:from-pink-500 hover:to-cyan-400 transition shadow-[0_0_15px_#ec4899]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Original UI</span>
      </button>
    </div>
  );
}