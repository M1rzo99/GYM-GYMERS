import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuthState } from '@/store/auth.store'
import React from 'react'
const Login = () => {
    const {setAuth} = useAuthState()
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl front-bold'>Login</h2>
      <p className='text-muted-foreground'>Don't have an accaunt? 
        <span className='text-blue-500 cursor-pointer hover:underline' onClick={()=>setAuth('register')}>Sign up</span></p>
        <Separator className='my-3'/>
        <div>
            <span>Email</span>
            <Input placeholder='example@gmail.com'/>
        </div>
        <div className='mt-2'>
            <span> Password</span>
            <Input type='password' placeholder='********'/>
        </div>
            <Button className='w-full h-12 mt-2 '>Login</Button>     
    </div>
  )
}
export default Login
