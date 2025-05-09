'use client'

import { Header } from '../../components/Header'
import ProtectedContent from './ProtectedContent'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import styles from './styles.module.css'

export default function DashboardLayout({ children } : { children: React.ReactNode }) {  
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className='flex w-full h-screen'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}/>
      <div className='flex flex-col flex-1'>
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <ProtectedContent>
            {children}
          </ProtectedContent>
        </main>
      </div>
    </div>
  )
}