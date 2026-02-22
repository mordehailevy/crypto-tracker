import apiClient from './apiClient';
import type { CryptoComparePriceResponse } from '../types';

const CRYPTOCOMPARE_URL = 'https://min-api.cryptocompare.com/data/pricemulti';

/**
 * Récupère les prix live de plusieurs coins via CryptoCompare.
 * Un seul appel API pour tous les symboles sélectionnés.
 * Endpoint: https://min-api.cryptocompare.com/data/pricemulti?tsyms=USD&fsyms=BTC,ETH,...
 */
export const fetchLivePrices = async (
  symbols: string[],
): Promise<CryptoComparePriceResponse> => {
  if (symbols.length === 0) return {};
  const { data } = await apiClient.get<CryptoComparePriceResponse>(CRYPTOCOMPARE_URL, {
    params: {
      fsyms: symbols.map((s) => s.toUpperCase()).join(','),
      tsyms: 'USD',
    },
    timeout: 5000,
  });
  return data;
};
