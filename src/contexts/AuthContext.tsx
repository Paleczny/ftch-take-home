import React, { createContext, PropsWithChildren, useState } from 'react'

interface AuthContextType {
  authenticated: boolean
  login: (successfullyLoggedIn: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  const login = (successfullyLoggedIn: boolean) => {
    setAuthenticated(successfullyLoggedIn)
  }

  const logout = () => {
    setAuthenticated(false)
  }

  return <AuthContext.Provider value={{ authenticated, login, logout }}>{children}</AuthContext.Provider>
}
