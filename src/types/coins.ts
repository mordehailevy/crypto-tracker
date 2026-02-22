// ─── Coin Summary (from CoinGecko /coins/markets) ─────────────────
export interface CoinSummary {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_30d_in_currency: number | null;
  price_change_percentage_60d_in_currency: number | null;
  price_change_percentage_200d_in_currency: number | null;
}

// ─── Coin Detail (More Info popup) ────────────────────────────────
export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: { thumb: string; small: string; large: string };
  market_data: {
    current_price: { usd: number; eur: number; ils: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_30d: number | null;
    price_change_percentage_60d: number | null;
    price_change_percentage_200d: number | null;
  };
}

// ─── CryptoCompare live price response ────────────────────────────
export interface CryptoComparePriceResponse {
  [symbol: string]: {
    USD: number;
  };
}
