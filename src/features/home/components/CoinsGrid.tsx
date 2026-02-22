import React, { useMemo, useCallback } from 'react';
import type { CoinSummary } from '../../../types';
import { CoinCard } from './CoinCard';
import './CoinsGrid.css';

interface Props {
  coins: CoinSummary[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onMoreInfo: (id: string) => void;
}

export const CoinsGrid: React.FC<Props> = React.memo(
  ({ coins, selectedIds, onToggle, onMoreInfo }) => {
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

    const handleToggle = useCallback(
      (id: string) => onToggle(id),
      [onToggle],
    );

    const handleMoreInfo = useCallback(
      (id: string) => onMoreInfo(id),
      [onMoreInfo],
    );

    return (
      <div className="coins-grid">
        {coins.map((coin) => (
          <CoinCard
            key={coin.id}
            coin={coin}
            isSelected={selectedSet.has(coin.id)}
            onToggle={handleToggle}
            onMoreInfo={handleMoreInfo}
          />
        ))}
      </div>
    );
  },
);

CoinsGrid.displayName = 'CoinsGrid';
