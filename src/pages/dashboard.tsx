import FillLoading from '@/components/shared/fill-loading'
import TaskItem from '@/components/shared/task-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase/firebase'
import TaskForm from '@/forms/task-form'
import { taskSchema } from '@/lib/validation'
import { TaskService } from '@/service/task.service'
import { useUserState } from '@/store/user.store'
import { ITask } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { addMilliseconds, addMinutes, format } from 'date-fns'
import { addDoc, collection, deleteDoc, doc,   updateDoc } from 'firebase/firestore'
import { AlertCircle, BadgePlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'


const Dashboard = () => {
  const [open,setOpen] = useState(false)
  const {user} = useUserState()
  const [isEdit,setIsEdit] = useState(false)
  const [currentTask,setCurrentTask]= useState<ITask | null>(null)
  const [isDeleted,setIsDeleted] = useState(false)

  const { isPending, error, data,refetch } = useQuery({
    queryKey: ['tasks-data'],
    queryFn: TaskService.getTasks
  })



  
  const onAdd = async ({title}:z.infer< typeof taskSchema>)=>{
    if(!user) return null
    return addDoc(collection(db,'tasks'),{
      title,
      status:"unstarted",
      startTime:null,
      endTime:null,
      userId:user?.uid
    }).then(()=>refetch())
    .finally(()=>setOpen(false))
  }

  const onStartEditing = (task:ITask)=>{
    setIsEdit(true)
    setCurrentTask(task)
  }

  const onUpdate = async ({title}:z.infer<typeof taskSchema>)=>{
    if(!user) return null
    if(!currentTask) return null
    const ref = doc(db,'tasks',currentTask.id)
    return updateDoc(ref,{title})
    .then(()=>refetch())
    .finally(()=>setIsEdit(false))
  }

  const onDelete = async (id:string)=>{
    setIsDeleted(true)
    const promise = deleteDoc(doc(db,'tasks',id))
    .then(()=>refetch())
    .finally(()=>setIsDeleted(false))

    toast.promise(promise,{
      loading:"Loading...",
      success:"Successfully deleted!",
      error:"Somthing went wrong!"
    })
  } 
    const formateDate =(time:number)=>{
      const date = addMilliseconds(new Date(0),time)
      const formatDate = format(addMinutes(date,date.getTimezoneOffset()),'HH:mm:ss')

      return formatDate
    }
  
  
  return (
  <>
   <div className="flex items-center h-screen max-w-6xl mx-auto px-6 pt-[8vh] md:pt-0">
  <div className="grid items-center w-full grid-cols-1 gap-8 lg:grid-cols-2">
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between w-full p-4 mt-8 rounded-md bg-gradient-to-t from-background to-secondary">
    <div className='mt-3 text-2xl font-bold '> Trainings</div>
    <Button size={'icon'} onClick={()=> setOpen(true)}>
      <BadgePlus/>
    </Button>
        </div>
        <Separator/>
        <div className='relative flex justify-between w-full p-4 rounded-md bg-gradient-to-b from-background to-secondary min-h-60'>
          {(isPending || isDeleted) && <FillLoading/>}
          {error && (
          <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription> {error.message}</AlertDescription>
        </Alert>
        )}
        {data && (
          <div className='flex flex-col w-full space-y-3'>
      {!isEdit && data.tasks.map((task)=>(
       <TaskItem 
       key={task.id} 
       task={task} 
       onStartEditing={()=>onStartEditing(task)}
       onDelete = {()=> onDelete(task.id)}
       refetch={refetch}
       />
        ))}
        {isEdit &&(
          <TaskForm title={currentTask?.title} isEdit handler={onUpdate as (values:z.infer<typeof taskSchema>) => Promise< void | null>} onClose={()=> setIsEdit(false)} />
        )}
          </div>
        )}
         
        </div>
      </div>
      <div className='flex flex-col w-full space-y-3 '>
          <div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-blue-900 to-background'>
          <div className='text-2xl font-bold'>Total Month</div>
          {isPending ? (
        <FillLoading/>
      ):(
          data && (
            <>
            <div className='text-3xl font-bold'>
            {formateDate(data.weekTotal)}
            </div>
           
            </>
          )
      )}
            
          </div>
          <div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-secondary to-background'>
          <div className='text-2xl font-bold'>Total week</div>
          {isPending ? (
        <FillLoading/>
      ):(
          data && (
            <>
            <div className='text-3xl font-bold'>
            {formateDate(data.monthTotal)}
            </div>
          
            </>
          )
      )}
            
          </div>
          <div className='relative h-24 p-4 rounded-md bg-gradient-to-r from-destructive to-background'>
             <div className='text-2xl font-bold'>Total time</div>
          {isPending ? (
        <FillLoading/>
      ):(
          data && (
            <>
            <div className='text-3xl font-bold'>
            {formateDate(data.total)}
            </div>
         
            </>
          )
      )}
            
          </div>
        </div>
    </div>
   </div>
   <Dialog open={open} onOpenChange={setOpen}>
    
  <DialogTrigger>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a new task</DialogTitle>
    </DialogHeader>
    <Separator/>
    <TaskForm handler={onAdd as (values:z.infer<typeof taskSchema>) => Promise< void | null>} onClose={()=> setIsEdit(false) }/>
  </DialogContent>
</Dialog>
  </>
  )
}

export default Dashboard
 