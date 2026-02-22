import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectedCoins } from '../../home/homeSelectors';
import { getAiRecommendation } from '../aiSlice';
import { fetchCoinDetail } from '../../../services';
import type { AiCoinInput } from '../../../types';

export const useAiRecommendation = () => {
  const dispatch = useAppDispatch();
  const selectedCoins = useAppSelector(selectSelectedCoins);
  const recommendations = useAppSelector((s) => s.ai.recommendations);
  const loadingCoinId = useAppSelector((s) => s.ai.loadingCoinId);
  const error = useAppSelector((s) => s.ai.error);

  const requestRecommendation = useCallback(
    async (coinId: string) => {
      // Fetch fresh data from CoinGecko /coins/{id}?market_data=true
      const detail = await fetchCoinDetail(coinId);

      const input: AiCoinInput = {
        id: detail.id,
        name: detail.name,
        symbol: detail.symbol,
        current_price_usd: detail.market_data.current_price.usd,
        market_cap_usd: detail.market_data.market_cap.usd,
        volume_24h_usd: detail.market_data.total_volume.usd,
        price_change_percentage_30d: detail.market_data.price_change_percentage_30d,
        price_change_percentage_60d: detail.market_data.price_change_percentage_60d,
        price_change_percentage_200d: detail.market_data.price_change_percentage_200d,
      };

      dispatch(getAiRecommendation(input));
    },
    [dispatch],
  );

  return { selectedCoins, recommendations, loadingCoinId, error, requestRecommendation };
};
