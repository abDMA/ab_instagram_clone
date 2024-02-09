'use client';
import React, {useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { Description, EmailState, Gender, NameState, ProfilState, UserName, isUserLogedIn, userUid, verifiedChecking } from './RecoilState';
import { deleteUser, sendEmailVerification, signOut, verifyBeforeUpdateEmail } from 'firebase/auth';
import { auth, db, storage } from '@/app/firebase';
import {doc, getDoc,serverTimestamp,updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL,uploadString } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { signOut as signOUT } from 'next-auth/react';
import any from "../public/any.png"


const EditProfile = ({props}) => {
   const {data:session} = useSession();
   const router = useRouter();
   const ProviderId = session?.user?.id;
   const RuserName = useRecoilState(NameState);
   const profileImg = useRecoilState(ProfilState);
   const userEmail = useRecoilState(EmailState);
   const UserUid = useRecoilState(userUid);
   const isLoggedIn = useRecoilState(isUserLogedIn);
   const UUserName = useRecoilState(UserName);
   const dEscription =useRecoilState(Description);
   const GenDer = useRecoilState(Gender);
   const [emailVerificationHasSent, seteEmailVerificationHasSent] = useState('');
   const verfiyAcount = useRecoilState(verifiedChecking);
   const [name, setName] = useState(RuserName[0]);
   const [email, setEmail] = useState( userEmail[0]);
   const [userName, setUserName] = useState(UUserName[0]);
   const [profilemg, setProfileImg] = useState(profileImg[0]? profileImg[0] : any );
   const [description, setDescription] = useState(dEscription[0]);
   const [gender, setGender] = useState(GenDer[0]);
   const [Errors, setErrors] = useState('');
   const [isVerified, setIsVerified] = useState(verfiyAcount[0]);
   const [spin, setSpin] = useState(false);
   const [loading, setLoading] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null) ;
   const [allow, setAllow] = useState(true);
 


 
  
   
   
   const allowUpadate = async()=>{
      const docRef = doc(db,'users',session ? ProviderId : UserUid[0],"PrivateSession",session ? ProviderId : UserUid[0] );
      const docSnap = await getDoc(docRef);
      
      if (docSnap.data().timeStamp) {
       
         const sec = docSnap.data().timeStamp.seconds;
         const time = new Date(sec*1000);
         const zian = new Date(); // get current date
         time.setHours(time.getHours(),time.getMinutes()+5,0,0);
         if (zian > time) { 
         setAllow(true);
         }else {
            setAllow(false);
         }
      } else{
         setAllow(true);
      };
     
      
      }
     if (session || UserUid[0] ) {
      allowUpadate();
     };

     
  
   
   
   
   const EmailVerificationHandler = async  (e) =>{
      seteEmailVerificationHasSent('....Sending email verification');
      e.preventDefault();
      await sendEmailVerification(auth.currentUser).then(()=>{
         seteEmailVerificationHasSent('....Email verification has been sent check your inbox');

         
      }).catch((error)=>{
         const errorCode = error.code;
         const errorMessage = error.message;
         if (errorCode.includes('auth/too-many-requests')) {
            setErrors('too many requsts in one time try later');

      };

      })
   }
   const deleteAccount = async () =>{
      setSpin(true)
      await deleteUser(auth.currentUser).then(() => {
         setSpin(false)
         location.reload()
       }).catch((error) => {
         const errorMessage = error.message
         const errorCode = error.code
         if (errorCode.includes('auth/requires-recent-login')) {
            setErrors('Many requests try to refresh the page or try to signout');
           
         };
       });
   } ;
   const filePickerRef = useRef(null);
   const selectedImgPicker = (e)=>{
      const reader = new FileReader();
      if (e.target.files[0]) {
         reader.readAsDataURL(e.target.files[0]);
      };
      reader.onload =(readerEvent) =>{
         setSelectedFile(readerEvent.target.result);
      };

   };

   const uploadInfo = async ()=>{
      if(loading) return;
      setLoading(true);
   
    const imageRef = ref(storage,`posts/${session ? ProviderId : UserUid[0]}/image`);
      selectedFile && await uploadString(imageRef,selectedFile,'data_url').then(async onSnapshot =>{
         const downloadUrl = await getDownloadURL(imageRef);
         await updateDoc(doc(db,'users',session ? ProviderId : UserUid[0]),{
            PhotoProfile : downloadUrl ? downloadUrl : profilemg,
         });

      });
      
      /* Alow only if time request bigger than updated time*/
     
    
         allow &&  ( 
            await updateDoc(doc(db,'users',session ? ProviderId : UserUid[0],"PrivateSession",session ? ProviderId : UserUid[0] ),{
         Name: name,
         Username:userName.toLocaleLowerCase().replace(/ /g, ''),
         Email : email,
         timeStamp : serverTimestamp(),
      })
     );
     isLoggedIn[0] && (verifyBeforeUpdateEmail(auth.currentUser,email).then(() => {
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    }));

      await updateDoc(doc(db,'users',session ? ProviderId : UserUid[0]),{
         Description: description,
         Gender : gender,
         userId: session ? ProviderId : UserUid[0],
         timeStamp : serverTimestamp(),
      }).catch((error)=>{
         const errorCode = error.code;
        if (errorCode.includes('permission-denied' || errorMessage.includes('Missing or insufficient permissions.'))){
         toast.warn('Update permission denied', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        };

      });
    
      
   setLoading(false);
   toast.success('Your information has been updated succesfully', {
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
     isLoggedIn[0] ? signOut(auth).then(()=>{
         router.replace('/auth/signin')
      }):signOUT();
     
   },3000);

   };
  return (
    <section className={`flex items-center justify-center   md:max-w-4xl max-w-xs mx-auto bg-white  ${props && 'pb-5'} sm:pt-10 pt-6 }`}>
 <div className='sm:w-auto w-full' >
     <div className='flex sm:justify-start items-center justify-center sm:flex-row flex-col sm:gap-6 gap-3'>
        <div className='sm:pl-12' >
        <img src={selectedFile == null ? profilemg : selectedFile} alt="profile" className='sm:w-[38px] sm:h-[38px] w-[100px] h-[100px] rounded-full object-cover' />
        </div>
      
        <div >
         <input type="file" hidden ref={filePickerRef}  onChange={selectedImgPicker}/>
         
            <h4 className='sm:flex sm:flex-col hidden font-bold'>{RuserName[0]}</h4>
            <button onClick={()=>filePickerRef.current.click()}>
            <p className='text-[#0095F6] cursor-pointer font-[500] text-[14px]'>change profile photo</p>
            </button>
            
        </div>
     </div>
     <label >
     <div className='flex sm:items-start  items-center sm:gap-7 gap-3 py-2'>
        <p className='font-semibold text-center pl-10 text-[14px] '>Name</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <input type="text"
             value={name} disabled={allow ? false : true} onChange={(e)=>setName(e.target.value)} className='w-full px-2 py-1 border   outline-none  focus:border-black rounded-sm'/>
             <p className='sm:inline-block hidden text-[#8E8E8E] text-[12px] ml-[2px] mt-3 '>
            To help people discover your account, use the name people know you by, whether it&apos;s your full name, nickname, or business name.
            </p>
            <p  className='sm:inline-block hidden text-[#8E8E8E] text-[12px] ml-[2px] mt-3'>
            You can only change your name twice within a 14-day period.
            </p>
        </div>
     </div>
     <div className='flex sm:items-start  items-center sm:gap-7 gap-3   py-2 '>
        <p className=' font-semibold text-center pl-3  text-[14px]'>Username</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <input type="text"
             value={userName} disabled={allow ? false : true} onChange={(e)=> setUserName(e.target.value)} className='w-full px-2 py-1 border   outline-none  focus:border-black rounded-sm'/>
             <p className='text-[#8E8E8E] text-[12px] ml-[2px] mt-3 sm:inline-block hidden'>
             In most cases, you will be able to change your username back to johndoe for an additional 14 days. More information
            </p>
           
        </div>
     </div>
     <div className='flex sm:items-start  items-center sm:gap-7 gap-3  py-2 '>
        <p className='pl-1 font-semibold text-center text-[14px] '>Description</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="4" cols="4" maxLength ={225} className='w-full px-2 py-1 border   outline-none resize-none text-[13px] text-[#0000008c] focus:border-black rounded-sm '>
             </textarea>
             <div className='mt-6 ml-[2px]'>
             <h4 className='text-[#8E8E8E] font-semibold text-[14px] mt-3 sm:inline-block hidden'>
             Personal Information
            </h4>
            <p  className='text-[#8E8E8E] text-[12px] sm:inline-block hidden'>
            Provide your personal information, even if the account is used for a business, a pet, etc. This information will not be kept in your public profile.
            </p>
            </div>
        </div>
     </div>
     <div className='flex items-center  sm:gap-7 gap-4  py-2'>
        <p className='font-semibold text-center pl-10 text-[14px] '>Email</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <input type="text"
             value={email} disabled={(allow && isLoggedIn[0]) ? false : true}  onChange={(e)=> setEmail(e.target.value)} className='w-full px-2 py-1 border   outline-none  focus:border-black rounded-sm'/>
        </div>
     </div>
     <div className='flex items-center sm:gap-7 gap-3 py-2'>
        <p className='font-semibold text-center sm:pl-7 pl-8 text-[14px] '>Gender</p>
        <div className='sm:w-[24.5rem] w-[8.5rem]'>
            <input type="text"
             value={gender} placeholder='ex: male or female'  onChange={(e)=> setGender(e.target.value)} className='w-full px-2 py-1 border   outline-none placeholder:text-[12px]  focus:border-black rounded-sm'/>
        </div>
     </div>
     <div className='sm:w-[24.5rem] w-[8.5rem] ml-2 flex items-center sm:justify-end  mt-7 mr-[4.2rem]  py-2'>
        <div className={`flex items-center ${(spin || loading) ? 'gap-[4rem]' : 'sm:gap-[4rem] gap-4'} `}>
           <button onClick={uploadInfo} className='flex items-center gap-4 px-3 py-1 font-[500] text-[14px] text-white rounded-[4px] bg-sky-400'>
           <p>Send</p>
           {loading && <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
            
            </button>
            <ToastContainer/>
           <button onClick={deleteAccount} disabled={!isLoggedIn[0]} className={`${!isLoggedIn[0] && 'text-gray-300' } flex items-center gap-2 text-[14px] font-[500] ${!Errors == '' ? 'text-red-500 pointer-events-none' : ' text-[#0095F6]'}`}>
          {Errors =='' ? <p>Desactivate my account</p> :Errors}
           { spin && <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
            
           </button>
        </div>
       
     </div>
     <div className='float-right my-2 '>

       { 
        (isLoggedIn[0] && Errors == '')? <button disabled={isVerified && true} className={`${isVerified ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer '}`}onClick={EmailVerificationHandler}>
           {isVerified  ? <p className='text-green-600  text-[14px] font-[400] '>Your account already virified</p> :  <p className='text-[14px] font-[500] underline text-[#8e8e8ece] '>{emailVerificationHasSent == '' ? <span>Click here to verify you account</span> :emailVerificationHasSent  }
         </p>}
         </button> : Errors
       }
     </div>
    
     </label>
</div>
    </section>
  );





      };
export default EditProfile