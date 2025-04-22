'use client'

import { Header } from './components/header'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import stlyes from './styles.module.css'
import Image from 'next/image'

export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  const { user, loading } = useContext(AuthContext)
  const router = useRouter()

  if (loading) return <div>Carregando...</div>

  return (
    <div>
      <Header />
        {
          !user ? (
            <div className={stlyes.noAuthMessage}>
              <Image
                src="/auth.svg"
                alt="auth-image"
                width={500}
                height={200}
              />
              
              <h1>Você precisa estar logado para acessar o dashboard</h1>
              <Link href="/">
                <button className={stlyes.button}>
                  Fazer login
                </button>
              </Link>
            </div>
          ) : (
            <main>
              <h1>Bem vindo, {user?.displayName || user?.email}</h1>
              {children}
            </main>
          )}
    </div>
  )
}