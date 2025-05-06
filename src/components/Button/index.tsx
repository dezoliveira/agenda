import styles from './styles.module.css'
import { useRouter } from 'next/navigation'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit'
  loading: boolean
  route?: string
}

export function Button({ text, type = "button", loading, route } : ButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (route) {
      router.push(route)
    }
  }
  
  return(
    <>
      <div className={styles.buttonContainer}>
        <button
          type={type}
          className={styles.button}
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? "Carregando..." : text}
        </button>
      </div>
    </>
  )
}