import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import styles from './styles.module.css'
import Image from "next/image"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <p>Carregando...</p>
  }

  if (!user) {
    return (
      <div className={styles.noAuthMessage}>
        <Image
          src="/auth.svg"
          alt="auth-image"
          width={500}
          height={200}
        />
      
        <h1>Você precisa estar logado para acessar o dashboard</h1>
        <Link href="/">
          <button className={styles.button}>
            Fazer login
          </button>
        </Link>
      </div>
    )
  }

  return <>{children}</>
}