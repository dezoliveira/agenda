'use client'

import styles from './styles.module.css'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiInsertRowTop } from "react-icons/ri";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled  } from "react-icons/tb";
import { TbDoorExit } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from 'next/link';
import { LuSquareArrowLeft } from "react-icons/lu";

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export default function Sidebar({ isOpen, toggleSidebar } : SidebarProps) {
  return(
    <aside className={`${styles.sidebarContainer} ${isOpen && styles.sidebarContainerOpen}`}>
      <div className={styles.sidebarHeader}>
        {isOpen && (
          <Link href="#">
            <strong className="text-blue-500">a</strong>genda
          </Link>
        )}

        <button className={styles.buttonSidebar} onClick={toggleSidebar}>
          {isOpen ? (
            <LuSquareArrowLeft size={24} />
          ) : (
            <RxHamburgerMenu size={24} />
          )}
        </button>
      </div>
      <div className={styles.sidebarContent}>
        { isOpen ? (
          <nav className={styles.navExpanded}>
            <Link href="/">
              <MdOutlineSpaceDashboard size={24} />
              Dashboard
            </Link>
            <Link href="/">
              <RiInsertRowTop size={24} />
              Agendamento
            </Link>
            <Link href="/">
              <TbDoorExit size={24} />
              Sair
            </Link>
          </nav>
        ) : (
          <nav className={styles.navIcons}>
            <Link href="/">
              <MdOutlineSpaceDashboard size={24} />
            </Link>
            <Link href="/">
              <RiInsertRowTop size={24} />
            </Link>
            <Link href="/">
              <TbDoorExit size={24} />
            </Link>
          </nav>
        )}
      </div>
    </aside>
  )
}