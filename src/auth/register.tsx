import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { registerSchema } from '@/lib/validation'
import { useAuthState } from '@/store/auth.store'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from '@/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import FillLoading from '@/components/shared/fill-loading'
import { useUserState } from '@/store/user.store'

const Register = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState("")
    const {setAuth}  = useAuthState()
    const navigate = useNavigate()
    const {setUser} = useUserState()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {email:"",password:""},})

  
    const onSubmit = async(values:z.infer<typeof registerSchema>)=>{
      const {email,password} = values
      setIsLoading(true)
      try {
     const res =    await createUserWithEmailAndPassword(auth,email,password)
     setUser(res.user)
        navigate('/')
      } catch (error) {
        const err = error as Error
        setError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
  return (
    <div>
     <div className='flex flex-col'>
     {isLoading &&  <FillLoading/>}
      <h2 className='text-xl front-bold'>Register</h2>
      <p className='text-muted-foreground'>Already have an accaunt?
         <span className='text-blue-500 cursor-pointer hover:underline' onClick={()=>setAuth('login')}>Sign in</span></p>
         <Separator className='my-3'/>
         {error && (
          <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription> {error}</AlertDescription>
        </Alert>
        )}
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email adress</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
         <div className='grid grid-cols-2 gap-2'>
         <FormField
          control={form.control}
          name='password' 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" type='password' disabled={isLoading} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>


          )}
        />

<FormField
          control={form.control}
          name='confirmPassword' 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl> 
                <Input placeholder="*****" type='password' disabled={isLoading} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         </div>
        <div>
          <Button type="submit" className='w-full h-12 mt-2' disabled={isLoading}>Submit</Button>
        </div>
      </form>
    </Form>
    </div>
    </div>
  )}

export default Register