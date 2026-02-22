import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import './AppShell.css';

export const AppShell: React.FC = () => (
  <div className="app-shell">
    <Navbar />
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
