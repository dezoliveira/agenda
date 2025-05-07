import { signOut } from "firebase/auth"
import { useState } from "react"
import { auth } from "../lib/firebaseAuth"
import { firebaseErrorMessage } from "@/lib/firebaseErrorMessages"

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
      
    } catch (error: any) {
      const firebaseErrorCode = error.code || error.message
      const errorMessage = firebaseErrorMessage(firebaseErrorCode)
      setError(errorMessage)
      setLoading(false)
      return false
    }
  }

  return { logout, loading, error }

}