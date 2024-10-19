import { type NextRequest, NextResponse } from 'next/server';
import { getUrl } from '@/utils/get-url';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token');
  const pathname = request.nextUrl.pathname;

  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL(getUrl('/dashboard')));
  }

  // validar se o existe dashboard na rota
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL(getUrl('/')));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
