import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyIdToken } from "@/app/lib/firebaseAdmin";


export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      console.log("[API] Token vazio!")
      return NextResponse.json({ error: "Token vazio" }, { status: 400 })
    }

    const decodedToken = await verifyIdToken(token)
    console.log("[API] Token decodificado com sucesso:", decodedToken.uid)

    //Cria o cookie
    const cookieStore = await cookies()

    console.log('cookies', cookieStore)

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 5, // 5 dias
      path: "/"
    })

    console.log("[API] Cookie setado!")

    return NextResponse.json({ success: true, user:decodedToken.uid })

  } catch (err: any) {
    console.error("[API] Erro ao verificar token:", err.message)
    return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
  }
}