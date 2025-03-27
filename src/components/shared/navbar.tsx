import React from 'react'
import { navLinks } from '../../constants'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
  return (
    <div className='w-full h-[10vh] border-b fixed inset-0 z-50 bg-background'>
      <div className='container flex items-center justify-between h-full mx-auto max-w6xl'>
        <h1 className='text-2xl font-bold uppercase'>workout</h1>
        <div className='flex items-center gap-3'>
            {navLinks.map(itm=>(
                <a href=
                {itm.path}
                key={itm.path}
                className='font-medium hover:underline'
                >
                    {itm.label}
                </a>
               
            ))}
            <ModeToggle/>
             <Button variant={'secondary'}>Join free</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
