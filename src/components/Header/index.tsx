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
import Dropdown from '../Dropdown'
import { IoExitOutline, IoHelpCircleOutline, IoMailOutline } from "react-icons/io5";
import { GrConfigure } from "react-icons/gr";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUser } from "react-icons/ai";

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

  const userData = {
    name: user?.displayName ?? 'Usuario',
    email: user?.email ?? '',
    photo: user?.photoURL ?? ''
  }

  const dropdownItens = [
    { label: "Meu Perfil", icon: <AiOutlineUser size={18} />, onClick: () => router.push("/profile") },
    { label: "Editar Perfil", icon: <LiaUserEditSolid size={18}/>, onClick: () => router.push("/profile-edit") },
    { label: "Inbox", icon: <IoMailOutline size={18}/>, onClick: () => router.push("/inbox") },
    { label: "Configurações", icon: <GrConfigure size={18}/>, onClick: () => router.push("/config") },
    { label: "Ajuda", icon: <IoHelpCircleOutline size={18}/>, onClick: () => router.push("/help") },
    { label: "Sair", icon: <IoExitOutline size={18}/>, onClick: handleLogout},
  ]

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
          <Dropdown
            user={userData}
            items={dropdownItens}  
          />
        </nav>
      </div>
    </header>
  )
}