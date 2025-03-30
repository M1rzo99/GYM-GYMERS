import { auth } from "@/firebase/firebase"
import { ReactNode,useEffect, useState } from "react"
import FillLoading from "@/components/shared/fill-loading"
import { useUserState } from "@/store/user.store"

const AuthProvider = ({children}:{children:ReactNode})=>{
    const [isLoading,setIsLoading] = useState(true)
    const {setUser} = useUserState()
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            user && setUser(user)
            setIsLoading(false)
        })
    },[])
return isLoading ? <FillLoading/> : <>{children} </>
}
export default AuthProvider