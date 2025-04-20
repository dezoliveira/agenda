import React, { useState,  } from "react"
import { auth } from '@/app/lib/firebaseAuth'
import { signInWithEmailAndPassword } from "firebase/auth"

type LoginCredentials = {
  email: string,
  password: string
}

type UseLoginResult = {
  login: (credentials: LoginCredentials) => Promise<boolean>
  error: string
  loading: boolean
}

export function useLogin(): UseLoginResult {
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const login = async({email, password}: LoginCredentials) => {
    setError("")
    setLoading(true)

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      console.log("Usuário logado:", user);
      setLoading(false)

      return true

    } catch (error: any) {
      setError(error.message);
      setLoading(false)

      return false
    }
  }

  return { login, error, loading }
}