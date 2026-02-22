import React, { useState, useCallback } from 'react';
import { useCoins } from './hooks/useCoins';
import { CoinsSearch } from './components/CoinsSearch';
import { CoinsGrid } from './components/CoinsGrid';
import { SelectionDialog } from './components/SelectionDialog';
import { CoinDetailModal } from './components/CoinDetailModal';
import { ErrorState, EmptyState } from '../../components/common';
import { MOCK_COINS } from '../../services/mockData';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const {
    coins,
    selectedIds,
    searchQuery,
    error,
    coinDetails,
    detailLoading,
    dialogOpen,
    pendingCoinId,
    handleSearch,
    handleToggle,
    handleMoreInfo,
    handleReplace,
    handleCloseDialog,
    handleRetry,
  } = useCoins();

  const [viewingCoinId, setViewingCoinId] = useState<string | null>(null);

  const onMoreInfo = useCallback(
    (id: string) => {
      handleMoreInfo(id);
      setViewingCoinId(id);
    },
    [handleMoreInfo],
  );

  const closeDetail = useCallback(() => setViewingCoinId(null), []);

  if (error && coins.length === 0) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  const effectiveCoins = coins.length > 0 ? coins : MOCK_COINS;
  const viewedDetail = viewingCoinId ? coinDetails[viewingCoinId] ?? null : null;

  return (
    <div className="home-page">
      <div className="home-stats-bar">
        <span>🪙 Top <strong>100</strong> Cryptocurrencies</span>
        <span>Selected: <strong>{selectedIds.length}</strong> / 5</span>
        <span style={{ marginLeft: 'auto', color: 'var(--green)' }}>● Live data</span>
      </div>

      <CoinsSearch value={searchQuery} onChange={handleSearch} />

      {effectiveCoins.length === 0 ? (
        <EmptyState text="No cryptocurrency found." />
      ) : (
        <CoinsGrid
          coins={effectiveCoins}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          onMoreInfo={onMoreInfo}
        />
      )}

      <SelectionDialog
        open={dialogOpen}
        pendingCoinId={pendingCoinId}
        onReplace={handleReplace}
        onCancel={handleCloseDialog}
      />

      <CoinDetailModal
        detail={viewedDetail}
        loading={viewingCoinId !== null && detailLoading === viewingCoinId}
        onClose={closeDetail}
      />
    </div>
  );
};
