export interface LiveReportPoint {
  timestamp: number;
  prices: Record<string, number>; // coinId -> price USD
}
