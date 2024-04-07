import { ILoginResponse } from 'domain/login'
import { createContext, useContext, useState } from 'react'

const KEY_PERSIST = 'user'

const AuthContext = createContext({
  user: undefined as ILoginResponse | undefined,
  setUser: (user: ILoginResponse) => {},
  clearUser: () => {}
})

export default function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {
  const persistedUser = JSON.parse(localStorage.getItem(KEY_PERSIST) ?? '{}')

  const [userInfo, setUserInfo] = useState<ILoginResponse | undefined>(
    persistedUser
  )

  const setUser = (user: ILoginResponse) => {
    console.log(user)
    setUserInfo(user)
    localStorage.setItem(KEY_PERSIST, JSON.stringify(user))
  }

  const clearUser = () => {
    setUserInfo(undefined)
    localStorage.removeItem(KEY_PERSIST)
  }

  return (
    <AuthContext.Provider value={{ user: userInfo, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthProvider = () => useContext(AuthContext)
