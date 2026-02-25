import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import './AppShell.css';

export const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <Navbar />

      {/* ── Parallax Hero Header ── */}
      <header className="parallax-hero">
        <div className="parallax-bg" />
        <div className="parallax-overlay" />
        <div className="parallax-content">
          <h1 className="parallax-title">Cryptonite</h1>
          <p className="parallax-subtitle">Track · Analyze · Invest</p>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="app-footer-left">
          <span>₿</span> CryptoTracker
        </div>
        <span>© {new Date().getFullYear()} — React + TypeScript + OpenAI</span>
        <span>Data: CoinGecko · CryptoCompare</span>
      </footer>
    </div>
  );
};
