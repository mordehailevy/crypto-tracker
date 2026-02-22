import type { CoinSummary, CoinDetail } from '../types';

/**
 * Génère un SVG data URI comme placeholder pour les icônes de coins.
 */
const coinIcon = (letter: string, color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="${color}"/><text x="32" y="42" text-anchor="middle" fill="white" font-size="28" font-family="Arial,sans-serif" font-weight="bold">${letter}</text></svg>`,
  )}`;

/**
 * 20 cryptos de démonstration utilisées en fallback si CoinGecko est indisponible.
 */
export const MOCK_COINS: CoinSummary[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: coinIcon('B', '#f7931a'), current_price: 97250, market_cap: 1920000000000, total_volume: 38000000000, price_change_percentage_24h: 1.2, price_change_percentage_30d_in_currency: 8.5, price_change_percentage_60d_in_currency: 15.3, price_change_percentage_200d_in_currency: 42.1 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: coinIcon('E', '#627eea'), current_price: 3420, market_cap: 411000000000, total_volume: 18500000000, price_change_percentage_24h: 2.1, price_change_percentage_30d_in_currency: 12.4, price_change_percentage_60d_in_currency: 22.7, price_change_percentage_200d_in_currency: 55.3 },
  { id: 'tether', symbol: 'usdt', name: 'Tether', image: coinIcon('T', '#26a17b'), current_price: 1.0, market_cap: 140000000000, total_volume: 65000000000, price_change_percentage_24h: 0.01, price_change_percentage_30d_in_currency: 0.02, price_change_percentage_60d_in_currency: -0.01, price_change_percentage_200d_in_currency: 0.03 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', image: coinIcon('B', '#f0b90b'), current_price: 685, market_cap: 99000000000, total_volume: 2100000000, price_change_percentage_24h: 0.8, price_change_percentage_30d_in_currency: 5.2, price_change_percentage_60d_in_currency: 11.8, price_change_percentage_200d_in_currency: 28.4 },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: coinIcon('S', '#9945ff'), current_price: 195, market_cap: 92000000000, total_volume: 3800000000, price_change_percentage_24h: 3.5, price_change_percentage_30d_in_currency: 18.9, price_change_percentage_60d_in_currency: 35.2, price_change_percentage_200d_in_currency: 120.5 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', image: coinIcon('X', '#00aae4'), current_price: 2.45, market_cap: 140000000000, total_volume: 8500000000, price_change_percentage_24h: -0.5, price_change_percentage_30d_in_currency: 25.3, price_change_percentage_60d_in_currency: 180.0, price_change_percentage_200d_in_currency: 350.0 },
  { id: 'usd-coin', symbol: 'usdc', name: 'USD Coin', image: coinIcon('$', '#2775ca'), current_price: 1.0, market_cap: 45000000000, total_volume: 8200000000, price_change_percentage_24h: 0.0, price_change_percentage_30d_in_currency: 0.01, price_change_percentage_60d_in_currency: 0.0, price_change_percentage_200d_in_currency: 0.01 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: coinIcon('A', '#0033ad'), current_price: 1.05, market_cap: 37000000000, total_volume: 1200000000, price_change_percentage_24h: 1.8, price_change_percentage_30d_in_currency: 22.1, price_change_percentage_60d_in_currency: 45.6, price_change_percentage_200d_in_currency: 150.3 },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: coinIcon('D', '#c2a633'), current_price: 0.38, market_cap: 56000000000, total_volume: 3200000000, price_change_percentage_24h: 4.2, price_change_percentage_30d_in_currency: 30.5, price_change_percentage_60d_in_currency: 85.2, price_change_percentage_200d_in_currency: 210.0 },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', image: coinIcon('A', '#e84142'), current_price: 42.5, market_cap: 17500000000, total_volume: 850000000, price_change_percentage_24h: 2.3, price_change_percentage_30d_in_currency: 15.8, price_change_percentage_60d_in_currency: 28.4, price_change_percentage_200d_in_currency: 65.2 },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', image: coinIcon('P', '#e6007a'), current_price: 8.2, market_cap: 12500000000, total_volume: 450000000, price_change_percentage_24h: 1.5, price_change_percentage_30d_in_currency: 10.2, price_change_percentage_60d_in_currency: 18.5, price_change_percentage_200d_in_currency: 35.8 },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', image: coinIcon('C', '#2a5ada'), current_price: 18.5, market_cap: 11800000000, total_volume: 620000000, price_change_percentage_24h: 3.1, price_change_percentage_30d_in_currency: 20.4, price_change_percentage_60d_in_currency: 38.9, price_change_percentage_200d_in_currency: 72.1 },
  { id: 'tron', symbol: 'trx', name: 'TRON', image: coinIcon('T', '#ef0027'), current_price: 0.26, market_cap: 22500000000, total_volume: 1100000000, price_change_percentage_24h: 0.9, price_change_percentage_30d_in_currency: 8.3, price_change_percentage_60d_in_currency: 15.1, price_change_percentage_200d_in_currency: 55.0 },
  { id: 'polygon', symbol: 'matic', name: 'Polygon', image: coinIcon('P', '#8247e5'), current_price: 0.52, market_cap: 4800000000, total_volume: 320000000, price_change_percentage_24h: 2.7, price_change_percentage_30d_in_currency: 14.6, price_change_percentage_60d_in_currency: 25.3, price_change_percentage_200d_in_currency: 48.9 },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin', image: coinIcon('L', '#bfbbbb'), current_price: 108, market_cap: 8100000000, total_volume: 580000000, price_change_percentage_24h: 1.4, price_change_percentage_30d_in_currency: 12.8, price_change_percentage_60d_in_currency: 22.1, price_change_percentage_200d_in_currency: 40.5 },
  { id: 'uniswap', symbol: 'uni', name: 'Uniswap', image: coinIcon('U', '#ff007a'), current_price: 14.2, market_cap: 8500000000, total_volume: 420000000, price_change_percentage_24h: 2.9, price_change_percentage_30d_in_currency: 18.3, price_change_percentage_60d_in_currency: 32.7, price_change_percentage_200d_in_currency: 58.4 },
  { id: 'stellar', symbol: 'xlm', name: 'Stellar', image: coinIcon('S', '#14b6e7'), current_price: 0.42, market_cap: 12800000000, total_volume: 680000000, price_change_percentage_24h: 3.8, price_change_percentage_30d_in_currency: 28.5, price_change_percentage_60d_in_currency: 55.2, price_change_percentage_200d_in_currency: 180.0 },
  { id: 'cosmos', symbol: 'atom', name: 'Cosmos', image: coinIcon('C', '#2e3148'), current_price: 9.8, market_cap: 3800000000, total_volume: 210000000, price_change_percentage_24h: 1.6, price_change_percentage_30d_in_currency: 11.5, price_change_percentage_60d_in_currency: 20.8, price_change_percentage_200d_in_currency: 38.2 },
  { id: 'monero', symbol: 'xmr', name: 'Monero', image: coinIcon('M', '#ff6600'), current_price: 215, market_cap: 3900000000, total_volume: 120000000, price_change_percentage_24h: 0.5, price_change_percentage_30d_in_currency: 6.2, price_change_percentage_60d_in_currency: 12.8, price_change_percentage_200d_in_currency: 30.5 },
  { id: 'aave', symbol: 'aave', name: 'Aave', image: coinIcon('A', '#b6509e'), current_price: 285, market_cap: 4200000000, total_volume: 350000000, price_change_percentage_24h: 4.1, price_change_percentage_30d_in_currency: 25.8, price_change_percentage_60d_in_currency: 48.3, price_change_percentage_200d_in_currency: 95.6 },
];

