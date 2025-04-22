import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from "../lib/firebaseAuth"

interface AuthContextProps {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true
})

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe() // Limpa o listener quando desmonta (recomendação)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
