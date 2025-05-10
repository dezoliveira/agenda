import { useState } from "react"
import { auth } from "../lib/firebaseAuth"
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseErrorMessage } from "@/lib/firebaseErrorMessages"

interface RegisterCredentials {
  name: string,
  email: string,
  password: string
}

interface  UseRegisterResult {
  register: (credentials: RegisterCredentials) => Promise<AuthError>
  error: string
  loading: boolean
}

type AuthError = {
  success: boolean
  error?: string
}

export function useRegister(): UseRegisterResult {
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const register = async({name, email, password}: RegisterCredentials) => {
    setError("")
    setLoading(true)

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      await updateProfile(user, {
        displayName: name
      })

      setLoading(false)

      return { success: true }
      
    } catch (error: any) {
      const firebaseErrorCode = error.code || error.message
      const errorMessage = firebaseErrorMessage(firebaseErrorCode)
      setError(errorMessage)
      setLoading(false)

      return { success: false, error: errorMessage }
    }
  }

  return { register, error, loading }
}