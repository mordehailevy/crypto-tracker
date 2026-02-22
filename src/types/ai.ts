export interface AiCoinInput {
  id: string;
  name: string;
  symbol: string;
  current_price_usd: number;
  market_cap_usd: number;
  volume_24h_usd: number;
  price_change_percentage_30d: number | null;
  price_change_percentage_60d: number | null;
  price_change_percentage_200d: number | null;
}

export interface AiRecommendation {
  coinId: string;
  coinName: string;
  recommendation: 'BUY' | 'DO_NOT_BUY';
  reasoning: string;
}

export interface AiState {
  recommendations: Record<string, AiRecommendation>;
  loadingCoinId: string | null;
  error: string | null;
}
