import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseAuth";

interface UseGoogleLoginResult {
  loginWithGoogle: () => Promise<boolean>
  loading: boolean
  error: string
}

export function useGoogleLogin(): UseGoogleLoginResult {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const loginWithGoogle = async (): Promise<boolean> => {
    const provider = new GoogleAuthProvider()
    setLoading(true)
    setError("")

    try {
      const userCredentials = await signInWithPopup(auth, provider)
      const token = await userCredentials.user.getIdToken()

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ token })
      })

      if (!response.ok) {
        throw new Error("Erro ao iniciar sessão com Google")
      }

      setLoading(false)
      return true

    } catch (err: any) {
      setError(err.message)
      setLoading(false)

      return false
    }
  }

  return { loginWithGoogle, loading, error }
}