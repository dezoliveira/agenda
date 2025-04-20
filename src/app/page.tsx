'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLogin } from './lib/hooks/useLogin'
import styles from '../app/login.module.css'

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { login, error, loading } = useLogin()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    await login(email, password)

    if (!error) {
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

        <div className={styles.inputBox}>
          <p>Não possui uma conta ?
            <a href="#">
              <strong>Registre-se</strong>
            </a>
          </p>
        </div>

        {
          error && (
            <>
              <div className={styles.errorMessage}>
                <p>{error}</p>
              </div>
            </>
          )
        }
      </form> 
    </div>
  );
}
