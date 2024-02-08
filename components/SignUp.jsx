'use client'
    import Link from 'next/link'
    import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 
'react-icons/ai'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '@/app/firebase';
import {TbAlertTriangleFilled} from 'react-icons/tb'
import { redirect, useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';
import { ProgressBar } from './constant';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Password } from './RecoilState';



const SignUp = () => {
  const [spin, setSpin] = useState(false)
  const FacebookignHandler = () =>{
    signIn('facebook')
    setSpin(true)
  
  }
  const {data:session,status} = useSession()
 
  if (session) {
    redirect('/')
  }
const router = useRouter()
      const [email, setEmail] = useState('')
      const [name, setName] = useState('')
      const [userName, setUserName] = useState('')
      const [pass, setPass] = useState('')
      const [showPass, setShowPass] = useState(false)
      const [emailErr, setEmailErr] = useState(false)
      const [firebaseErr, setFirebaseErr] = useState(false)
      const [signUpSpin, setSignUpSpin] = useState(false)
      
     



   
      const passHandler = (e) =>{
        setPass(e.target.value)
      }
      const nameHandler = (e) =>{
        setName(e.target.value)
      }
      const userHandler = (e) =>{
        setUserName(e.target.value)
      }
      useEffect(() => {
       document.title = "Sign Up • Instagram "
      }, [])
      const emailValidation = (email)=>{
        return String(email).toLocaleLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
         }
        
         const emailHandler = (e) =>{
          setEmail(e.target.value);
          (email.length > 0 && emailValidation(email) ) ? setEmailErr(true):setEmailErr(false);
  
        }
        const register = async ()  =>{
          setSignUpSpin(true)
            const user = await createUserWithEmailAndPassword(auth,email,pass).then((userCredential) => {
              updateProfile(auth.currentUser,{
                displayName:name,
                photoURL:'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png',
              
              })
              const user = userCredential.user;
              setSignUpSpin(false)
              setEmail('')
              setName('')
              setUserName('')
              sendData(user.uid)
              router.push('/auth/signin')
              
             
              // ...
            }).catch((error)=>{
              setSignUpSpin(false)
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode.includes('auth/email-already-in-use')) {
      
                setFirebaseErr(true)
                setTimeout(()=>{
                  setFirebaseErr(false)
                  setEmail('')
                  setName('')
                  setUserName('')

                },4000)
                
                

              }  
         
            })
         
      
          }
          const sendData = async (user) =>{
            const docRef = doc(db, "users",user,"PrivateSession", user);
            await setDoc(docRef, {
              Email:email,Name:name,Username:userName.toLocaleLowerCase().replace(/ /g, ''),userId:user,timeStamp:serverTimestamp()
       })
            const ref1 = doc(db,'users', user)
            const docref1 = await setDoc(ref1, {PhotoProfile:'',Description:'',Gender:'',timeStamp:serverTimestamp()})
          
          }
        
     
     
    
    
      
      return (
        (status == 'unauthenticated' || !session) ?
        <section className='flex items-center min-h-screen justify-center md:max-w-4xl max-w-xs mx-auto overflow-y-hidden   '>
           { status == 'loading' &&
    <        ProgressBar img={'/insta.svg'} />}
          {/*-------------- LogIn ----------- */}
          <div className='flex items-center flex-col gap-2 z-10 md:mr-6 '>
            <div className='flex items-center flex-col gap-5  bg-white md:w-[340px] w-[300px] h-[570px] border border-solid rounded-sm border-[#DBDBDB] px-2 py-4'>
              <Link href='/' className='mt-6'  >
              <img src="instagram.png" alt="insta" className='w-[175px] h-[51px] object-contain'  />
              </Link> 
              <div className='text-center text-[#737373] px-10'><h3>
                Sign up to see photos and videos from your friends.</h3>
              </div>
             
              <button onClick={FacebookignHandler} className=' flex items-center justify-center space-x-1 bg-[#0095F6] w-[80%] py-[6px] rounded-lg font-bold text-[#ffffffe1] text-sm hover:bg-[#0062f6] mt-3'>
              { spin && <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
                <img src="facewhite.svg" alt="facewhite" className='h-6' /><span className='text-sm font-semibold'>Log in with Facebook</span></button>
              <div className='w-[90%] relative h-4 border-b-[1px] after:content-["OR"] after:text-[#050505be] after:absolute after:px-3 after:py-[7px]  after:font-semibold after:bg-white after:top-0 after:right-[43%] after:text-xs border-slate-300'>
              </div>
              
              <div className='flex items-center flex-col gap-2  '>
              <div className='relative  '>
                <p className={`${email.length>=1 ?`inline-block`:`hidden` }  absolute text-[10px] top-[3px] text-[#9CA3AF] left-[9px]`}>Please put your email here</p>
                <div className={`absolute text-[19px] top-[11px] text-[#9CA3AF] right-[9px]`}>{(emailErr && email.length > 0  &&!firebaseErr  )? <AiOutlineCheckCircle className={`${(emailErr && !firebaseErr) &&'text-green-600'} `} />:(email.length >0 && firebaseErr)   &&<AiOutlineCloseCircle className={`${(email.length > 0 && firebaseErr)&& 'text-red-600'}`}/>} 
                
                
                </div>
                <input  type='email' value={email} placeholder='Please put your email here' onChange={emailHandler} className={`${email.length>=1 ? `pt-3`:`p-0`} w-[270px] bg-gray-50 px-2 h-9  text-[10px]  placeholder:text-xs placeholder:mb-3 border rounded-sm focus:ring-[#0000005d] border-[#DBDBDB] focus:ring-1 outline-none `}/>
                {
                (firebaseErr && email.length > 0) && <div className=' flex items-center bg-white h-7 p-1  w-full gap-1'> <TbAlertTriangleFilled className='text-yellow-500  text-[15px]'/> <span className='text-[9px]  text-black'>Email already in use,try another one or you can log in</span></div> 
                
                }
                </div>
                <div className='relative  '>
                <p className={`${name.length>=1 ?`inline-block`:`hidden` }  absolute text-[10px] top-[3px] text-[#9CA3AF] left-[9px]`}>Full Name</p>
                <input  type='text' value={name} placeholder='Full Name' onChange={nameHandler} className={`${name.length>=1 ? `pt-3`:`p-0`} w-[270px] bg-gray-50 px-2 h-9  text-[10px]  placeholder:text-xs placeholder:mb-3 border rounded-sm focus:ring-[#0000005d] border-[#DBDBDB] focus:ring-1 outline-none `}/>
                </div>
                <div className='relative  '>
                <p className={`${userName.length>=1 ?`inline-block`:`hidden` }  absolute text-[10px] top-[3px] text-[#9CA3AF] left-[9px]`}>User Name</p>
                <input  type='text' value={userName} placeholder='User Name' onChange={userHandler} className={`${userName.length>=1 ? `pt-3`:`p-0`} w-[270px] bg-gray-50 px-2 h-9  text-[10px]  placeholder:text-xs placeholder:mb-3 border rounded-sm focus:ring-[#0000005d] border-[#DBDBDB] focus:ring-1 outline-none `}/>
                </div>
             <div className='relative'>
              <p className={`${pass.length>=1 ?`inline-block`:`hidden`}  absolute text-[10px] top-[3px] text-[#9CA3AF] left-[9px]`}>Password</p>
              <p  className='font-semibold cursor-pointer absolute text-sm top-[9px] text-[10px] text-[#262626] hover:text-[#444647a4] right-[9px]'>{pass.length > 0 && <span onClick={()=>!showPass?setShowPass(true):setShowPass(false)}>{showPass?<>Hide</> :<>Show</>}</span>  }</p>
             <input value={pass} minLength='6' maxLength="12" type={`${showPass?'text':'password'}`} placeholder='Password' onChange={passHandler} className={`${pass.length>=1 ? `pt-3`:`p-0`} w-[270px] px-2 h-9 placeholder:text-xs border text-[10px] rounded-sm focus:ring-1 focus:ring-[#0000005d] border-[#DBDBDB] bg-gray-50 outline-none`}/>
             </div>
             
              <button disabled={(email.length <= 0 || pass.length <= 0 || name.length <= 0 || userName.length <= 0 || !emailErr) && true } className={`bg-sky-400 flex items-center justify-center space-x-1 rhover:bg-sky-500 w-[90%] py-[6px] rounded-lg font-bold text-[#ffffffe1] text-sm  mt-3 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed`} onClick={()=>register()}>
              {signUpSpin &&  <svg aria-hidden="true" class="inline w-5 h-5 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
               <p> Sign up</p></button>
              <div className='w-[90%]'>
                <p className='text-center text-xs  text-[#737373]'>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</p>
              </div>
              
              
              
    
            </div>
           
            
           
            </div>
            
            
          </div>
          
          {/*-------------- LogIn end ----------- */}
          </section>
          : redirect('/')
      )
    }


export default SignUp