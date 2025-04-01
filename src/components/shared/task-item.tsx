
import { Card } from '../ui/card'
import { MdOutlineTaskAlt } from 'react-icons/md'
import {CiPause1, CiPlay1} from 'react-icons/ci'
import { Button } from '../ui/button'
import {HiStatusOnline} from 'react-icons/hi'
import { Edit2, Trash } from 'lucide-react'
import { ITask, ITaskData } from '@/types'
import {RxReload} from 'react-icons/rx'
import { db } from '@/firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { QueryObserverResult } from '@tanstack/react-query'
import FillLoading from './fill-loading'

import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'

interface Props{
    task:ITask,
    onStartEditing:()=> void
    onDelete:()=> void
    refetch:()=> Promise<QueryObserverResult<ITaskData,Error>>
}

const TaskItem = ({task,onStartEditing,onDelete,refetch}:Props) => {
    const [isLoading, setIsLoading] = useState(false)
    
    const activeColor = useMemo(()=>{
        switch (task.status) {
            case "paused":
                return 'text-red-500' 
                case "in_progress":
                    return 'text-green-500'
                case 'unstarted':
                    return 'text-blue-500'
        }
    },[task.status])

    const onStart = async()=>{ 
         setIsLoading(true)
         const ref  = doc(db,'tasks',task.id)
         try {
            await updateDoc(ref,{
                status:"in_progress",
                startTime:Date.now()
            })
            refetch()
         } catch (error) {
            toast.error("An error occured")
         }finally{
            setIsLoading(false)
         }
    }
    const onPause = async()=>{
        setIsLoading(true)
        const ref  = doc(db,'tasks',task.id)
         try {
            const elapsed = task.startTime ? Date.now() - task.startTime : 0
            const newTotalTime = (task.totalTime || 0) + elapsed
            await updateDoc(ref,{
                status:"paused",
                endTime:Date.now(),
                totalTime:newTotalTime
            })
            refetch()
            }  catch (error) {
                 toast.error("An error occured")
         }finally{
            setIsLoading(false)
         }
    }

    const renderBtn = ()=>{
        switch(task.status){
            case 'unstarted':
                return(
                    <Button variant={"ghost"} size="icon" className='w-8 h-8' onClick={onStart}>
        <CiPlay1 className='w-5 h-5 text-indigo-500'/>
            </Button>
                )
                case 'in_progress':
                return(
                    <Button variant={"ghost"} size="icon" className='w-8 h-8' onClick={onPause}>
        <CiPause1 className='w-5 h-5 text-indigo-500'/>
            </Button>
                )
                case 'paused':
                return(
                    <Button variant={"ghost"} size="icon" className='w-8 h-8' onClick={onStart}>
        <RxReload className='w-5 h-5 text-indigo-500'/>
            </Button>
                )
        }
    }
  return (
    
    <Card className='relative grid items-center w-full grid-cols-4 p-4 shadow-md'>
        {isLoading && <FillLoading/>}
        <div className='flex items-center w-full col-span-2 gap-1 '>
            <MdOutlineTaskAlt className='text-blue-500'/>
            <span className='capitalize'>{task.title}</span>
        </div>
        <div className='flex items-center gap-1'>
            <HiStatusOnline  className={activeColor} />
            <span className={cn('text-sm capitalize')}>{task.status}</span>
        </div>
        <div className='flex items-center col-span-1 gap-1 justify-self-end'>
            {renderBtn()}
            <Button variant={'ghost'} size={'icon'}  onClick={onStartEditing} className='w-8 h-8 '>
                <Edit2 className='w-5 h-5' />
            </Button>
            <Button variant={'destructive'} size={'icon'} onClick={onDelete} className="w-8 h-8">
                <Trash className='w-5 h-5' />
            </Button>
        </div>
    </Card>
  )
}

export default TaskItem
