import React, { useCallback } from 'react';
import type { CoinSummary } from '../../../types';
import './CoinCard.css';

const FALLBACK_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#334155"/><text x="24" y="32" text-anchor="middle" fill="#e2e8f0" font-size="22" font-family="Arial,sans-serif">C</text></svg>',
)}`;

interface Props {
  coin: CoinSummary;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onMoreInfo: (id: string) => void;
}

export const CoinCard: React.FC<Props> = React.memo(
  ({ coin, isSelected, onToggle, onMoreInfo }) => {
    const handleToggle = useCallback(() => onToggle(coin.id), [coin.id, onToggle]);
    const handleMore = useCallback(() => onMoreInfo(coin.id), [coin.id, onMoreInfo]);
    const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = FALLBACK_IMG;
    }, []);

    const change = coin.price_change_percentage_24h ?? 0;

    return (
      <div className={`coin-card ${isSelected ? 'coin-card--selected' : ''}`}>
        {coin.market_cap && (
          <span className="coin-card__rank" title="Market Cap">${(coin.market_cap / 1e9).toFixed(1)}B</span>
        )}

        {/* 3D coin logo */}
        <div className="coin-card__logo3d">
          <div className="coin-card__logo3d-sphere">
            <div className="coin-card__logo3d-shine" />
            <img
              className="coin-card__icon"
              src={coin.image}
              alt={coin.name}
              loading="lazy"
              width={42}
              height={42}
              onError={handleImgError}
            />
            <div className="coin-card__logo3d-rim" />
          </div>
          <div className="coin-card__logo3d-shadow" />
        </div>
        <h3 className="coin-card__name">{coin.name}</h3>
        <p className="coin-card__symbol">{coin.symbol.toUpperCase()}</p>
        <p className="coin-card__price">${coin.current_price.toLocaleString()}</p>
        <p className={`coin-card__change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '▲' : '▼'}{' '}
          {Math.abs(change).toFixed(2)}%
        </p>

        <div className="coin-card__divider" />

        <div className="coin-card__actions">
          <button className="coin-card__btn" onClick={handleMore}>
            More Info
          </button>
          <label className="coin-card__switch">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleToggle}
            />
            <span className="coin-card__slider" />
          </label>
        </div>
      </div>
    );
  },
);

CoinCard.displayName = 'CoinCard';
