import men from '@/assets/men.png'
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card'
import { featuresItems, programs } from "@/constants"
import React from "react"
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
	return( <>
<div className="flex items-center w-full h-screen">
  <div className="flex flex-col justify-center h-full max-w-xl ml-60">
    <h1 className="font-semibold uppercase text-9xl">Workout with me</h1>
    <p className="text-muted-foreground"> Lorem ipsum dolor sit amet, consectetur
       adipisicing elit. Animi soluta, quisquam quidem, voluptas inventore, 
       \eius quod ut aperiam ipsa no</p>
       <Button className="h-12 mt-6 font-bold w-fit size={'lg'}">Join club now</Button>
       <div className="mt-24">
        <p className="text-muted-foreground"> AS FEATURED IN</p>
        <div className="flex items-center gap-5 mt-2">
          {featuresItems.map((Icon,idx)=>(
            <Icon key={idx} className="w-12 h-12"/>
          ))}
        </div>
       </div>
  </div>
  <img src={men} className='w-1/4' alt="men" /> 
</div>

<div className='container max-w-6xl mx-auto'>
  <h1 className='text-4xl'>Not sure where to start</h1>
  <p className='mt-2 text-muted-foreground'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Eligendi  provident incidunt 
  </p>
  <div className='grid grid-cols-3 gap-4 my-8'>
    {programs.map(item=>(
      <Card key={item.title} className='relative p-8 cursor-pointer group'>
        <h3>{item.title}</h3>
        <p className='mt-2 text-sm text-muted-foreground'>{item.descr}</p>
        <Button size={'icon'} variant={'ghost'} className='absolute transition-transform right-2 top-1/3 group-hover:translate-x-1'>
          <FaArrowRightLong />
        </Button>
      </Card>
    ))}
  </div>
</div>
  </>
  )
}

export default Home
