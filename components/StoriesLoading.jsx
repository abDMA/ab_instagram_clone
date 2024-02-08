import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Pagination } from 'swiper/modules'
import React, { useRef,  } from 'react';
import {Swiper,SwiperSlide } from 'swiper/react'
const StoriesLoading = () => {
  return (
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
       <Skeleton circle width={50} height={50} borderRadius={100} />
       <Skeleton width={20} height={4} />
      </SwiperSlide>
       {Array(20).fill(0).map((_,i)=>( 
      <>
       {
        <SwiperSlide key={i +1}  className='py-1'> 
        <Skeleton circle width={50} height={50} borderRadius={100}/>
        <Skeleton  width={35} height={4} />
        </SwiperSlide>
       }
       
      </>
          ))}
      

    </Swiper>
  
    </div>    
  )
}

export default StoriesLoading