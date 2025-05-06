'use client'

import { useState } from "react";
import styles from '../auth/styles.module.css'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import StatusAlert from "@/components/StatusAlert";
import { Button } from "@/components/Button";

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("Email enviado com sucesso!")
      setStatus('success')

    } catch (err: any) {
      toast.error("Ops! Algo deu errado!")
      setError(err.message)
      setStatus('error')
    }

    setLoading(false)
  }
  
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginContent} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Esqueceu sua senha ?</h1>
        <StatusAlert status={status}/>
        {
          status !== 'success' ? (
            <>
              <div className={styles.inputBox}>
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <Button
                type="submit"
                text="Enviar"
                loading={loading}
              />

            </>
          ) : (
            <Button
              type="button"
              text="Fazer Login"
              loading={loading}
              route="/auth/loginm"
            />
          )
        }
      </form>
    </div>
  )
}