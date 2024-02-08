'use client'
import {isUserLogedIn } from '@/components/RecoilState'
import { AllData, Feed, NavBar } from '@/components/constant'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRecoilState } from 'recoil'




const Home =   () => {
  const isLoggedIn = useRecoilState(isUserLogedIn)
  const {data:session}= useSession()
 

 




      
  

  if (!session && !isLoggedIn[0]) {
    redirect('auth/signin')
  }

 
  return (
   
    <main>
      <NavBar/>
      <Feed/>
      <AllData/>
    </main>
  
  ) 
}

export default Home
  



 
