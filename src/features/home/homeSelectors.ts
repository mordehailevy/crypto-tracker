import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const selectCoins = (state: RootState) => state.home.coins;
export const selectSelectedIds = (state: RootState) => state.home.selectedIds;
export const selectSearchQuery = (state: RootState) => state.home.searchQuery;
export const selectHomeLoading = (state: RootState) => state.home.loading;
export const selectHomeError = (state: RootState) => state.home.error;
export const selectCoinDetails = (state: RootState) => state.home.coinDetails;
export const selectDetailLoading = (state: RootState) => state.home.detailLoading;
export const selectDialogOpen = (state: RootState) => state.home.dialogOpen;
export const selectPendingCoinId = (state: RootState) => state.home.pendingCoinId;

/**
 * Coins filtrés par la recherche (client-side, case-insensitive).
 */
export const selectFilteredCoins = createSelector(
  [selectCoins, selectSearchQuery],
  (coins, query) => {
    if (!query.trim()) return coins;
    const q = query.toLowerCase();
    return coins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q),
    );
  },
);

/**
 * Les objets CoinSummary complets des coins sélectionnés.
 */
export const selectSelectedCoins = createSelector(
  [selectCoins, selectSelectedIds],
  (coins, ids) => coins.filter((c) => ids.includes(c.id)),
);

/**
 * Les symboles (BTC, ETH...) des coins sélectionnés (pour CryptoCompare).
 */
export const selectSelectedSymbols = createSelector(
  [selectSelectedCoins],
  (coins) => coins.map((c) => c.symbol.toUpperCase()),
);
