import { User } from 'firebase/auth'
import styles from './styles.module.css'
import { FcGoogle } from "react-icons/fc";

type DropdownItens = {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

type DropdownProps = {
  user: {
    name: string
    email: string
    photo: string
  }
  items: DropdownItens[]
  showDropdown: boolean
  providerData: string
}

export default function Dropdown({ user, items, showDropdown, providerData }: DropdownProps) {

  return (
    <>
      {
        showDropdown && (
          <div className={styles.dropdownContainer}>
            { user && (
              <div className='text-center pt-4'>
                <h4>{user.name}</h4>
                <div className={styles.dropdownUserInfo}>
                  { 
                    providerData.includes('google') && (
                      <FcGoogle size={18}/>
                    )
                  }
                  <small className='text-slate-300'>{user.email}</small>
                </div>
              </div>
            )}
            <ul>
              <hr className='mx-[15px] my-[0]'/>
              {
                items.map((item, i) =>(
                  <li key={i} onClick={item.onClick}>
                    {item.icon}
                    <p>{item.label}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </>
  )
}