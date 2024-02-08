'use client'

import { useEffect, useState } from "react"


const ProgressBar = ({img}) => {
 const [progress, setProgress] = useState(0) 
  useEffect(() => {
    const interval = setInterval(()=>{
     setProgress((prevProgress)=> prevProgress >= 100 ? 0 : prevProgress +20 )
    },500);
    return () =>{
      clearInterval(interval)
    }
  },[])
  
  return (
    <>
     <div className="loadinghandler flex items-center justify-center">
      <img src={img} alt="insta" className="w-[135px]" /> 
      </div>
     <div className='loadingContainer'style={{width:`${progress}%`}}/>
     </>
 
   
 
  
  );
  

  }
  


export default ProgressBar