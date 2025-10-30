import React, { useState } from 'react';
import CustomView from './CustomView';
import SimpleView from './SimpleView';

const NeonTheme: React.FC<{ switchTheme: () => void }> = ({ switchTheme }) => {
  const [mainView, setMainView] = useState('Simple View');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
      <div className="max-w-[1400px] mx-auto px-6 py-6 w-full">
        <div className="mb-6 flex space-x-2">
          <button
            onClick={() => setMainView('Simple View')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg transform hover:scale-105 ${
              mainView === 'Simple View'
                ? 'bg-cyan-400 text-white border-2 border-cyan-300 shadow-cyan-400/50 glow'
                : 'bg-gray-900 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400'
            }`}
          >
            Simple View
          </button>
          <button
            onClick={() => setMainView('Custom View')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg transform hover:scale-105 ${
              mainView === 'Custom View'
                ? 'bg-cyan-400 text-white border-2 border-cyan-300 shadow-cyan-400/50 glow'
                : 'bg-gray-900 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400'
            }`}
          >
            Custom View
          </button>
          <button
            onClick={switchTheme}
            className="px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg transform hover:scale-105 bg-gray-900 text-purple-300 border border-purple-400/30 hover:bg-purple-400/10 hover:border-purple-400"
          >
            Switch to Minimal Theme
          </button>
        </div>
        <div className="mt-6">
          {mainView === 'Simple View' ? <SimpleView /> : <CustomView />}
        </div>
      </div>

      <style jsx>{`
        .glow {
          box-shadow: 0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 40px #06b6d4;
        }
      `}</style>
    </div>
  );
};

export default NeonTheme;
