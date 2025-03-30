import Login from '@/auth/login'
import Register from '@/auth/register'
import Social from '@/auth/social'
import { Card } from '@/components/ui/card'
import { useAuthState } from '@/store/auth.store'
import React from 'react'
import { TbH1 } from 'react-icons/tb'

const Auth = () => {
    const {authState}= useAuthState()
  return (
    <div className='flex items-center justify-center w-full h-screen bg-gradient-to-t from-foreground to-background'>
        <Card className='relative w-1/3 p-8'>
        {authState === 'login' && <Login/>}
        {authState === 'register' && <Register/>}
        <Social/>
        </Card>
    </div>
  )
}

export default Auth
