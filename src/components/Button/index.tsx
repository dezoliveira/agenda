import styles from './styles.module.css'
import { useRouter } from 'next/navigation'

type ButtonProps = {
  text: string
  type: 'button' | 'submit'
  loading: boolean
  route: string
}

export function Button({ text, type, loading, route } : ButtonProps) {
  const router = useRouter()
  
  return(
    <>
      <div className={styles.buttonContainer}>
        <button
          type={type}
          className={styles.button}
          disabled={loading}
          onClick={() => router.push(route)}
        >
          {loading ? "Carregando..." : text}
        </button>
      </div>
    </>
  )
}