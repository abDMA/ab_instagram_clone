'use client'
import { useRecoilState } from "recoil";
import { EmailState, NameState, Password, ProfilState, isUserLogedIn } from "./RecoilState";
import { auth} from '@/app/firebase'
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter()
  const isLoggedIn = useRecoilState(isUserLogedIn)
  const photoURL= 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'
  const RuserName = useRecoilState(NameState);
  const profileImg = useRecoilState(ProfilState)
  const Pass = useRecoilState(Password)
  const email = useRecoilState(EmailState)
  const [prpass, setPrpass] = useState('')
  const [pass, setPass] = useState('')
  const [confpass, setConfPass] = useState('')
  const [checkErrpass, setCheckErrPass] = useState('')
  const [spin, setSpin] = useState(false)
  
  
  

  
 
  const updatingPassword = async () => {
    if (prpass !== Pass[0]) {
      setCheckErrPass('EROOR occured this is not your old password')
    } else if (confpass !== pass){
      setCheckErrPass('EROOR occured no match for this password and confirm password')
    }else if (Pass[0] == pass){
      setCheckErrPass('EROOR occured its same previous password try new one')
    }
    else{
      setCheckErrPass('')
    setSpin(true)
    const oldPassword = Pass[0]
    const credential = EmailAuthProvider.credential(auth.currentUser,email[0],
    oldPassword
)
    await reauthenticateWithCredential(auth.currentUser, credential).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode,'kj') 
    });
    const newPassword = pass
    await updatePassword(auth.currentUser, newPassword).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
    })
    setSpin(false)
    toast.success('Your Password has been updated succesfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
      {setTimeout(()=>{
        isLoggedIn[0] ? signOut(auth).then(()=>{
            router.replace('/auth/signin')
         }):  router.replace('/')
        
      },3000)}
    }
   
  }
  const passwordReset = ()=>{
    sendPasswordResetEmail(auth, email[0])
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
      setTimeout(()=>{
        isLoggedIn[0] && signOut(auth).then(()=>{
            router.replace('/auth/signin')
         })
        
      },3200)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
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
  return (
    <section className='flex items-center sm:justify-center sm:pt-[3rem] pt-3 md:max-w-4xl max-w-xs pb-[1.4rem] bg-white mx-auto min-h-[50vh]' >
    <div className="sm:w-auto w-full">
      <div className='flex items-center sm:justify-normal justify-center sm:gap-7 gap-4 sm:mb-6 mb-2'>
        <div className='sm:pl-[4.2rem]'>
        <img src={profileImg[0] ? profileImg[0] : photoURL} alt="profile" className='sm:w-[38px] sm:h-[38px] w-[100px] h-[100px] rounded-full object-cover'/>
        </div>
        <div >
            <h4 className="font-bold text-[17px]">{RuserName[0]}</h4>
        </div>
     </div>
     <div className='flex items-center sm:gap-7 gap-4 py-2'>
        <p className='font-semibold text-end text-[14px] pl-2 w-[6.5rem] '>Previous Password</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <input type="text"  onChange={(e)=>setPrpass(e.target.value)}
          className='w-full px-2 py-2 border   outline-none  focus:border-black rounded-sm'/>
        </div>
     </div>
     {prpass !== Pass[0] && <p className="pl-[9rem] text-[11px] text-red-500 font-bold">{checkErrpass}</p>}
     <div className='flex items-center sm:gap-7 gap-4 py-2'>
        <p className='pl-3 font-semibold text-center text-[14px] '>New password</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <input type="text" onChange={(e)=> setPass(e.target.value) }
          className='w-full px-2 py-2 border   outline-none placeholder:text-[12px] focus:border-black rounded-sm'/>
        </div>
     </div>
     {confpass !== Pass[0] && <p className="pl-[9rem] text-[11px] text-red-500 font-bold">{checkErrpass}</p>}
     <div className='flex items-center sm:gap-7 gap-4 py-2'>
        <p className='pl-2 font-semibold  w-[6.5rem] text-[14px] text-end'>Confrim new password</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <input type="text" onChange={(e)=> setConfPass(e.target.value)}
          className='w-full px-2 py-2 border   outline-none placeholder:text-[12px]  focus:border-black rounded-sm'/>
        </div>
     </div>
     {confpass !== Pass[0] && <p className="pl-[9rem] text-[11px] text-red-500 font-bold">{checkErrpass}</p>}
     {Pass[0] == pass && <p className="pl-[9rem] text-[11px] text-red-500 font-bold">{checkErrpass}</p>}
     <button onClick={updatingPassword} disabled={(prpass.length >= 8 && pass.length >= 8 && confpass.length >= 8) ? false : true}  className={`flex items-center sm:ml-[8.3rem] ml-3 mt-6 gap-4 px-3 py-1 font-[500] text-[14px] text-white rounded-[4px] ${(prpass.length >= 8 && pass.length >= 8 && confpass.length >= 8 ) ?'bg-sky-400' :'bg-gray-300'} `}>
           <p>Change password</p>
           {spin && <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
              <ToastContainer/>
            </button>
            <div>
            <button onClick={passwordReset} className='flex items-center mt-6 ml-[8.25rem] text-[14px] font-[500] text-[#0095F6] cursor-pointer  active:text-red-500'>
            You forgot your password?
            </button>
            <ToastContainer/>
            </div>
           
     </div>
    </section>
  )
}

export default Settings