'use client'

import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import { useLogin } from "@/hooks/useLogin"
import { toast } from "react-toastify"
import styles from '../styles.module.css'
import Link from "next/link"
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from "@/hooks/useGoogleLogin"
import AuthForm from "@/components/Forms/AuthForm"

export default function Login() {
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
      toast.success('Logado com sucesso!')
      router.push("/dashboard")

    } else {
      toast.error('Ops! Algo deu errado!')
    }
  }

  const handleGoogleLogin = async() => {
    const success = await loginWithGoogle()

    if (success) {
      toast.success('Logado com sucesso!')
      router.push("/dashboard")

    } else {
      toast.error('Ops! Algo deu errado!')
    }
  }

  const fields =[
    {
      label: "Email",
      type: "text",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    },
    {
      label: "Senha",
      type: "password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    }
  ]

  const afterFields = (
    <div className={styles.inputBox}>
      <Link href="/forgot-password" style={{ paddingLeft: 0 }}>
        <strong>Esqueceu a senha ?</strong>
      </Link>
    </div>
  )

  return (
    <AuthForm
      title="Login"
      fields={fields}
      onSubmit={handleLogin}
      buttonLabel="Entrar"
      loading={loading}
      error={error}
      afterFields={afterFields}
    >
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
    </AuthForm>
  )
}