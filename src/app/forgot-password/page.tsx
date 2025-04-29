'use client'

import { useState } from "react";
import styles from '../auth/styles.module.css'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("Email enviado com sucesso!")
      setSuccess(true)

    } catch (err: any) {
      toast.error("Ops! Algo deu errado!")
      setError(err.message)
      setSuccess(false)
    }

    setLoading(false)
  }
  
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginContent} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Esqueceu sua senha ?</h1>
        {
          !success ? (
            <>
              <div className="flex items-center flex-col text-yellow-500">
                <MdOutlineEmail size={60} />
                <p>Preparando o envio do email</p>
              </div>
              <p>Informe seu e-mail para continuarmos com a recuperação da sua senha.</p>
              <div className={styles.inputBox}>
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              { error && (
                <div>
                  <p>{error.message}</p>
                </div>
              )}
              
              <div className={styles.inputBox}>
                <button
                  type="button"
                  className={styles.button}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Carregando..." : "Enviar"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center flex-col text-green-500 justify-center">
                <MdMarkEmailRead size={60} color="#22c55e"/>
                <p>Enviado com sucesso!</p>
              </div>
              <p>Te enviamos um email, siga os passos para recuperar a sua senha.</p>

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