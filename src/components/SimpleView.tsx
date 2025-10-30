import React, { useState } from "react";
import { ArrowLeft, Settings, ChevronDown } from "lucide-react";

export default function SimpleView() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const goBack = () => {
    window.localStorage.setItem("siteTheme", "neon");
    window.location.reload();
  };

  const handleSettingsClick = () => {
    // Placeholder for future settings functionality
    console.log("Settings clicked!");
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-8">
        Simple View
      </h1>
      <p className="text-cyan-300 mb-10 text-center max-w-lg">
        This is your simplified market interface — lightweight, clean, and distraction-free.
      </p>
      
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-cyan-500 
                       text-white font-semibold hover:from-pink-500 hover:to-cyan-400 transition shadow-[0_0_15px_#ec4899]"
          >
            <span>Menu</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); goBack(); }}
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                <span>Back to Original UI</span>
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleSettingsClick(); }}
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
