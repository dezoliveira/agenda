'use client'

import styles from './styles.module.css'
import Link from 'next/link'
import { RiLogoutCircleRLine  } from 'react-icons/ri'
import { useLogout } from '@/app/lib/hooks/useLogout'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '@/app/context/AuthContext'
import { useContext } from 'react'

export function Header() {
  const router = useRouter()

  const { logout, error, loading } = useLogout()
  const { user, loading: loadingContext } = useContext(AuthContext)
  
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
          { !user ? (
            <>
              <Link href="/">
                Login
              </Link>
              |
              <Link href="/auth/signup">
                Cadastro
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} disabled={loading}>
              {/* {loading ? "Saindo..." : "Sair" } */}
              Sair
              <RiLogoutCircleRLine size={24} color='#fff'/> 
            </button>
          )
        }
        {
          error && (
            <>
              <div className={styles.errorMessage}>
                <p>{error}</p>
              </div>
            </>
          )
        }
        </nav>
      </div>
    </header>
  )
}