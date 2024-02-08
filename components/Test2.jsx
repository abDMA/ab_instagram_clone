'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/effect-fade';
import styles from '@/styles/swiper.module.css'

const Test2 = () => {
  return (
<div className='w-[250px] h-[541px] absolute top-[26px] right-[63px] bg-red'>
<Swiper  
autoplay={{
    delay: 4000,
    disableOnInteraction: false,
      }}
      effect={'fade'}
    
        
       
        
    modules={[Autoplay,EffectFade]}
    className={`${styles.swiper} imgAni`}
  >
    <SwiperSlide className={`${styles.swiperslide}`} >
      <img src="/carousel.svg" alt=""  />
    </SwiperSlide>
    <SwiperSlide className={`${styles.swiperslide}`} >
      <img src="/carousel2.svg" alt=""  />
    </SwiperSlide>
    <SwiperSlide className={`${styles.swiperslide}`}>
        <img src="/carousel3.svg" alt=""  />
    </SwiperSlide>
  
   
  </Swiper>
</div>


    
  )
}

export default Test2