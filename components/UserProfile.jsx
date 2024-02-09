'use client'
import Link from 'next/link';
import { Description, NameState, ProfilState, UserName, userUid } from './RecoilState';
import { BsGearWide } from "react-icons/bs";
import { useRecoilState } from 'recoil';
import { UserProfileLoading, UserProfileMobile } from './constant';
import UserMobileLoading from './UserMobileLoading';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const {data:session} = useSession()
    const userName = useRecoilState(UserName);
    const profileImg = useRecoilState(ProfilState)
    const description = useRecoilState(Description)
    const name = useRecoilState(NameState)
    const photoUrl = 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'
    const [posts, setPosts] = useState([])
    const UserUid = useRecoilState(userUid)
    const ProviderId = session?.user?.id
    useEffect(() => { 
        return onSnapshot(query(collection(db,'posts',session ? ProviderId : UserUid[0],'post')),snapshot =>{
            setPosts(snapshot.docs)
        })
        
        
      }, [session])
    
  return (
    (!userName[0] || !name) ?
    <>
    <div className='sm:inline-block hidden'><UserProfileLoading/></div>
    <div className='sm:hidden inline-block'><UserMobileLoading/></div>
    
    </>
   :
    <section className='flex flex-col items-center sm:justify-center min-h-[89vh] sm:max-w-5xl max-w-md mx-auto overflow-y-hidden sm:mt-5 mt-2'>
        <div className='sm:hidden  w-full inline-block'>
       { (!userName[0] || !name) ? <UserMobileLoading/> : <UserProfileMobile/> }
        </div>
        <div className='sm:flex hidden  justify-start mt-8 items-start gap-[5.9rem] border-b-[1px] border-b-[#EFEFEF] pb-3'>
            <div className='flex items-end justify-end mt-[-15px] flex-[0.415]'>
                <img src={profileImg[0] ? profileImg[0] : photoUrl} alt="Photo profile" className='w-[177px] h-[150px] object-contain rounded-full '/>
            </div>
            <div className='flex flex-[0.45] justify-end flex-col gap-3'> 
            <div className='flex items-center gap-6'>
                    <h1 className='text-[28px] pb-[5px] font-normal'>{userName[0]}</h1>
                    <Link href='/settings' className='text-[14px] font-[500] cursor-pointer hover:text-sky-400'>Edit profile</Link>
                    <Link href='/settings'><BsGearWide className='text-[24px]'/></Link>
            </div>
                <div className='flex items-center gap-12 text-[15px] font-normal'>
                    <span>0 posts</span>
                    <span>0 followers</span>
                    <span>0 following</span>
                </div>
                <div className='capitalize text-[16px] font-semibold'>{name[0]}</div>
                <div className='text-[14px] text-[#313131]'>{description[0]}</div>
            </div>

        </div>
        <div className='flex items-center gap-2 border-t-[1px] border-t-black px-[31px]  sm:mt-[-1.5px]  '>
        </div>
        <div className='flex items-center gap-3'>
        <img src="/frame.svg" className='w-[12px] h-[12px] object-cover' alt="" />
            <span className='text-[12px] font-semibold py-2'>POSTS</span>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-3 gap-1 md:grid-cols-2 lg:gap-2 md:gap-4 sm:grid-cols-3 sm:gap-4 md:px-5 sm:px-2 sm:py-2'>
        {posts.map((post,i) =>(
            <div key={i+1} className=' md:w-[290px] md:h-[290px] sm:w-[190px] sm:h-[190px] w-[104px] h-[104px] bg-slate-500'>
                <img src={post.data().PostImage} alt="postImg" className='w-full h-full object-cover' />
            </div>
        ))}  
        </div>

    </section>
  )
}

export default UserProfile

