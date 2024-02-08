'use client'
import { usersData } from '@/utils/usersData'
import React, { useEffect, useState } from 'react'
import {EmailState, ProfilState,UserName,isUserLogedIn } from './RecoilState'
import { useRecoilState } from 'recoil'
import {signOut} from "firebase/auth";
import { auth } from '@/app/firebase';
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signOut as signOUT } from 'next-auth/react'
import {MiniProfilLoading} from '@/components/constant'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const MiniProfile = () => {
  const {data:session} = useSession()
  const [results, setResults] = useState([])
  const userName = useRecoilState(UserName);
  const profileImg = useRecoilState(ProfilState)
  const userEmail = useRecoilState(EmailState)
  const photoUrl = 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserLogedIn)
  const [loading, setLoading] = useState(false)
 

  useEffect(() => {
setLoading(true)
 usersData('https://randomuser.me/api/?results=20').then((data) => 
 setResults(data?.results)).then(()=>{
  setLoading(false)
 }).catch((err=>{
  console.log(err)
  setLoading(true)
 }))

  },[])
  const mini = results?.slice(16)
 const signOutHandle = () => {
  signOut(auth).then(() => {
    setIsLoggedIn(false)
  redirect('/auth/signin')
}).catch((error) => {
  const erorMsg = error.message
 console.log(erorMsg)
});
  }
  
  
  return (
    loading ? <MiniProfilLoading/> :
    <div className="lg:w-[260px] w-[250px] flex items-start flex-col "> 
        {(userName[0] && userEmail[0] ) ? <div className='flex items-center gap-5 mt-6'>
          <img src={profileImg[0] ? profileImg[0] : photoUrl} alt="" className='lg:w-[45px] h-[39px] w-[55px] object-cover rounded-full' />
          <div>
          <h1 className='font-bold text-[15px]'>{userName[0]} </h1>
          <p className='text-xs font-light'>{userEmail[0]}</p>
          </div>
          <div>
            <button onClick={()=>session? signOUT() : signOutHandle()} className='text-sky-300 text-xs cursor-pointer hover:text-red-500 ease-out duration-200'>Sign Out</button >
          </div>
        </div> : <div className='flex items-center gap-5 mt-6'>
          <Skeleton  circle width={42} height={42} borderRadius={100} />
          <div>
            <Skeleton  width={75} height={8}/>
            <Skeleton width={138} height={7}/>
          </div>
          <Skeleton width={36} height={40}/>
      </div>}
        <div className='flex items-start justify-between px-2  w-full mt-3 '>
          <p className='text-xs font-bold text-neutral-500 '>Suggestion for you</p>
          <p className='cursor-pointer text-xs font-bold text-neutral-600 hover:underline ease-out'>See All</p>
        </div>
        <div className='mt-3'>
        {mini?.map((min,id)=>(
          
  
          <div  key={id} className='flex items-center gap-4 mt-3' >
               <img src={min?.picture?.large} alt="" className='w-[35px] rounded-full' />
          <div>
          <h1 className='font-bold text-xs w-15 truncate'>{`${min?.name?.first} ${min?.name?.last}`}</h1>
          <p className='text-xs font-light'>{min?.email}</p>
          </div>
          </div>
          ))}

        </div>
          
         
        
      </div>
    
  )
}

export default MiniProfile