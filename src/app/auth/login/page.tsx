'use client'

import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import { useLogin } from "@/hooks/useLogin"
import { toast } from "react-toastify"
import styles from '../styles.module.css'
import Link from "next/link"
import { useGoogleLogin } from "@/hooks/useGoogleLogin"
import { Button } from "@/components/Button"
import GoogleButton from "@/components/GoogleButton"
import { AuthLink } from "../components/AuthLink"

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
    
    const result = await login(credentials)

    if (result.success) {
      toast.success('Logado com sucesso!')
      router.push("/dashboard")

    } else {
      toast.error(result.error || "Erro ao logar")
    }
  }

  const handleGoogleLogin = async() => {
    const result = await loginWithGoogle()

    if (result.success) {
      toast.success('Logado com sucesso!')
      router.push("/dashboard")

    } else {
      toast.error(result.error || "Erro ao logar com o google")
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
          <Link href="/forgot-password" style={{ paddingLeft: 0 }}>
            <strong>Esqueceu a senha ?</strong>
          </Link>
        </div>

        <Button
          text="Login"
          type="submit"
          loading={loading}
        />

        <div className={styles.dividerBox}>
          <span className={styles.divider}></span>
            <p>OU</p>
          <span className={styles.divider}></span>
        </div>

        <GoogleButton
          text="Entrar com Google"
          loading={loadingGoogle}
          onClick={handleGoogleLogin}
        />

        <AuthLink
          message="Não possui uma conta ?"
          hrefLink="/auth/signup"
          hrefText="Registre-se"
        />
      </form> 
    </div>
  );
}