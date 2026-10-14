import apiClient from './apiClient';
import type { AiCoinInput, AiRecommendation } from '../types';

// L'appel à OpenAI passe par la fonction serverless /api/recommend :
// la clé API n'est jamais envoyée au navigateur.
const RECOMMEND_URL = '/api/recommend';

export const fetchAiRecommendation = async (
  coin: AiCoinInput,
): Promise<AiRecommendation> => {
  const { data } = await apiClient.post<AiRecommendation>(RECOMMEND_URL, coin, {
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    coinId: data.coinId,
    coinName: data.coinName,
    recommendation: data.recommendation === 'BUY' ? 'BUY' : 'DO_NOT_BUY',
    reasoning: data.reasoning,
  };
};
