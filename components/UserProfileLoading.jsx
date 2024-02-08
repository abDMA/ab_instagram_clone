import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const UserProfileLoading = () => {
  return (
    <section className='flex flex-col items-center  min-h-[89vh] md:max-w-5xl max-w-xs mx-auto overflow-y-hidden mt-5'>
        <div className='flex justify-start mt-8 items-start gap-[5.7rem] border-b-[1px] border-b-[#EFEFEF] pb-3'>
            <div className='flex items-end justify-end mt-[-15px] flex-[0.415] ml-[96px]'>
                <Skeleton circle width={150} height={150} borderRadius={100} />
            </div>
            <div className='flex flex-[0.45] justify-end flex-col gap-3'> 
            <div className='flex items-center gap-6'>
                <Skeleton width={120} height={6} />
                <Skeleton width={80} height={4} />
                <Skeleton width={20} height={20} />
            </div>
                <div className='flex items-center gap-12 text-[15px] font-normal'>
                    <Skeleton width={60} height={2} />
                    <Skeleton width={80} height={2} />
                    <Skeleton width={80} height={2} />
                </div>
                <div className='capitalize text-[16px] font-semibold'><Skeleton width={50} height={4}/>
                </div>
                <div className='text-[14px] text-[#313131]'>
                    <Skeleton count={3} width={400} height={3} />
                </div>
            </div>

        </div>
        <div className='flex items-center gap-2 border-t-[1px] border-t-black px-[31px]  mt-[-1.5px] '>
        </div>
        <div className='flex items-center gap-3'>
        <img src="/frame.svg" className='w-[12px] h-[12px] object-cover' alt="" />
            <span className='text-[12px] font-semibold py-2'>POSTS</span>
        </div>

     {/*  <div className='flex items-start justify-start gap-2 flex-wrap ml-20 mt-1'>
            <div className='w-[290px] h-[290px] bg-slate-500'/>
            <div className='w-[290px] h-[290px] bg-slate-500'/>
            <div className='w-[290px] h-[290px] bg-slate-500'/>
            <div className='w-[290px] h-[290px] bg-slate-500'/>
            
  </div>*/}

    </section>
  )
}

export default UserProfileLoading