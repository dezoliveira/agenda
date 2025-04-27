import { User } from 'firebase/auth'
import styles from './styles.module.css'

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
}

export default function Dropdown({ user, items }: DropdownProps) {

  return (
    <div className={styles.dropdownContainer}>
      { user && (
        <div className='text-center pt-4'>
          <h4>{user.name}</h4>
          <small className='text-slate-300'>{user.email}</small>
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