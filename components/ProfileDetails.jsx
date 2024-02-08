'use client'
import React, { useState } from 'react'
import { EditProfile, Settings } from './constant'
import { useSession } from 'next-auth/react'
import { FaUserEdit,FaUserCog  } from "react-icons/fa";

const ProfileDetails = () => {
  const {data:session,status} = useSession()
  const [border, setBorder] = useState(true)
  const [border1, setBorder1] = useState(false)
  const [isAlreadyBlack, setIsAlreadyBlack] = useState(true)
const leftBorderHnadler = () =>{
 if (border1) {
 setBorder(true)
 setBorder1(false)
 setIsAlreadyBlack(true)
 }else{
  setBorder(true)
  setIsAlreadyBlack(true)
 }
  
}
const leftBorderHnadler1 = () =>{
  if (border) {
    setBorder(false)
    setBorder1(true)
    setIsAlreadyBlack(true)
  }else{
    setIsAlreadyBlack(true)
    setBorder1(true)
  }

}

  return (
    <section className={`flex min-h-[89vh] lg:max-w-5xl md:max-w-3xl max-w-xs mx-auto overflow-y-hidden shadow-sm mt-5 `}>
      <div className={`lg:flex-[0.34] sm:w-[200px] w-[65px]  flex flex-col border border-[#EFEFEF] rounded-sm ${border1 && 'mb-[10.5rem]'} mb-20 bg-white`}>
        <div  className={`border-b border-[#EFEFEF] ${border1 && 'pb-[4rem] sm:[453px] h-[478px]  '} sm:pb-[22.5rem] sm:h-[453px] h-[598px] `}>
            <div onClick={leftBorderHnadler} className={`${(border && isAlreadyBlack)  && 'border-l-4 rounded-sm  border-l-black'} sm:inline-block flex items-center justify-center cursor-pointer sm:px-10 px-3 py-4 text-[14px] font-bold hover:text-[#000000b2]`}>
            <FaUserEdit className='text-[20px] sm:hidden inline-block' />
            <p className='sm:inline-block hidden'>Edit profile</p>
            </div>
            {!session && <div  onClick={leftBorderHnadler1} className={`${(border1 && isAlreadyBlack) &&' border-l-4 rounded-sm  border-l-black'} flex items-center  cursor-pointer sm:px-10 px-3 py-4 text-[14px] font-bold hover:text-[#000000b2]`}>
            <FaUserCog className='text-[20px] sm:hidden inline-block' />
            <p className='sm:inline-block hidden'>Change password</p>
              </div>}
        </div>
        <div className='hidden sm:inline-block lg:w-[260px] md:w-[205px] h-[280px] px-10 lg:py-[4.2rem] md:py-[3.5rem]'>
          <img className='py-1' src="meta.png" alt="" />
          <p className='text-[#0095F6] py-1'>Account center</p>
          <p className='text-[#8E8E8E] text-[12px] '>
            Control settings for connected experiences on Instagram, the Facebook app, and Messenger, including sharing stories and posts, and logging in.
          </p>
          {/* ---------meta information---------*/}
        </div>

      </div>
      <div className='flex-1  sm:w-[500px] w-[200px]  '>
        {border &&<EditProfile porps={border1}/>}
        {(!session && border1) && <Settings />}
      </div>
    </section>
  )
}

export default ProfileDetails
