'use client'
import { isUserLogedIn } from '@/components/RecoilState'
import { NavBar, UserProfile } from '@/components/constant'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { useRecoilState } from 'recoil'

const Page =  () => {
  const  isLoggedIn = useRecoilState(isUserLogedIn)
  const {data:session} = useSession()
  if (session ||  isLoggedIn[0]) {
  
  
  return (
 <div>
    <NavBar/>
   <UserProfile/>
 </div>
  )
}else{
  redirect('auth/signin')
}
}

export default Page
