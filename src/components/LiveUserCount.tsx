import React, { useEffect, useState } from "react";

export default function LiveUserCount({ fixed = false }: { fixed?: boolean }) {
  const [count, setCount] = useState(
    Math.floor(1000 + Math.random() * 671)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((p) => {
        let n = p + Math.floor(Math.random() * 30 - 15);
        if (n < 1000) n = 1000;
        if (n > 1671) n = 1671;
        return n;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`flex items-center gap-2 text-cyan-400 text-sm font-semibold ${
        fixed
          ? "fixed top-4 right-6 bg-black/50 px-3 py-2 rounded-lg border border-cyan-600/30 backdrop-blur-md shadow-[0_0_15px_#22d3ee55] z-50"
          : ""
      }`}>
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span>{count.toLocaleString()} online</span>
    </div>
  );
}
