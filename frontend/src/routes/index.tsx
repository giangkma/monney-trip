import { AuthLayout } from 'components/layout/AuthLayout'
import { MainLayout } from 'components/layout/MainLayout'
import { Home } from 'pages/home'
import { Login } from 'pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainLayout />}>
          
        </Route>

        <Route path="/login" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<></>} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
