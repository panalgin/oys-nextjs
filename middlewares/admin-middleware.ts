import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const jwt: string | undefined = request.cookies.get('jwt')?.value
  const isAdmin = jwt && JSON.parse(jwt).role === 'admin'

  if (request.nextUrl.pathname.startsWith('/dashboard') && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}