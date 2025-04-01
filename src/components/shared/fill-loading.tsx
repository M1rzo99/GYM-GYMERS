
import { Skeleton } from '../ui/skeleton'
import { LuLoaderCircle } from "react-icons/lu";
const FillLoading = () => {
  return (
    <Skeleton className='absolute inset-0 z-50 flex items-center justify-center w-full h-full opacity-20'>
        <LuLoaderCircle  className='animate-spin w-7 h-7'/>
    </Skeleton>
  )
}

export default FillLoading
