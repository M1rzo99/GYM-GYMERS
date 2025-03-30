import { create } from "zustand"
import { User } from "firebase/auth"

type UserType = User | null 
interface IUserStateStore{
    user:UserType,
    setUser:(user:UserType)=> void
}

export const useUserState = create <IUserStateStore> (set=>({
    user:null,
    setUser:user => set({user})
}))