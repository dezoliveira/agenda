'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import styles from '../../styles.module.css'
import Link from 'next/link'
import { useRegister } from '@/app/lib/hooks/useRegister'

export default function SignUp() {
  const router = useRouter()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const { register, error, loading } = useRegister()

  const handleRegister = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const credentials = {
      name,
      email,
      password
    }
    
    const suceess = await register(credentials)

    if (suceess) {
      router.push('/')
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <label>Confirmar Senha</label>
          <input
            type="password"
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
  )
}