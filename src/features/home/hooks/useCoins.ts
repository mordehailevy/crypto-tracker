import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadCoins,
  loadCoinDetail,
  toggleCoinSelection,
  replaceCoinSelection,
  closeDialog,
  setSearchQuery,
} from '../homeSlice';
import {
  selectFilteredCoins,
  selectSelectedIds,
  selectSearchQuery,
  selectHomeLoading,
  selectHomeError,
  selectCoinDetails,
  selectDetailLoading,
  selectDialogOpen,
  selectPendingCoinId,
} from '../homeSelectors';

export const useCoins = () => {
  const dispatch = useAppDispatch();

  const coins      = useAppSelector(selectFilteredCoins);
  const selectedIds = useAppSelector(selectSelectedIds);
  const searchQuery = useAppSelector(selectSearchQuery);
  const loading    = useAppSelector(selectHomeLoading);
  const error      = useAppSelector(selectHomeError);
  const coinDetails = useAppSelector(selectCoinDetails);
  const detailLoading = useAppSelector(selectDetailLoading);
  const dialogOpen  = useAppSelector(selectDialogOpen);
  const pendingCoinId = useAppSelector(selectPendingCoinId);

  useEffect(() => { dispatch(loadCoins()); }, [dispatch]);

  const handleSearch       = useCallback((q: string) => dispatch(setSearchQuery(q)), [dispatch]);
  const handleToggle       = useCallback((id: string) => dispatch(toggleCoinSelection(id)), [dispatch]);
  const handleMoreInfo     = useCallback((id: string) => dispatch(loadCoinDetail(id)), [dispatch]);
  const handleReplace      = useCallback((removeId: string, addId: string) => dispatch(replaceCoinSelection({ removeId, addId })), [dispatch]);
  const handleCloseDialog  = useCallback(() => dispatch(closeDialog()), [dispatch]);
  const handleRetry        = useCallback(() => dispatch(loadCoins()), [dispatch]);

  return {
    coins,
    selectedIds,
    searchQuery,
    loading,
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
  };
};
