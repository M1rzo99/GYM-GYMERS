import men from '@/assets/men.png'
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card'
import { featuresItems, programs } from "@/constants"
import { auth } from '@/firebase/firebase'
import { useUserState } from '@/store/user.store'
import { CgGym } from 'react-icons/cg'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, setUser } = useUserState()
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null)
      navigate("/auth")
    })
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-10 text-center lg:flex-row lg:px-20 lg:text-left">
        <div className="flex flex-col items-center justify-center w-full lg:max-w-xl lg:items-start">
          <h1 className="text-4xl font-semibold leading-tight uppercase sm:text-6xl lg:text-7xl xl:text-9xl">
            Workout with me
          </h1>
          <p className="max-w-md mt-4 text-sm text-muted-foreground sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi soluta, quisquam quidem, voluptas inventore, eius quod ut aperiam ipsa no
          </p>

          {user ? (
            <div className='flex flex-col gap-4 mt-6 sm:flex-row'>
              <Link to={'/dashboard'}>
                <Button className='w-full h-12 font-bold sm:w-auto'>
                  <span>Go to GYM</span>
                  <CgGym className='w-5 h-5 ml-2' />
                </Button>
              </Link>
              <Button className='w-full h-12 font-bold sm:w-auto' variant={'destructive'} onClick={onLogout}>
                <span>Logout</span>
                <CgGym className='w-5 h-5 ml-2' />
              </Button>
            </div>
          ) : (
            <Link to={'/auth'}>
              <Button className="w-full h-12 mt-6 font-bold sm:w-auto">Join club now</Button>
            </Link>
          )}

          <div className="mt-12 sm:mt-16">
            <p className="text-sm text-muted-foreground sm:text-base">AS FEATURED IN</p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-3 lg:justify-start">
              {featuresItems.map((Icon, idx) => (
                <Icon key={idx} className="w-10 h-10 sm:w-12 sm:h-12" />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm mt-10 lg:mt-0 lg:max-w-md">
          <img src={men} className="w-full mx-auto" alt="men" />
        </div>
      </div>

      <div className='container max-w-6xl px-4 py-10 mx-auto text-center '>
        <h1 className='text-2xl font-bold sm:text-3xl lg:text-4xl'>Not sure where to start</h1>
        <p className='mt-2 text-sm text-muted-foreground sm:text-base'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi provident incidunt
        </p>

        <div className='grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3'>
          {programs.map(item => (
            <Card key={item.title} className='relative p-6 cursor-pointer sm:p-8 group'>
              <h3 className='text-lg font-semibold'>{item.title}</h3>
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
