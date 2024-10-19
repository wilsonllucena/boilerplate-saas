import { env } from '@/env';

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
export function getUrl(path: string) {
  const url = env.NEXTAUTH_URL || '';
  const normalizedPath =
    path && !path.startsWith('/') ? `/${path}` : path || '';
  return `${url}${normalizedPath}`;
}
