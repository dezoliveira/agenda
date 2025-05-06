import { FcGoogle } from "react-icons/fc"
import styles from './styles.module.css'

type GoogleButtonProps = {
  text: string
  loading: boolean
  onClick: () => void
}

export default function GoogleButton({ text, loading, onClick } : GoogleButtonProps) {
  
  return (
    <>
      <div className={styles.buttonContainer}>
        <button
          type="submit"
          className={styles.googleButton}
          disabled={loading}
          onClick={onClick}
        >
          <FcGoogle size={32}/>
          {loading ? "Carregando..." : text}
        </button>
      </div>
    </>
  )
}