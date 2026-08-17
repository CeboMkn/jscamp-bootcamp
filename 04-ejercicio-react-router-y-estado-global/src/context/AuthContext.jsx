import { useContext, createContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = () => setIsLoggedIn(true)
    const logout = () => setIsLoggedIn(false)

    const value = { isLoggedIn, login, logout }

    return <AuthContext value={value}>
        {children}
    </AuthContext>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used witing an AuthProvider')
    }
    return context
}

/**
 * Hook para acceder al contexto de autenticación
 *
 * @returns {Object} Objeto con isLogin, login y logout
 * @throws {Error} Si se usa fuera de AuthProvider
 *
 * @example
 * function MyComponent() {
 *   const { isLogin, login, logout } = useAuth()
 *   return <button onClick={login}>Login</button>
 * }
 */