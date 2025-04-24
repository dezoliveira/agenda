import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token vazio" }, { status: 400 })
    }

    const decodedToken = await verifyIdToken(token)

    //Cria o cookie
    const cookieStore = await cookies()

    console.log('cookies', cookieStore)

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 5, // 5 dias
      path: "/"
    })

    return NextResponse.json({ success: true, user:decodedToken.uid })

  } catch (err: any) {
    console.error("[API] Erro ao verificar token:", err.message)
    return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
  }
}