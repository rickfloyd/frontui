import React from "react";

export default function NeonTheme({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 transition-colors duration-700">
      {children}
    </div>
  );
}
