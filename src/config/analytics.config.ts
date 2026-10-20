export type AnalyticsMode = 'disabled' | 'consent' | 'exempt';
export function analyticsMode(
  env: Readonly<Record<string, string | undefined>> = process.env,
): AnalyticsMode {
  if (env.VERCEL !== '1' || env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'false') return 'disabled';
  if (env.ANALYTICS_PRIVACY_MODE === 'disabled') return 'disabled';
  if (env.ANALYTICS_PRIVACY_MODE === 'exempt' && env.ANALYTICS_EXEMPTION_VERIFIED === 'true')
    return 'exempt';
  return 'consent';
}
export function analyticsEnabled() {
  return analyticsMode() !== 'disabled';
}
