import apiClient from './apiClient';
import type { AiCoinInput, AiRecommendation } from '../types';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export const fetchAiRecommendation = async (
  coin: AiCoinInput,
): Promise<AiRecommendation> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey || apiKey === 'sk-your-openai-api-key-here') {
    throw new Error('OpenAI API key missing. Set VITE_OPENAI_API_KEY in .env');
  }

  const prompt = `You are a financial analyst specialised in cryptocurrencies.
Analyse the following data for ${coin.name} (${coin.symbol.toUpperCase()}) and give a clear recommendation.

Data:
- Current price (USD): $${coin.current_price_usd.toLocaleString()}
- Market cap (USD): $${coin.market_cap_usd.toLocaleString()}
- 24h volume (USD): $${coin.volume_24h_usd.toLocaleString()}
- 30-day change: ${coin.price_change_percentage_30d ?? 'N/A'}%
- 60-day change: ${coin.price_change_percentage_60d ?? 'N/A'}%
- 200-day change: ${coin.price_change_percentage_200d ?? 'N/A'}%

Reply EXACTLY in the following JSON format (no markdown):
{
  "recommendation": "BUY" or "DO_NOT_BUY",
  "reasoning": "Your detailed analysis here in 2-3 sentences."
}`;

  const { data } = await apiClient.post(
    OPENAI_URL,
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert financial analyst specialised in cryptocurrencies. Reply only with valid JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 300,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const content = data.choices?.[0]?.message?.content ?? '';
  const parsed = JSON.parse(content) as { recommendation: string; reasoning: string };

  return {
    coinId: coin.id,
    coinName: coin.name,
    recommendation: parsed.recommendation === 'BUY' ? 'BUY' : 'DO_NOT_BUY',
    reasoning: parsed.reasoning,
  };
};
