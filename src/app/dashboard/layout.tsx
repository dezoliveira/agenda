'use client'

import { Header } from '../../components/Header'
import ProtectedContent from './ProtectedContent'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import styles from './styles.module.css'

export default function DashboardLayout({ children } : { children: React.ReactNode }) {  
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className={styles.layoutContainer}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}/>
      <div className={styles.expandedContainer}>
        <Header />
        <main className={styles.mainContainer}>
          <ProtectedContent>
            {children}
          </ProtectedContent>
        </main>
      </div>
    </div>
  )
}