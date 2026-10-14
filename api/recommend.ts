// Vercel Serverless Function — POST /api/recommend
// La clé OpenAI reste côté serveur (variable OPENAI_API_KEY, SANS préfixe VITE_).
// Le prompt est construit ici : le client ne peut envoyer que des données de coin,
// donc l'endpoint ne peut pas servir de proxy OpenAI gratuit pour un tiers.

declare const process: { env: Record<string, string | undefined> };

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

interface CoinInput {
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

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const isShortString = (v: unknown, max = 64): v is string =>
  typeof v === 'string' && v.length > 0 && v.length <= max;

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

const isNumOrNull = (v: unknown): v is number | null => v === null || isNum(v);

const parseCoin = (raw: unknown): CoinInput | null => {
  if (!raw || typeof raw !== 'object') return null;
  const c = raw as Record<string, unknown>;
  if (
    !isShortString(c.id) ||
    !isShortString(c.name) ||
    !isShortString(c.symbol, 16) ||
    !isNum(c.current_price_usd) ||
    !isNum(c.market_cap_usd) ||
    !isNum(c.volume_24h_usd) ||
    !isNumOrNull(c.price_change_percentage_30d) ||
    !isNumOrNull(c.price_change_percentage_60d) ||
    !isNumOrNull(c.price_change_percentage_200d)
  ) {
    return null;
  }
  return c as unknown as CoinInput;
};

const buildPrompt = (coin: CoinInput) => `You are a financial analyst specialised in cryptocurrencies.
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

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json({ error: 'Server misconfigured: OPENAI_API_KEY missing' }, 500);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const coin = parseCoin(body);
  if (!coin) {
    return json({ error: 'Invalid coin payload' }, 400);
  }

  const openaiRes = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert financial analyst specialised in cryptocurrencies. Reply only with valid JSON.',
        },
        { role: 'user', content: buildPrompt(coin) },
      ],
      temperature: 0.4,
      max_tokens: 300,
      response_format: { type: 'json_object' },
    }),
  });

  if (!openaiRes.ok) {
    return json({ error: `OpenAI error ${openaiRes.status}` }, 502);
  }

  const data = (await openaiRes.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content ?? '';

  try {
    const parsed = JSON.parse(content) as { recommendation?: string; reasoning?: string };
    return json({
      coinId: coin.id,
      coinName: coin.name,
      recommendation: parsed.recommendation === 'BUY' ? 'BUY' : 'DO_NOT_BUY',
      reasoning: String(parsed.reasoning ?? ''),
    });
  } catch {
    return json({ error: 'Invalid response from AI model' }, 502);
  }
}
