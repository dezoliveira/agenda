import { signOut } from "firebase/auth"
import { useState } from "react"
import { auth } from "../lib/firebaseAuth"

type UseLogoutResult = {
  logout: () => Promise<boolean>
  loading: boolean
  error: string
}

export function useLogout(): UseLogoutResult {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const logout = async(): Promise<boolean> => {
    setLoading(true)
    setError("")

    try {
      await signOut(auth)

      await fetch("/api/logout", {
        method: "POST"
      })

      setLoading(false)
      return true
      
    } catch (err: any) {
      setError(err.message || "Erro ao fazer logout")
      setLoading(false)
      return false
    }
  }

  return { logout, loading, error }

}