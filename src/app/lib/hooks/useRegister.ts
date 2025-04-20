import { useState } from "react"
import { auth } from "../firebaseAuth"
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

type UseRegisterResult = {
  register: (name: string, email: string, password: string) => Promise<void>
  error: string
  loading: boolean
}

export function useRegister(): UseRegisterResult {
  const router = useRouter()
  
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const register = async(name:string, email: string, password: string) => {
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
      router.push("/")
      
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return { register, error, loading }
}