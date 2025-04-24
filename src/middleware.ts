// middleware.ts na raiz
import { NextResponse, NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
}
