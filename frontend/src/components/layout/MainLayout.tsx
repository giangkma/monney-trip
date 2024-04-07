import { useAuthProvider } from 'contexts/AuthContext'
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './header'

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user } = useAuthProvider()

  if (!user || !user.id) return Navigate({ to: '/login' })

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative overflow-y-auto overflow-x-hidden flex flex-col flex-1 dark:bg-slate-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="md:p-10 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
