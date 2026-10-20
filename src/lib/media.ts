import 'server-only';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '@/config/site.config';
export function heroMedia() {
  const available = (path: string) =>
    existsSync(join(process.cwd(), 'public', path)) ? path : undefined;
  return {
    mp4: available(site.video.mp4),
    webm: available(site.video.webm),
    poster: available(site.video.poster),
  };
}
