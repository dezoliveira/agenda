import React, { useState,  } from "react"
import auth from '../firebaseAuth'
import { signInWithEmailAndPassword } from "firebase/auth"

type LoginInfo = {
  email: string,
  password: string
}

type UseLoginResult = {
  login: (email: string, password: string) => Promise<void>
  error: string
  loading: boolean
}

export function useLogin(): UseLoginResult {
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const login = async(email: string, password: string) => {
    setError("")
    setLoading(true)

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      console.log("Usuário logado:", user);
      setLoading(false)

    } catch (error: any) {
      setError(error.message);
      setLoading(false)
    }
  }

  return { login, error, loading }
}