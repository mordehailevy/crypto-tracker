import apiClient from './apiClient';
import type { CoinSummary, CoinDetail } from '../types';
import { MOCK_COINS, MOCK_DETAILS } from './mockData';

const BASE_URL = import.meta.env.VITE_COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3';

export const fetchTopCoins = async (): Promise<CoinSummary[]> => {
  const fetchFromApi = async (): Promise<CoinSummary[]> => {
    const { data } = await apiClient.get<CoinSummary[]>(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: '30d,60d,200d',
      },
      timeout: 8000,
    });
    if (Array.isArray(data) && data.length > 0) return data;
    return MOCK_COINS;
  };

  try {
    return await fetchFromApi();
  } catch {
    return MOCK_COINS;
  }
};

export const fetchCoinDetail = async (coinId: string): Promise<CoinDetail> => {
  const fetchFromApi = async (): Promise<CoinDetail> => {
    const { data } = await apiClient.get<CoinDetail>(`${BASE_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
      },
      timeout: 5000,
    });
    return data;
  };

  const fallbackAfterDelay = (): Promise<CoinDetail> =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        const mock = MOCK_DETAILS[coinId];
        if (mock) resolve(mock);
        else reject(new Error('Data not available'));
      }, 4000),
    );

  try {
    return await Promise.race([fetchFromApi(), fallbackAfterDelay()]);
  } catch {
    const mock = MOCK_DETAILS[coinId];
    if (mock) return mock;
    throw new Error('Unable to load details for this cryptocurrency');
  }
};
