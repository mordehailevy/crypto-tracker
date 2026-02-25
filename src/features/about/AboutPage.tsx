import React from 'react';
import './AboutPage.css';

export const AboutPage: React.FC = () => (
  <div className="about-page">
    <div className="about-header">
      <h1 className="about-title">About <span>Us</span></h1>
      <p className="about-tagline">CryptoTracker — Professional Cryptocurrency Tracking Platform</p>
    </div>

    <div className="about-card">
      <img
        className="about-photo"
        src="https://ui-avatars.com/api/?name=Mordehai+Levy&background=f0b90b&color=080b0f&size=128&bold=true&font-size=0.4"
        alt="Mordehai Levy"
      />
      <h2 className="about-name">Mordehai Levy</h2>
      <p className="about-role">Full Stack Developer</p>
    </div>

    <div className="about-section">
      <h3>📋 Project Description</h3>
      <p>
        <strong>CryptoTracker</strong> is a production-grade professional SPA
        that lets you track the top 100 most popular cryptocurrencies in real time.
      </p>
      <p>
        He built it with live price charts, a personalised coin watchlist,
        and AI-powered investment recommendations via OpenAI.
      </p>
    </div>

    <div className="about-section">
      <h3>🛠 Technologies Used</h3>
      <ul className="about-tech-list">
        <li>React 18 + TypeScript</li>
        <li>Redux Toolkit (Global State)</li>
        <li>React Router v7 (SPA Routing)</li>
        <li>Chart.js + react-chartjs-2 (Charts)</li>
        <li>Axios (HTTP Client)</li>
        <li>CoinGecko API (Crypto Data)</li>
        <li>OpenAI API (AI Recommendations)</li>
        <li>Vite (Build Tool)</li>
        <li>Pure CSS (Styling)</li>
      </ul>
    </div>

    <div className="about-section">
      <h3>✨ Key Features</h3>
      <ul className="about-tech-list">
        <li>100 coins with real-time search</li>
        <li>Select up to 5 coins (localStorage)</li>
        <li>Live price chart (polling)</li>
        <li>AI Analysis — Buy / Do Not Buy</li>
        <li>Feature-Based Architecture, Clean Code, SOLID</li>
      </ul>
    </div>
  </div>
);
