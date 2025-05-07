'use client'

import { useSearchParams, useRouter } from "next/navigation"
import styles from '../auth/styles.module.css'
import { useState } from "react"
import { auth } from "@/lib/firebaseAuth"
import { confirmPasswordReset } from "firebase/auth"
import { toast } from "react-toastify"
import { MdMarkEmailRead } from "react-icons/md";
import StatusAlert from "@/components/StatusAlert"
import { Button } from "@/components/Button"
import { firebaseErrorMessage } from "@/lib/firebaseErrorMessages"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {
      await confirmPasswordReset(auth, oobCode!, password)
      toast.success('Senha alterada com sucesso!')
      // router.push('/auth/login')
      setSuccess(true)

    } catch (error: any) {
      const firebaseErrorCode = error.code || error.message
      const errorMessage = firebaseErrorMessage(firebaseErrorCode)
      toast.error(errorMessage)
      
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

              <Button
                type="submit"
                text="Alterar Senha"
                loading={loading}
              />
              
            </>
          ) : (
            <>
              <StatusAlert 
                status="success"
                title="Senha alterada com sucesso"
                message="Sua senha foi alterada! Faça login e continue usando o agenda."
                icon={<MdMarkEmailRead size={60} className="text-green-500" />}
              />
              
              <Button
                type="button"
                text="Fazer Login"
                loading={loading}
                route="/auth/login"
              />
            </>
          )
        }
      </form>
    </div>
  )
}