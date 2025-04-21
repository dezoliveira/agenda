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
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log("Usuário logado com Google:", user)
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