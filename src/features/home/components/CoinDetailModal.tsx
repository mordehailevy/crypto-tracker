import React from 'react';
import type { CoinDetail } from '../../../types';
import './CoinDetailModal.css';

interface Props {
  detail: CoinDetail | null;
  loading: boolean;
  onClose: () => void;
}

export const CoinDetailModal: React.FC<Props> = ({ detail, loading, onClose }) => {
  if (!detail && !loading) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-box" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>
        {loading ? (
          <div className="detail-loading">
            <div className="detail-loading-spinner" />
            <span>Loading data...</span>
          </div>
        ) : detail ? (
          <>
            <div className="detail-header">
              <div className="detail-img-wrapper">
                <div className="detail-img-sphere">
                  <div className="detail-img-shine" />
                  <img src={detail.image.large} alt={detail.name} className="detail-img" />
                </div>
                <div className="detail-img-shadow" />
              </div>
              <h2 className="detail-name">{detail.name}</h2>
              <span className="detail-symbol-badge">{detail.symbol.toUpperCase()}</span>
            </div>
            <div className="detail-grid">
              <div className="detail-stat">
                <span className="detail-label">USD Price</span>
                <span className="detail-value">${detail.market_data.current_price.usd.toLocaleString()}</span>
              </div>
              <div className="detail-stat">
                <span className="detail-label">EUR Price</span>
                <span className="detail-value">€{detail.market_data.current_price.eur.toLocaleString()}</span>
              </div>
              <div className="detail-stat">
                <span className="detail-label">ILS Price</span>
                <span className="detail-value">₪{detail.market_data.current_price.ils.toLocaleString()}</span>
              </div>
              <div className="detail-stat">
                <span className="detail-label">Market Cap</span>
                <span className="detail-value">${detail.market_data.market_cap.usd.toLocaleString()}</span>
              </div>
              <div className="detail-stat">
                <span className="detail-label">24h Volume</span>
                <span className="detail-value">${detail.market_data.total_volume.usd.toLocaleString()}</span>
              </div>
              <div className="detail-stat">
                <span className="detail-label">30d Change</span>
                <span className={`detail-value ${(detail.market_data.price_change_percentage_30d ?? 0) >= 0 ? 'positive' : 'negative'}`}>
                  {(detail.market_data.price_change_percentage_30d ?? 0) >= 0 ? '▲ ' : '▼ '}
                  {detail.market_data.price_change_percentage_30d?.toFixed(2) ?? 'N/A'}%
                </span>
              </div>
              <div className="detail-stat">
                <span className="detail-label">60d Change</span>
                <span className={`detail-value ${(detail.market_data.price_change_percentage_60d ?? 0) >= 0 ? 'positive' : 'negative'}`}>
                  {(detail.market_data.price_change_percentage_60d ?? 0) >= 0 ? '▲ ' : '▼ '}
                  {detail.market_data.price_change_percentage_60d?.toFixed(2) ?? 'N/A'}%
                </span>
              </div>
              <div className="detail-stat">
                <span className="detail-label">200d Change</span>
                <span className={`detail-value ${(detail.market_data.price_change_percentage_200d ?? 0) >= 0 ? 'positive' : 'negative'}`}>
                  {(detail.market_data.price_change_percentage_200d ?? 0) >= 0 ? '▲ ' : '▼ '}
                  {detail.market_data.price_change_percentage_200d?.toFixed(2) ?? 'N/A'}%
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
