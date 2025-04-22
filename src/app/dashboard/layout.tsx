'use client'

import { Header } from './components/header'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import stlyes from './styles.module.css'
import Image from 'next/image'
import Skeleton from '../components/skeleton'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/protectedRoute'

export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  return (
    <div>
      <Header />
      <ProtectedRoute>
        <main>
          <h1>Bem vindo, {user?.displayName || user?.email}</h1>
          {children}
        </main>
      </ProtectedRoute>
    </div>
  )
}