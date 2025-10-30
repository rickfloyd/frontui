import React, { useRef, useEffect } from "react";
import { createChart, IChartApi } from "lightweight-charts";
import styles from "./App.module.css";

interface ChartCanvasProps {
  data?: { time: string; value: number }[];
}

export const ChartCanvas: React.FC<ChartCanvasProps> = ({ data = [] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: 400,
      layout: { background: { color: "#111" }, textColor: "#0ff" },
      grid: { vertLines: { color: "#222" }, horzLines: { color: "#222" } },
    });
  const series = chartRef.current.addLineSeries();
  series.setData(data);
    return () => chartRef.current?.remove();
  }, [data]);

  return <div ref={chartContainerRef} className={styles.chartCanvas} />;
};