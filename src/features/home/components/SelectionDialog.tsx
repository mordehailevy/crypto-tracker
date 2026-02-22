import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedIds, selectCoins } from '../homeSelectors';
import './SelectionDialog.css';

interface Props {
  open: boolean;
  pendingCoinId: string | null;
  onReplace: (removeId: string, addId: string) => void;
  onCancel: () => void;
}

export const SelectionDialog: React.FC<Props> = React.memo(
  ({ open, pendingCoinId, onReplace, onCancel }) => {
    const selectedIds = useAppSelector(selectSelectedIds);
    const coins = useAppSelector(selectCoins);

    if (!open || !pendingCoinId) return null;

    const selectedCoins = coins.filter((c) => selectedIds.includes(c.id));
    const pendingCoin = coins.find((c) => c.id === pendingCoinId);

    return (
      <div className="dialog-overlay" onClick={onCancel}>
        <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
          <h2 className="dialog-title">⚠️ Limit reached (5 max)</h2>
          <p className="dialog-text">
            You want to add <strong>{pendingCoin?.name ?? pendingCoinId}</strong>.
            <br />
            Choose a coin to remove:
          </p>
          <ul className="dialog-list">
            {selectedCoins.map((c) => (
              <li key={c.id} className="dialog-item">
                <img src={c.image} alt={c.name} width={24} height={24} />
                <span>
                  {c.name} ({c.symbol.toUpperCase()})
                </span>
                <button
                  className="dialog-remove-btn"
                  onClick={() => onReplace(c.id, pendingCoinId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="dialog-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  },
);

SelectionDialog.displayName = 'SelectionDialog';
