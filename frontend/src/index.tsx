import AuthProvider from 'contexts/AuthContext'
import ThemeProvider from 'contexts/ThemeContext'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RootRoutes } from 'routes'
import 'tailwindcss/tailwind.css'
import './style.css'
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <AuthProvider>
    <ThemeProvider>
      <RootRoutes />
      <ToastContainer position="top-center" />
    </ThemeProvider>
  </AuthProvider>
)
