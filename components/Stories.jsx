'use client'
import React, { useRef,  } from 'react';
import {Swiper,SwiperSlide } from 'swiper/react'
import { useEffect,useState } from "react";
import { usersData } from "@/utils/usersData";
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Pagination } from 'swiper/modules'
import {ProfilState, UserName } from './RecoilState';
import { useRecoilState } from 'recoil';
import StoriesLoading from './StoriesLoading';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Stories = () => {
  const userName = useRecoilState(UserName);
  const profileImg = useRecoilState(ProfilState)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const photoUrl = 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'
  
  
     useEffect(() => {
      setLoading(true)
    usersData('https://randomuser.me/api/?results=20').then((data) => setResults(data?.results)).then(()=>{
      setLoading(false)
    }).catch((error) =>{
      console.log(error)
      setLoading(true)
    })
     
       
     },[])
  return (
   (loading) ? <StoriesLoading/> :
    <div className=' bg-white overflow-hidden  lg:w-[44rem] md:w-[30rem] sm:w-[40rem] w-[20rem] py-4 rounded-md '>
      
       
      <Swiper
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // when window width is >= 640px
          240: {
            width: 300,
            slidesPerView: 4,
            spaceBetween: 1
          },
          640: {
            width: 640,
            slidesPerView: 7,
            spaceBetween: 1
          },
          // when window width is >= 768px
          768: {
            width: 490,
            slidesPerView: 6,
            spaceBetween: 1
          },

          1024: {
            width: 700,
            slidesPerView: 10.5,
            spaceBetween: 1
          },

        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='ml-2 py-1'>
         {userName[0] ?  <img src={profileImg[0] ? profileImg[0] : photoUrl} alt="profile" className='w-40 h-40 p-[2px] rounded-full border-red-600 border hover:scale-105 duration-150 ease-out ' /> : <Skeleton circle width={50} height={50} borderRadius={100}/>}
          {userName[0] ? <p className='truncate  w-14'>{userName[0]}</p> : <Skeleton width={20} height={4}/>}
        </SwiperSlide>
         {results?.map((result,i)=>( 
        <>
         {
          <SwiperSlide key={i +1}  className='py-1'>
            
          <img  src={result?.picture?.large} alt="images" className='w-40 h-40 p-[2px] rounded-full border-red-600 border hover:scale-105 duration-150 ease-out' />

          
          <p className='truncate  w-14'>{`${result?.name?.first} ${result?.name?.first} `}</p>
          </SwiperSlide>
         }
         
        </>
            ))}
        
  
      </Swiper>
    
      </div> 
       
  )
}

export default Stories