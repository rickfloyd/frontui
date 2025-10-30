import React from "react";

interface VegasButtonProps {
  videoSrc: string;
  onClick?: () => void;
}

const VegasButton: React.FC<VegasButtonProps> = ({ videoSrc, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative group overflow-hidden rounded-2xl shadow-[0_0_25px_#ec489955] border-2 border-pink-500 hover:shadow-[0_0_40px_#22d3eeaa] transition"
      style={{ width: "200px", height: "120px" }}
    >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition" />
      <span className="absolute bottom-2 left-0 right-0 text-center text-sm font-bold text-pink-400 drop-shadow-lg">
        🎰 LAS VEGAS LIVE
      </span>
    </button>
  );
};

export default VegasButton;
