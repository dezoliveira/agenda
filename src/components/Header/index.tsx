'use client'

import styles from './styles.module.css'
import Link from 'next/link'
import { useLogout } from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import Dropdown from '../DropdownMenu'
import { getDropdownMenu } from './dropdownMenu'

export function Header() {
  const router = useRouter()

  const { logout, error } = useLogout()
  const { user, loading: loadingContext } = useAuth()
  const [picture, setPicture] = useState("")
  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isGoogleLogin, setIsGoogleLogin] = useState("")

  useEffect(() => {
    if (user?.photoURL) {
      setPicture(user.photoURL)
    }

    if (user?.displayName) {
      setName(user.displayName)
    }

    if (user?.providerData){
        user.providerData.forEach((profile) => {
          setIsGoogleLogin(profile.providerId)
        })
    }
  }, [user])
  
  const handleLogout = async () => {
    const result = await logout()

    if (result.success) {
      router.push('/')
      toast.success("Deslogado com sucesso!")
      
    } else {
      toast.error(result.error || "Errou ao realizar logout" )
    }
  }

  const userData = {
    name: user?.displayName ?? 'Usuario',
    email: user?.email ?? '',
    photo: user?.photoURL ?? ''
  }

  const dropdownMenu = getDropdownMenu(router, handleLogout)

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="#">
          <strong>a</strong>genda
        </Link>

        <nav className={styles.navLinks}>
          {!loadingContext && name && (<small>{name}</small>)}

          <div className={styles.profileInfo} onClick={() => setIsOpen(!isOpen)}>
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
          <Dropdown
            user={userData}
            items={dropdownMenu}
            showDropdown={isOpen}
            providerData={isGoogleLogin}
          />
        </nav>
      </div>
    </header>
  )
}