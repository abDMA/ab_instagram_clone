'use client'
import { isUserLogedIn } from '@/components/RecoilState'
import { NavBar, ProfileDetails } from '@/components/constant'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { useRecoilState } from 'recoil'

const Page =  () => {
  const  isLoggedIn = useRecoilState(isUserLogedIn)
  const {data:session} = useSession()
  return (
    
   <main>
    {
      (session ||  isLoggedIn[0]) ?
      <>
      <NavBar/>
      <ProfileDetails/>
      </>
      : redirect('auth/signin')
    }
   </main>
  
  )
}

export default Page
