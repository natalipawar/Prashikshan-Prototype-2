import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('prashikshan_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('prashikshan_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now().toString(),
      loginTime: new Date().toISOString()
    }
    setUser(userWithId)
    localStorage.setItem('prashikshan_user', JSON.stringify(userWithId))
    console.log('User logged in:', userWithId)
    return { success: true, user: userWithId }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('prashikshan_user')
    console.log('User logged out')
  }

  const isLoggedIn = () => !!user

  const hasRole = (role) => user?.role === role

  const value = {
    user,
    login,
    logout,
    isLoggedIn,
    hasRole,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}