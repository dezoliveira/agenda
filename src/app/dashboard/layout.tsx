'use client'

import { Header } from './components/Header'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
import ProtectedContent from './ProtectedContent'

export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  return (
    <div>
      <Header />
        <ProtectedContent>
          {children}
        </ProtectedContent>
    </div>
  )
}