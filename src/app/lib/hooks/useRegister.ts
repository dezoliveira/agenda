import { useState } from "react"
import { auth } from "../firebaseAuth"
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth"

interface RegisterCredentials {
  name: string,
  email: string,
  password: string
}

interface  UseRegisterResult {
  register: (credentials: RegisterCredentials) => Promise<boolean>
  error: string
  loading: boolean
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

      console.log("Usuário registrado", userCredentials.user)
      setLoading(false)

      return true
      
    } catch (error: any) {
      setError(error.message)
      setLoading(false)

      return false
    }
  }

  return { register, error, loading }
}