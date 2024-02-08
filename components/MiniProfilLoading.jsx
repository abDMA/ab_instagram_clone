import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MiniProfilLoading = () => {
  return (
    <div className="lg:w-[260px] w-[250px] flex items-start flex-col ">
      <div className='flex items-center gap-5 mt-6'>
          <Skeleton  circle width={42} height={42} borderRadius={100} />
          <div>
            <Skeleton  width={75} height={8}/>
            <Skeleton width={138} height={7}/>
          </div>
          <Skeleton width={36} height={40}/>
      </div>
      <div className='flex items-start justify-between px-2  w-full mt-3 '>
          <Skeleton width={110} height={6} />
          <Skeleton width={40} height={6}  />
        </div>
        {Array(4).fill(0).map((_,i)=>(
           <div className='mt-3' key={i}>
           <div  className='flex items-center gap-4 mt-3' >
           <Skeleton  circle width={42} height={42} borderRadius={100} />
           <div>
           <Skeleton  width={75} height={8}/>
           <Skeleton width={145} height={7}/>
           </div>
           </div>
         </div>

))}
       
    </div>
  )
}

export default MiniProfilLoading

