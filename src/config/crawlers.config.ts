/** Search access is independent from the optional training/grounding overrides. */
export const searchCrawlers = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot'];
export function trainingOverrides() {
  return [
    { userAgent: 'GPTBot', policy: process.env.GPTBOT_POLICY },
    { userAgent: 'Google-Extended', policy: process.env.GOOGLE_EXTENDED_POLICY },
  ].filter(
    (item): item is { userAgent: string; policy: 'allow' | 'disallow' } =>
      item.policy === 'allow' || item.policy === 'disallow',
  );
}
