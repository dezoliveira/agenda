'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLogin } from './lib/hooks/useLogin'
import styles from '../app/styles.module.css'
import Link from 'next/link'
import { useGoogleLogin } from './lib/hooks/useGoogleLogin'
import { FcGoogle } from 'react-icons/fc'

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { login, error, loading } = useLogin()
  const { loginWithGoogle, loading: loadingGoogle, error: errorGoogle } = useGoogleLogin()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const credentials = {
      email,
      password
    }
    
    const success = await login(credentials)

    if (success) {
      router.push("/dashboard")
    }
  }

  const handleGoogleLogin = async() => {
    const success = await loginWithGoogle()

    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginContent} onSubmit={handleLogin}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputBox}>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Login"}
          </button>
        </div>

        <div className={styles.dividerBox}>
          <span className={styles.divider}></span>
            <p>OU</p>
          <span className={styles.divider}></span>
        </div>

        <div className={styles.inputBox}>
          <button
            type="button"
            className={styles.googleButton}
            disabled={loadingGoogle}
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={32}/>
            {loadingGoogle ? "Carregando..." : "Entrar com Google"}
          </button>
        </div>

        <div className={styles.inputBox}>
          <p>Não possui uma conta ?
            <Link href="/auth/signup">
              <strong>Registre-se</strong>
            </Link>
          </p>
        </div>

        {
          error || errorGoogle && (
            <>
              <div className={styles.errorMessage}>
                <p>{error || errorGoogle}</p>
              </div>
            </>
          )
        }
      </form> 
    </div>
  );
}
