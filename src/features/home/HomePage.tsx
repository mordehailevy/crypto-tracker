import React, { useState, useCallback } from 'react';
import { useCoins } from './hooks/useCoins';
import { CoinsGrid } from './components/CoinsGrid';
import { SelectionDialog } from './components/SelectionDialog';
import { CoinDetailModal } from './components/CoinDetailModal';
import { ErrorState, EmptyState, Loader } from '../../components/common';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const {
    coins,
    selectedIds,
    loading,
    error,
    coinDetails,
    detailLoading,
    dialogOpen,
    pendingCoinId,
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

  const viewedDetail = viewingCoinId ? coinDetails[viewingCoinId] ?? null : null;

  return (
    <div className="home-page">
      <div className="home-stats-bar">
        <span>🪙 Top <strong>100</strong> Cryptocurrencies</span>
        <span>Selected: <strong>{selectedIds.length}</strong> / 5</span>
        <span style={{ marginLeft: 'auto', color: 'var(--green)' }}>● Live data</span>
      </div>

      {loading && coins.length === 0 ? (
        <Loader text="Chargement des 100 cryptomonnaies..." />
      ) : coins.length === 0 ? (
        <EmptyState text="Aucune cryptomonnaie trouvée." />
      ) : (
        <CoinsGrid
          coins={coins}
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
