import { useEffect, useState } from "react";

export default function useNewsFeeds(endpoints: any) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoints.news);
        const data = await res.json();
        if (data.results?.length) {
          setItems(data.results.slice(0, 5));
        } else {
          throw new Error("Empty NewsData");
        }
      } catch {
        try {
          const yt = await fetch(endpoints.youtube);
          const ydata = await yt.json();
          setItems(
            ydata.items?.map((v: any) => ({
              title: v.snippet.title,
              link: `https://www.youtube.com/watch?v=${v.id.videoId}`,
            })) || []
          );
        } catch {
          const reddit = await fetch(endpoints.reddit);
          const rdata = await reddit.json();
          setItems(
            rdata.data.children.map((p: any) => ({
              title: p.data.title,
              link: `https://reddit.com${p.data.permalink}`,
            }))
          );
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [endpoints]);

  return { items, loading };
}
