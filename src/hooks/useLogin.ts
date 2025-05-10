import React, { useState,  } from "react"
import { auth } from '@/lib/firebaseAuth'
import { signInWithEmailAndPassword } from "firebase/auth"
import { firebaseErrorMessage } from '@/lib/firebaseErrorMessages'

type LoginCredentials = {
  email: string,
  password: string
}

type UseLoginResult = {
  login: (credentials: LoginCredentials) => Promise<AuthError>
  error: string
  loading: boolean
}

type AuthError = {
  success: boolean
  error?: string
}

export function useLogin(): UseLoginResult {
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const login = async({email, password}: LoginCredentials) => {
    setError("")
    setLoading(true)

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCredentials.user.getIdToken()
      
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ token })
      })

      if (!response.ok) {
        throw new Error("Erro ao iniciar sessão")
      }
      
      setLoading(false)
      return { success: true }

    } catch (error: any) {
      const firebaseErrorCode = error.code || error.message
      const errorMessage = firebaseErrorMessage(firebaseErrorCode)
      setError(errorMessage)
      setLoading(false)
      console.log(error)

      return { success: false, error: errorMessage }
    }
  }

  return { login, error, loading }
}