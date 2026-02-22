import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectedIds, selectSelectedSymbols } from '../../home/homeSelectors';
import {
  addReportPoint,
  setPolling,
  setReportsError,
  clearHistory,
} from '../reportsSlice';
import { fetchLivePrices } from '../../../services';

export const useLiveReports = () => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const selectedSymbols = useAppSelector(selectSelectedSymbols);
  const history = useAppSelector((s) => s.reports.history);
  const isPolling = useAppSelector((s) => s.reports.isPolling);
  const error = useAppSelector((s) => s.reports.error);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (selectedSymbols.length === 0) {
      dispatch(clearHistory());
      return;
    }

    dispatch(setPolling(true));
    dispatch(setReportsError(null));

    const poll = async () => {
      try {
        const prices = await fetchLivePrices(selectedSymbols);
        const point = {
          timestamp: Date.now(),
          prices: Object.fromEntries(
            Object.entries(prices).map(([sym, data]) => [sym, data.USD]),
          ),
        };
        dispatch(addReportPoint(point));
      } catch (err) {
        dispatch(
          setReportsError(err instanceof Error ? err.message : 'Polling error'),
        );
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      dispatch(setPolling(false));
    };
  }, [dispatch, selectedSymbols]);

  return { history, isPolling, error, selectedIds, selectedSymbols };
};
