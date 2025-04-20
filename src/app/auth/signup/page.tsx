'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import styles from '../../login.module.css'
import Link from 'next/link'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/app/lib/firebaseAuth'

export default function SignUp() {
  const router = useRouter()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState("")

  const handleRegister = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      await updateProfile(user, {
        displayName: name
      })

      console.log("Usuário registrado", userCredentials.user)
      setLoading(false)
      router.push("/")
      
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginContent} onSubmit={handleRegister}>
        <h1 className={styles.title}>Registrar</h1>
        <div className={styles.inputBox}>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <label>Confirmar Senha</label>
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </div>

        <div className={styles.inputBox}>
          <p>Já é registrado ?
            <Link href="/">
              <strong>Faça Login</strong>
            </Link>
          </p>
        </div>
        
      </form>
    </div>
  )
}