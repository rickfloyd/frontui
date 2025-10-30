import React, { useEffect, useState } from "react";

interface LivePopupProps {
  message: string;
  color?: string;
}

export default function LivePopup({ message, color = "cyan" }: LivePopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  const colorMap: any = {
    pink: "from-pink-600 to-pink-400",
    cyan: "from-cyan-600 to-blue-400",
    orange: "from-orange-500 to-yellow-400",
    green: "from-green-500 to-emerald-400",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`px-6 py-3 rounded-xl font-semibold bg-gradient-to-r ${
          colorMap[color]
        } text-white shadow-[0_0_25px_rgba(255,255,255,0.2)] animate-pulse backdrop-blur-md`}
      >
        ⚡ {message}
      </div>
    </div>
  );
}
