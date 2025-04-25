'use client'

import styles from './styles.module.css'
import Link from 'next/link'
import { RiLogoutCircleRLine  } from 'react-icons/ri'
import { useLogout } from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import { userInfo } from 'os'

export function Header() {
  const router = useRouter()

  const { logout, loading } = useLogout()
  const { user, loading: loadingContext } = useAuth()
  const [picture, setPicture] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    if (user?.photoURL) {
      setPicture(user.photoURL)
    }

    if (user?.displayName) {
      setName(user.displayName)
    }
  }, [user])
  
  const handleLogout = async () => {
    const success = await logout()
    console.log(user)

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
          {!loadingContext && name && (<small>{name}</small>)}

          <div className={styles.profileInfo}>
          {
            !loadingContext && !picture ? (
              <FaUser size={30} />
            ) : (
              !loadingContext && picture &&(
                <Image
                  src={picture}
                  alt="profile-pic"
                  width={30}
                  height={30}
                />
              )
            )
          }
          </div>
          {/* <button onClick={handleLogout} disabled={loading}>
            Sair
            <RiLogoutCircleRLine size={24} color='#fff'/> 
          </button> */}
        </nav>
      </div>
    </header>
  )
}