import React from 'react';
import { useAiRecommendation } from './hooks/useAiRecommendation';
import { AiRecommendation } from './components/AiRecommendation';
import { EmptyState, ErrorState, Loader } from '../../components/common';
import './AiPage.css';

export const AiPage: React.FC = () => {
  const {
    selectedCoins,
    recommendations,
    loadingCoinId,
    error,
    requestRecommendation,
  } = useAiRecommendation();

  if (selectedCoins.length === 0) {
    return (
      <div className="ai-page">
        <div className="ai-header">
          <div className="ai-header-left">
            <h1 className="ai-title">🤖 AI Recommendations</h1>
            <p className="ai-subtitle">Market analysis powered by OpenAI</p>
          </div>
          <span className="ai-powered-badge">✦ GPT-4o</span>
        </div>
        <div className="ai-empty">
          <div className="ai-empty-icon">🤖</div>
          <EmptyState text="Select cryptocurrencies on the Market page to get AI recommendations." />
        </div>
      </div>
    );
  }

  return (
    <div className="ai-page">
      <div className="ai-header">
        <div className="ai-header-left">
          <h1 className="ai-title">🤖 AI Recommendations</h1>
          <p className="ai-subtitle">Analysis based on market data via OpenAI</p>
        </div>
        <span className="ai-powered-badge">✦ GPT-4o</span>
      </div>

      {error && <ErrorState message={error} />}

      <div className="ai-coins-list">
        {selectedCoins.map((coin) => (
          <div key={coin.id} className="ai-coin-card">
            <div className="ai-coin-header">
              <div className="ai-coin-logo3d">
                <div className="ai-coin-logo3d-sphere">
                  <div className="ai-coin-logo3d-shine" />
                  <img className="ai-coin-icon" src={coin.image} alt={coin.name} width={30} height={30} />
                </div>
              </div>
              <div className="ai-coin-info">
                <h3 className="ai-coin-name">{coin.name}</h3>
                <span className="ai-coin-symbol">{coin.symbol.toUpperCase()}</span>
              </div>
              <span className="ai-coin-price">${coin.current_price.toLocaleString()}</span>
              <button
                className={`ai-coin-btn${loadingCoinId === coin.id ? ' ai-coin-btn--loading' : ''}`}
                onClick={() => requestRecommendation(coin.id)}
                disabled={loadingCoinId === coin.id}
              >
                {loadingCoinId === coin.id ? '⏳ Analyzing...' : '🔮 Analyze'}
              </button>
            </div>

            {loadingCoinId === coin.id && <Loader text="AI analysis in progress..." />}
            {recommendations[coin.id] && (
              <AiRecommendation recommendation={recommendations[coin.id]!} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