/**
 * Données de détail mock pour fallback si CoinGecko est indisponible ou trop lent.
 */
const makeMockDetail = (
  id: string,
  symbol: string,
  name: string,
  color: string,
  usd: number,
  eur: number,
  ils: number,
  marketCap: number,
  volume: number,
  p30: number,
  p60: number,
  p200: number,
): CoinDetail => ({
  id,
  symbol,
  name,
  image: {
    thumb: coinIcon(name.charAt(0).toUpperCase(), color),
    small: coinIcon(name.charAt(0).toUpperCase(), color),
    large: coinIcon(name.charAt(0).toUpperCase(), color),
  },
  market_data: {
    current_price: { usd, eur, ils },
    market_cap: { usd: marketCap },
    total_volume: { usd: volume },
    price_change_percentage_30d: p30,
    price_change_percentage_60d: p60,
    price_change_percentage_200d: p200,
  },
});

export const MOCK_DETAILS: Record<string, CoinDetail> = {
  bitcoin:      makeMockDetail('bitcoin',      'btc',  'Bitcoin',   '#f7931a', 97250,  90200,  356800, 1920000000000, 38000000000, 8.5,   15.3,  42.1),
  ethereum:     makeMockDetail('ethereum',     'eth',  'Ethereum',  '#627eea', 3420,   3160,   12540,  411000000000,  18500000000, 12.4,  22.7,  55.3),
  tether:       makeMockDetail('tether',       'usdt', 'Tether',    '#26a17b', 1.0,    0.92,   3.65,   140000000000,  65000000000, 0.02,  -0.01, 0.03),
  binancecoin:  makeMockDetail('binancecoin',  'bnb',  'BNB',       '#f0b90b', 685,    632,    2504,   99000000000,   2100000000,  5.2,   11.8,  28.4),
  solana:       makeMockDetail('solana',       'sol',  'Solana',    '#9945ff', 195,    180,    713,    92000000000,   3800000000,  18.9,  35.2,  120.5),
  ripple:       makeMockDetail('ripple',       'xrp',  'XRP',       '#00aae4', 2.45,   2.26,   8.96,   140000000000,  8500000000,  25.3,  180.0, 350.0),
  'usd-coin':   makeMockDetail('usd-coin',     'usdc', 'USD Coin',  '#2775ca', 1.0,    0.92,   3.65,   45000000000,   8200000000,  0.01,  0.0,   0.01),
  cardano:      makeMockDetail('cardano',      'ada',  'Cardano',   '#0033ad', 1.05,   0.97,   3.84,   37000000000,   1200000000,  22.1,  45.6,  150.3),
  dogecoin:     makeMockDetail('dogecoin',     'doge', 'Dogecoin',  '#c2a633', 0.38,   0.35,   1.39,   56000000000,   3200000000,  30.5,  85.2,  210.0),
  'avalanche-2':makeMockDetail('avalanche-2',  'avax', 'Avalanche', '#e84142', 42.5,   39.2,   155.5,  17500000000,   850000000,   15.8,  28.4,  65.2),
  polkadot:     makeMockDetail('polkadot',     'dot',  'Polkadot',  '#e6007a', 8.2,    7.5,    29.9,   12500000000,   450000000,   10.2,  18.5,  35.8),
  chainlink:    makeMockDetail('chainlink',    'link', 'Chainlink', '#2a5ada', 18.5,   17.1,   67.6,   11800000000,   620000000,   20.4,  38.9,  72.1),
  tron:         makeMockDetail('tron',         'trx',  'TRON',      '#ef0027', 0.26,   0.24,   0.95,   22500000000,   1100000000,  8.3,   15.1,  55.0),
  polygon:      makeMockDetail('polygon',      'matic','Polygon',   '#8247e5', 0.52,   0.48,   1.90,   4800000000,    320000000,   14.6,  25.3,  48.9),
  litecoin:     makeMockDetail('litecoin',     'ltc',  'Litecoin',  '#bfbbbb', 108,    99.5,   394.8,  8100000000,    580000000,   12.8,  22.1,  40.5),
  uniswap:      makeMockDetail('uniswap',      'uni',  'Uniswap',   '#ff007a', 14.2,   13.1,   51.9,   8500000000,    420000000,   18.3,  32.7,  58.4),
  stellar:      makeMockDetail('stellar',      'xlm',  'Stellar',   '#14b6e7', 0.42,   0.39,   1.53,   12800000000,   680000000,   28.5,  55.2,  180.0),
  cosmos:       makeMockDetail('cosmos',       'atom', 'Cosmos',    '#2e3148', 9.8,    9.0,    35.8,   3800000000,    210000000,   11.5,  20.8,  38.2),
  monero:       makeMockDetail('monero',       'xmr',  'Monero',    '#ff6600', 215,    198,    786,    3900000000,    120000000,   6.2,   12.8,  30.5),
  aave:         makeMockDetail('aave',         'aave', 'Aave',      '#b6509e', 285,    263,    1042,   4200000000,    350000000,   25.8,  48.3,  95.6),
};
