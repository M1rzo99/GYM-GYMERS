import { auth, db } from "@/firebase/firebase"
import { collection, getDocs, query,where } from "firebase/firestore"
import {ITask, ITaskData} from '@/types'
import {endOfMonth, endOfWeek, isWithinInterval, startOfMonth, startOfWeek} from 'date-fns'

export const TaskService={
    getTasks: async ()=>{
        let weekTotal = 0
        let monthTotal=  0
        let total=0

        const now = new Date()
        const weekStart = startOfWeek(now)
        const weekEnd  = endOfWeek(now)
        const monthOfStart = startOfMonth(now)
        const monthOfEnd = endOfMonth(now)

        const q =  query(collection(db,'tasks'),where('userId',"==", auth.currentUser?.uid))
        const querySnapshot = await getDocs(q)
      
        let taskData : ITaskData

        querySnapshot.docs.forEach(doc=>{
            const data = doc.data()
            const taskDate = new Date(data.startTime)
            const taskTime = data.totalTime || 0

            if(isWithinInterval(taskDate,{start:weekStart,end:weekEnd})){
                weekTotal +=taskTime
            }

            if(isWithinInterval(taskDate,{start:monthOfStart,end:monthOfEnd})){
                monthTotal +=taskTime
            }
            total +=taskTime
        })

        const tasks = querySnapshot.docs.map(doc=>({
            ...doc.data(),
            id:doc.id
        })) as ITask[]

        taskData = {
            tasks,
            weekTotal,
            monthTotal,
            total
        }
        return taskData
    }
}