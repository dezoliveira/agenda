'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import styles from '../styles.module.css'
import { useRegister } from '@/hooks/useRegister'
import { toast } from 'react-toastify'
import { Button } from '@/components/Button'
import { AuthLink } from '../components/AuthLink'

export default function SignUp() {
  const router = useRouter()

  const [name, setName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
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
    
    const result = await register(credentials)

    if (result.success) {
      toast.success('Registrado com sucesso!')
      router.push('/')

    } else {
      toast.error(result.error || "Ocorreu um erro ao cadastrar.")
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
          <label>Sobrenome</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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

        <Button
          text="Cadastrar"
          type="submit"
          loading={loading}
        />

        <AuthLink
          message="Já é registrado ?"
          hrefLink="/auth/login"
          hrefText="Faça Login"
        />
        
      </form>
    </div>
  )
}