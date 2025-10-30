import React from "react";

export default function FeedCard({ title, link }: any) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-sm text-gray-300 hover:text-pink-400 transition truncate"
    >
      {title}
    </a>
  );
}
