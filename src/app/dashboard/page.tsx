'use client'

import { useContext } from 'react'
import { AuthContext } from '@/app/context/AuthContext'

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext)

  return <h1>Bem-vindo, {user?.displayName || user?.email}</h1>
}