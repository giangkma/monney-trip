import { useAuthProvider } from 'contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  const { user } = useAuthProvider()

  if (user && user.id) return Navigate({ to: '/' })

  return <Outlet />
}
