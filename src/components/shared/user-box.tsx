
import { useUserState } from '@/store/user.store'
import { LuLoader } from 'react-icons/lu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '../ui/dropdown-menu'
import { AvatarFallback, AvatarImage,Avatar } from '../ui/avatar'
import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '@/firebase/firebase'
import { CgGym } from "react-icons/cg";


const UserBox = () => {
    const {user,setUser} = useUserState()
    const navigate = useNavigate()
    if(!user) return <LuLoader className="animate-spin"/>

    const onLogout = ()=>{
        auth.signOut().then(()=>{
            setUser(null)
            navigate("/auth")
        })
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Avatar className='cursor-pointer'>
           <AvatarImage src={user.photoURL!}/>
                <AvatarFallback className='uppercase'> {user.email![0]} </AvatarFallback>
           </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-80' align='start' alignOffset={11} forceMount>
        <div className='flex flex-col space-y '>
            <p className='pt-2 pb-2 text-xs font-medium leading-none text-muted-foreground'>
                {user.email}
            </p>

            <div className='flex items-center gap-x-2'>
                <div className='p-1 rounded-md bg-secondary/50'>
                <Avatar>
                <AvatarImage  src={user.photoURL!}/>
                <AvatarFallback className='uppercase'>{user.email![0]}</AvatarFallback>
                </Avatar>
                </div>

                <div className='space-y-1'>
                    <p className='text-sm line-clamp-1'>
                        {user.displayName ?? user.email}
                    </p>
                </div>
            </div>
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>

       <Link to={'/dashboard'}>
       <DropdownMenuItem className='cursor-pointer bg-inherit' >
        <CgGym className='w-4 h-4 mr-2'/>
        <span>GYM</span>
        </DropdownMenuItem>
       </Link>

        <DropdownMenuItem className='cursor-pointer bg-destructive' onClick={onLogout}>
        <LogOut className='w-4 mr-2 h4'  />
        <span>Logout</span>
        </DropdownMenuItem>
        
        </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserBox
