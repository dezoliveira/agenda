'use client'

import { useSearchParams, useRouter } from "next/navigation"
import styles from '../auth/styles.module.css'
import { useState } from "react"
import { auth } from "@/lib/firebaseAuth"
import { confirmPasswordReset } from "firebase/auth"
import { toast } from "react-toastify"
import { MdMarkEmailRead } from "react-icons/md";

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {
      await confirmPasswordReset(auth, oobCode!, password)
      toast.success('Senha alterada com sucesso!')
      // router.push('/auth/login')
      setSuccess(true)

    } catch (err: any) {
      toast.error('Erro ao alterar senha')
      setError(err.message)
      
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginContent} style={{ height: "45vh" }} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Alterar senha</h1>
        {
          !success ? (
            <>
              <div className={styles.inputBox}>
                <label>Nova Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className={styles.inputBox}>
                <label>Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
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

              <div className={styles.inputBox}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={loading}
                >
                  {loading ? "Alterando..." : "Alterar Senha"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center flex-col text-green-500 justify-center">
                <MdMarkEmailRead size={60} color="#22c55e"/>
                <p>Senha alterada com sucesso!</p>
              </div>
              <p>Sua senha foi alterada! Faça login e continue usando o agenda.</p>

              <div className={styles.inputBox}>
                <button
                  type="button"
                  className={styles.button}
                  disabled={loading}
                  onClick={() => router.push('/auth/login')}
                >
                  {loading ? "Carregando..." : "Fazer Login"}
                </button>
              </div>
            </>
          )
        }
      </form>
    </div>
  )
}