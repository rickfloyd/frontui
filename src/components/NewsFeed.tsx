import React from "react";
import styles from "./App.module.css";

const mockNews = [
  { title: "Fed Hikes Rates Again", source: "Reuters", url: "#" },
  { title: "Bitcoin Hits New Highs", source: "CoinDesk", url: "#" },
  { title: "AI Stocks Rally", source: "Bloomberg", url: "#" },
];

export const NewsFeed: React.FC = () => (
  <div className={styles.newsFeed}>
    <h3 className={styles.newsFeedTitle}>News & Magazines</h3>
    <ul className={styles.newsFeedList}>
      {mockNews.map((item, idx) => (
        <li key={idx} className={styles.newsFeedItem}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <strong>{item.title}</strong> <span>({item.source})</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);