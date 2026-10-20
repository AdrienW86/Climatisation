import 'server-only';
import { legalReady } from '@/config/business.config';
import { canonicalOrigin } from '@/config/site.config';
export function quoteReady() {
  return (
    legalReady() &&
    Boolean(
      canonicalOrigin() &&
      process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM &&
      process.env.CONTACT_EMAIL &&
      process.env.UPSTASH_REDIS_REST_URL?.startsWith('https://') &&
      process.env.UPSTASH_REDIS_REST_TOKEN &&
      (process.env.RATE_LIMIT_SECRET?.length ?? 0) >= 32,
    )
  );
}
