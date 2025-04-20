'use client'

import Image from "next/image";
import { auth } from "./lib/firebaseAuth";
import { useEffect, useState, FormEvent } from "react";
import styles from '../app/login.module.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

type LoginCredentials = {
  email: string
  password: string
}

export default function Home() {
  const router = useRouter()

  const [user, setUser] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      console.log("Usuário logado:", user);
      setLoading(false)

      router.push('/dashboard')

    } catch (error: any) {
      setError(error.message);
      setLoading(false)
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
          >
            Login
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
