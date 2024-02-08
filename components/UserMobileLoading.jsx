import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const UserMobileLoading = () => {
  return (
    <div className='flex flex-col bg-white gap-1 px-5 py-2'> 
        <div className='flex px-4 py-4 justify-between items-center'>
        <Skeleton circle borderRadius={100} width={20} height={20}/>
           <h1 className='text-[15px] font-bold  '>
           <Skeleton  width={70} height={8}/>
           </h1>
           <Skeleton circle borderRadius={100} width={20} height={20}/>
        </div>
        <div className='flex items-center gap-6'>
        <Skeleton circle borderRadius={100} width={70} height={70}/>
        <div className='flex flex-[0.8] items-center gap-4'>
        <p className='flex items-center flex-col  text-center font-normal text-[14px] leading-[1.1]'>
        <Skeleton width={50} height={40} />
            </p>
            <p className='flex items-center flex-col  text-center font-normal text-[14px] leading-[1.1]'>
            <Skeleton width={50} height={40} />
            </p>
            <p className='flex items-center flex-col  text-center font-normal text-[14px] leading-[1.1]'>
            <Skeleton width={50} height={40} />
            </p>
            
        </div>
        
        </div>
        <div>
        <Skeleton width={70} height={6} />
        </div>
        <div>
                <Skeleton count={3} width={350} height={6} />
        </div>

    </div>
  )
}

export default UserMobileLoading