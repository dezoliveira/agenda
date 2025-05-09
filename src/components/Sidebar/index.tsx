'use client'

import styles from './styles.module.css'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiInsertRowTop } from "react-icons/ri";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled  } from "react-icons/tb";
import { TbDoorExit } from "react-icons/tb";
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export default function Sidebar({ isOpen, toggleSidebar } : SidebarProps) {
  return(
    <aside className={`h-full transition-all duration-300 bg-slate-900 text-white p-4 ${isOpen ? 'w-[100%] text-2xl text-center absolute top-0 left-0 z-10 sm:w-[15%] sm:text-base sm:text-left sm:sticky' :  'auto'}`}>
      <div className="flex items-center justify-between w-full">
        {isOpen && (
          <Link href="#">
            <strong className="text-blue-500">a</strong>genda
          </Link>
        )}

        <button onClick={toggleSidebar}>
          {isOpen ? (
            <TbLayoutSidebarRightExpandFilled size={24} className="text-blue-500" />
          ) : (
            <TbLayoutSidebarLeftExpandFilled size={24} className="text-blue-500" />
          )}
        </button>
      </div>
      <div className='py-[15px]'>
        { isOpen ? (
          <nav className='flex flex-col gap-[15px]'>
            <Link href="/" className='flex gap-[5px] hover:text-blue-500 hover:cursor-pointer'>
              <MdOutlineSpaceDashboard size={24} />
              Dashboard
            </Link>
            <Link href="/" className='flex gap-[5px] hover:text-blue-500 hover:cursor-pointer'>
              <RiInsertRowTop size={24} className='hover:cursor-pointer hover:text-blue-500'/>
              Agendamento
            </Link>
            <Link href="/" className='flex gap-[5px] hover:cursor-pointer hover:text-blue-500'>
              <TbDoorExit size={24} className='hover:cursor-pointer hover:text-blue-500'/>
              Sair
            </Link>
          </nav>
        ) : (
          <nav className='flex flex-col gap-[15px]'>
            <MdOutlineSpaceDashboard size={24}  className='hover:cursor-pointer hover:text-blue-500'/>
            <RiInsertRowTop size={24} className='hover:cursor-pointer hover:text-blue-500'/>
            <Link href="/" className=''>
              <TbDoorExit size={24} className='hover:cursor-pointer hover:text-blue-500'/>
            </Link>
          </nav>
        )}
      </div>
    </aside>
  )
}