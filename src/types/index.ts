export interface ITaskData{
    weekTotal:number,
    monthTotal:number,
    total:number,
    tasks:ITask[]
}

export interface ITask{
    id:string,
    title:string,
    startTime:number,
    endTime:number,
    totalTime:number,
    userId:string,
    status:ITaskStatus
}

export type ITaskStatus = 'unstarted' | 'in_progress' | 'paused'