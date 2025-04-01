import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import  { useState } from 'react'
import { loginSchema } from '@/lib/validation'
import { useAuthState } from '@/store/auth.store'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { signInWithEmailAndPassword } from 'firebase/auth'
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


const Login = () => {
  
    const {setAuth} = useAuthState()
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const {setUser} = useUserState()


    const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {email: "", password:""},
    })

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
      const { email, password } = values;
      setIsLoading(true);
    
      try {
        // Bu yerda 'await' qo'shish kerak
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user)
        navigate('/');
        
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    

    
  return (
    <div className='flex flex-col'>
     {isLoading &&  <FillLoading/>}
      <h2 className='text-xl front-bold'>Login</h2>
      <p className='text-muted-foreground'>Don't have an accaunt? 
        <span className='text-blue-500 cursor-pointer hover:underline' onClick={()=>setAuth('register')}>Sign up</span></p>
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
              
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div>
          <Button type="submit" className='w-full h-12 mt-2' disabled={isLoading}>Submit</Button>
        </div>
      </form>
    </Form>

    
    </div>
  )
}
export default Login
