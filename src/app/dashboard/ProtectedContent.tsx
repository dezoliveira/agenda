'use client'

import { useAuth } from "@/context/AuthContext"

export default function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <>Carregando...</>

  return (
    <main>
      <h1>Bem vindo, {user?.displayName || user?.email}</h1>
      {children}
    </main>
  )
}
