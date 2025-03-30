import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/firebase/firebase'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const Social = () => {

  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onGoogle = ()=>{
    setIsLoading(true)
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth,googleProvider)
    .then(()=>{
      navigate('/')
    })
    .finally(()=> setIsLoading(false))
  }

  const onGitHub = ()=>{
    setIsLoading(true)
    const GithubProvider = new GithubAuthProvider()
    signInWithPopup(auth,GithubProvider)
    .then(()=>{
      navigate('/')
    })
    .finally(()=> setIsLoading(false))
  }
  return (
    <>
    
  <Separator className='my-3'/>
  {isLoading &&  <FillLoading/>}
  <div className='grid grid-cols-2 gap-2'>
    <Button className='h-12' variant={'secondary'} onClick={onGitHub} disabled={isLoading}>
    <FaGithub className='mr-2'/>
    <span> Sign in with Github</span>
    </Button>
    <Button className='h-12' variant={'destructive'} onClick={onGoogle} disabled={isLoading}>
    <FaGoogle className='mr-2'/>
    <span> Sign in with Google</span>
    </Button>

  </div>
    </>
    
   
  )
}

export default Social
