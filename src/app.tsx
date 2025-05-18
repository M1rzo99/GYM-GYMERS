import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Home from './pages/home'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import { Toaster } from './components/ui/sonner'
import { useNavigate } from 'react-router-dom'
import { useUserState } from '@/store/user.store'
import { useEffect } from 'react'

const App = () => {
  const { user } = useUserState()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/auth')  // login page ga redirect
    }
  }, [user, navigate])
	return (
		<>
		<Navbar/>
		<Routes>
			<Route path='/' element={<Home/>}/>
			<Route path='/auth' element={<Auth/>}/>
			<Route path='/dashboard' element={<Dashboard/>}/>
		</Routes>
		<Toaster position='top-center'/>
		</>
	)
}

export default App
