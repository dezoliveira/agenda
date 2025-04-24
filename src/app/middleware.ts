import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyIdToken } from './lib/firebaseAdmin'

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    // Verifica se o token é válido
    await verifyIdToken(sessionCookie)
    return NextResponse.next()

  } catch (error) {
    console.error('[Middleware] Erro ao verificar token:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ]
}