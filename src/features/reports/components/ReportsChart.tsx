import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { LiveReportPoint } from '../../../types';
import './ReportsChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const COLORS = ['#f0b90b', '#0ecb81', '#f6465d', '#a78bfa', '#38bdf8'];

interface Props {
  history: LiveReportPoint[];
  coinSymbols: string[];
}

export const ReportsChart: React.FC<Props> = React.memo(({ history, coinSymbols }) => {
  const data = useMemo(() => {
    const labels = history.map((p) =>
      new Date(p.timestamp).toLocaleTimeString(),
    );

    const datasets = coinSymbols.map((sym, i) => ({
      label: sym,
      data: history.map((p) => p.prices[sym] ?? 0),
      borderColor: COLORS[i % COLORS.length],
      backgroundColor: `${COLORS[i % COLORS.length]}22`,
      tension: 0.3,
      pointRadius: 2,
      borderWidth: 2,
    }));

    return { labels, datasets };
  }, [history, coinSymbols]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 } as const,
      plugins: {
        legend: { labels: { color: '#eaecef', font: { size: 12, weight: 600 } } },
        title: {
          display: true,
          text: 'Prix en temps réel (USD)',
          color: '#eaecef',
          font: { size: 14, weight: 700 },
          padding: { bottom: 12 },
        },
      },
      scales: {
        x: {
          ticks: { color: '#848e9c', maxTicksLimit: 10, font: { size: 11 } },
          grid: { color: 'rgba(45,55,72,0.6)' },
          border: { color: '#2d3748' },
        },
        y: {
          ticks: { color: '#848e9c', font: { size: 11 } },
          grid: { color: 'rgba(45,55,72,0.6)' },
          border: { color: '#2d3748' },
        },
      },
    }),
    [],
  );

  return (
    <div className="reports-chart">
      <div className="reports-chart-inner">
        <Line data={data} options={options} />
      </div>
    </div>
  );
});

ReportsChart.displayName = 'ReportsChart';
