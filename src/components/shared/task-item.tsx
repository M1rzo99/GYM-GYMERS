import React from 'react'
import { Card } from '../ui/card'
import { MdOutlineTaskAlt } from 'react-icons/md'
import {CiPlay1} from 'react-icons/ci'
import { Button } from '../ui/button'
import {HiStatusOnline} from 'react-icons/hi'
import { Edit2, Trash } from 'lucide-react'
import { ITask } from '@/types'

interface Props{
    task:ITask,
    onStartEditing:()=> void
    onDelete:()=> void
}

const TaskItem = ({task,onStartEditing,onDelete}:Props) => {
  return (
    <Card className='relative grid items-center w-full grid-cols-4 p-4 shadow-md'>
        <div className='flex items-center w-full col-span-2 gap-1 '>
            <MdOutlineTaskAlt className='text-blue-500'/>
            <span className='capitalize'>{task.title}</span>
        </div>
        <div className='flex items-center gap-1'>
            <HiStatusOnline className='text-blue-500' />
            <span className='text-sm capitalize'>{task.status}</span>
        </div>
        <div className='flex items-center col-span-1 gap-1 justify-self-end'>
            <Button variant={"ghost"} size="icon" className='w-8 h-8'>
        <CiPlay1 className='w-5 h-5 text-indigo-500'/>
            </Button>
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
