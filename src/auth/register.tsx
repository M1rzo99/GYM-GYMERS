import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuthState } from '@/store/auth.store'
import React from 'react'

const Register = () => {
    const {setAuth} = useAuthState()
  return (
    <div>
     <div className='flex flex-col'>
      <h2 className='text-xl front-bold'>Register</h2>
      <p className='text-muted-foreground'>Already have an accaunt?
         <span className='text-blue-500 cursor-pointer hover:underline' onClick={()=>setAuth('login')}>Sign in</span></p>
         <Separator className='my-3'/>
        <div>
            <span>Email</span>
            <Input placeholder='example@gmail.com'/>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-2'>
        <div>
            <span> Password</span>
            <Input type='password' placeholder='********'/>
        </div>
        <div>
            <span> Confirm password</span>
            <Input type='password' placeholder='********'/>
        </div>
        </div>
        
            <Button className='w-full h-12 mt-2 '>Register</Button>  
    </div>
    </div>
  )}

export default Register