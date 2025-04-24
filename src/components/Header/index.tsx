'use client'

import styles from './styles.module.css'
import Link from 'next/link'
import { RiLogoutCircleRLine  } from 'react-icons/ri'
import { useLogout } from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'

export function Header() {
  const router = useRouter()

  const { logout, loading } = useLogout()
  
  const handleLogout = async () => {
    const success = await logout()

    if (success) {
      router.push('/')
      toast.success("Deslogado com sucesso!")
      
    } else {
      toast.error("Ocorreu algum erro")
    }
  }

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="#">
          <strong>a</strong>genda
        </Link>

        <nav className={styles.navLinks}>
          <button onClick={handleLogout} disabled={loading}>
            {/* {loading ? "Saindo..." : "Sair" } */}
            Sair
            <RiLogoutCircleRLine size={24} color='#fff'/> 
          </button>
        </nav>
      </div>
    </header>
  )
}