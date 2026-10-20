import 'server-only';
export async function redis<T>(command: (string | number)[]): Promise<T> {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('Protection indisponible');
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || 'error' in data || !('result' in data))
    throw new Error('Réponse de protection invalide');
  return data.result as T;
}
export const rateScript =
  "local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],900) end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],900) end; if a>10 or b>3 then return 0 end; return 1";
