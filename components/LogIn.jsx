'use client';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, {useState } from 'react';
import { ProgressBar, Test2 } from './constant';
import {AiOutlineCheckCircle,AiOutlineCloseCircle} from 'react-icons/ai';
import { TbAlertTriangleFilled } from 'react-icons/tb';
import {Password, isLoading, isUserLogedIn, userUid, verifiedChecking } from './RecoilState';
import { auth } from '@/app/firebase';
import {signIn, useSession } from "next-auth/react" ;
import { useRecoilState } from 'recoil';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const LogIn =  () => {
  const {data:session,status}= useSession();
   const router = useRouter();
   const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserLogedIn);
   const [isUserLoading, setIsUserLoading] = useRecoilState(isLoading);
   const [verfiyAcount, setVerfiyAcount] = useRecoilState(verifiedChecking);
   const Name = session?.user?.name;
   const Email = session?.user?.email;
   const PhotProfile = session?.user?.image ;
   const userId = session?.user?.id;
   const [UserUid, setUserUid] =useRecoilState(userUid);
   const [Passw, setPassw] =useRecoilState(Password);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [firebaseErr, setFirebaseErr] = useState(false);
    const [spin, setSpin] = useState(false);
    const [spin2, setSpin2] = useState(false);
    const Username = Name?.toLocaleLowerCase().replace(/ /g, '');
    const ProviderId = session?.user?.id;

    
    const emailHandler = (e) =>{
      e.preventDefault();
      setEmail(e.target.value);
      (email.length > 0 && emailValidation(email) ) ?setEmailErr(true):setEmailErr(false);
    
    };
    const passHandler = (e) =>{
      e.preventDefault();
      setPass(e.target.value);
    };
    
    const emailValidation = (email)=>{
      return String(email).toLocaleLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    };

  
    
       
           
      
       
   
      
    
    
      
     
 
  
     
    
    const GooglesignHandler = () =>{
      signIn('google');
      setSpin(true);
    };
    const FacebookignHandler = async () =>{
      signIn('facebook');
      setSpin2(true);
    };
    const Sign = async ()  =>{
      setIsUserLoading(true);
      const user = await signInWithEmailAndPassword(auth,email,pass).then((userCredential) => {
        const user = userCredential.user;
        setUserUid(user.uid);
        setIsUserLoading(false);
        setIsLoggedIn(true);
        setVerfiyAcount(user.emailVerified);
        router.replace('/');
        }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.includes('auth/invalid-login-credentials')) {
        setFirebaseErr(true);
        setIsUserLoading(false);
      }else{
        setFirebaseErr(false);
      };
   
      });
    };
    const passwordReset = ()=>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success('Your Password reset has been sent,check your email', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    if (errorCode.includes('auth/invalid-email')) {
      toast.warn('Invalid email enter correct email and try again', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
    toast.warn('Too many requests try later or check you email', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });}
  });
    }
    setPassw(pass);
    return (
  
      (status == 'unauthenticated' || !session ) ?
      
      <section className='flex items-center min-h-screen justify-center md:max-w-4xl max-w-xs mx-auto overflow-y-hidden '>
         
        { status == 'loading' &&
    <        ProgressBar img={'/insta.svg'} />}
  
       
     
      {/*-------------- frame ----------- */}
      <div className='w-[468px] h-[610px] frame hidden mt-5 z-0 relative'>
        
        <img src="/frames.svg" alt="" />
        
        <Test2/>
      </div>
      {/*-------------- frame end----------- */}
      {/*-------------- LogIn ----------- */}
      
      <div className='flex items-center flex-col gap-2 z-10 md:mr-6 '>
      
        <div className='flex items-center flex-col gap-7  bg-white md:w-[360px] w-[300px] h-[418px] border border-solid rounded-sm border-[#DBDBDB] px-2 '>
          <Link href='/' className='mt-6'  >
          <img src="/instagram.png" alt="insta" className='w-[175px] h-[51px] object-contain'  />
         
          </Link>
          <div className='flex items-center flex-col gap-2  '>
            <div className='relative  '>
            <p className={`${email.length>=1 ?`inline-block`:`hidden` }  absolute text-[10px] top-[3px] text-[#9CA3AF] left-[9px]`}>Please put your email here</p>
            <div className='absolute text-[19px] top-[11px] text-[#9CA3AF] right-[9px]'>{emailErr ? <AiOutlineCheckCircle/>:email.length >0  &&<AiOutlineCloseCircle/>}</div>
            <input value={email}  type='email' placeholder='Please put your email here' onChange={emailHandler} className={`${email.length>=1 ? `pt-3`:`p-0`} w-[270px] bg-gray-50 px-2 h-10  text-[10px]  placeholder:text-xs placeholder:mb-3 border rounded-sm focus:ring-[#0000005d] border-[#DBDBDB] focus:ring-1 outline-none `}/>
            </div>
         <div className='relative'>
          <p className={`${pass.length>=1 ?`inline-block`:`hidden`}  absolute text-[10px] top-[3px] text-[#9CA3AF] left-[9px]`}>Put your password here</p>
          <p  className='font-semibold cursor-pointer absolute text-sm top-[9px] text-[#262626] hover:text-[#444647a4] right-[9px]'>{pass.length > 0 && <span onClick={()=>!showPass?setShowPass(true):setShowPass(false)}>{showPass?<>Hide</> :<>Show</>}</span>  }</p>
         <input value={pass} type={`${showPass?'text':'password'}`} placeholder='Password' onChange={passHandler} className={`${pass.length>=1 ? `pt-3`:`p-0`} w-[270px] px-2 h-10 placeholder:text-xs text-[10px] border rounded-sm focus:ring-1 focus:ring-[#0000005d] border-[#DBDBDB] bg-gray-50 outline-none`}/>
         </div>
         {
                (firebaseErr && pass.length > 0) && <div className=' flex items-center bg-white h-7 py-2 px-1  gap-1'> <TbAlertTriangleFilled className='text-yellow-500  text-[13px]'/> <span className='text-[9px]  text-red-600'>Something goes wrong , check your email or password and try again</span></div> 
                
                }
          <button disabled={(email.length <= 0 || pass.length <= 0) && true }  className={`bg-sky-400 flex items-center justify-center w-full py-[6px] rounded-lg font-bold text-[#ffffffe1] text-sm mt-3 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed`} onClick={()=>Sign()}>
          { isUserLoading && <svg aria-hidden="true" class="inline w-5 h-5 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>}
            <p >Log in</p></button>
          <div className='w-full relative h-4 border-b-[1px] after:content-["OR"] after:text-[#050505be] after:absolute after:px-3 after:py-[7px]  after:font-semibold after:bg-white after:top-0 after:right-[43%] after:text-xs border-slate-300'>
          </div>
          
          

        </div>
        <div className='flex items-center gap-5 flex-col' >
        <div className='flex items-center gap-3 '>
        { spin2 && <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>}
          <img src="/facebook.svg" alt="facebook" className='w-6' />
          <button onClick={FacebookignHandler} className='text-sm font-semibold text-[#3851A5]'>Log in with Facebook</button>
        </div>
        <div className='flex items-center gap-3 '>
       { spin && <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>}
          <img src="/google.svg" alt="facebook" className='w-6' />
          <button className='text-sm font-semibold text-[#1976D2]' onClick={GooglesignHandler}>
            Log in with google
          </button>
          
          

        </div>
        <div  className="tooltip tooltip-error" data-tip="please enter your email inside email field ">
        <button onClick={passwordReset} disabled={!email ? true :false} className={`${!email ? 'cursor-not-allowed ' : 'cursor-pointer active:text-red-500'} text-xs text-[#385185] `}>Forgot password?</button>
        <ToastContainer/>
        </div>
        </div>
        
       
        </div>
        <div className='flex items-center justify-center bg-white w-[360px] h-[60px] border border-solid rounded-sm border-[#DBDBDB] px-2 py-4'>
          <p className='text-[13px] cursor-pointer'>Dont have an account? <Link href='/signup' className='font-semibold text-[#29A4F7] '>Sign up</Link></p>

        </div>
        <div className='flex items-center flex-col '>
          <p className='text-sm py-4'>Get the app.</p>
          <div className='flex items-center gap-2'>
            <img src="/AppStore.svg" alt="apple" className='flex-1 h-10 object-containd cursor-pointer'/>
            <img src="/googlePlay.svg" alt="googlpaly" className='flex-1 h-10 object-containd cursor-pointer'/>
          </div>
        </div>
        
      </div>
      
      {/*-------------- LogIn end ----------- */}
      </section>
  :redirect('/')
  ) ;
 
  
 

}
export default LogIn