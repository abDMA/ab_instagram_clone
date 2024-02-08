'use client'
import {AiFillHome, AiOutlinePlusCircle,AiOutlineHome} from 'react-icons/ai'
import {HiOutlinePaperAirplane, HiUserGroup} from 'react-icons/hi'
import {BiHeart, BiSearch} from 'react-icons/bi'
import {FiInstagram } from 'react-icons/fi'
import styles from '@/styles'
import {CiMenuBurger,CiMenuFries, CiSettings} from 'react-icons/ci'
import {CgProfile} from 'react-icons/cg'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { MiniProfile } from './constant'
import { useRecoilState } from 'recoil'
import {  ProfilState, User, isUserLogedIn, userUid } from './RecoilState'
import { useSession } from 'next-auth/react'
import { signOut as signOUT } from 'next-auth/react'
import { TbLogout } from 'react-icons/tb'
import { signOut } from 'firebase/auth'
import { auth, db, storage } from '@/app/firebase'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'






const  NavBar = ( {}) => {
  const {data:session} = useSession() 
  const profileImg = useRecoilState(ProfilState)
  const [menu, setMenu] = useState(false)
  const UserUid = useRecoilState(userUid)
  const ProviderId = session?.user?.id
  const [dropmenu, setDropMenu] = useState(false)
  const [back, setBack] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserLogedIn)
  const [selectedFile, setSelectedFile] = useState(null) 
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const photoUrl = 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'
  
  
  const menuHandlerOp = () =>{
    setDropMenu(true)
    setBack(true)
    setTimeout(()=>{
     setDropMenu(false)
     setBack(false)
     setMenu(false)
    },10000)
    
    
  }
  const menuHandlerCl = () =>{
    setDropMenu(false)
    setBack(false)  
  }
  const signOutHandle = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false)
    redirect('/auth/signin')
  }).catch((error) => {
    const erorMsg = error.message
   console.log(erorMsg)
  });
    }
    const filePickerRef = useRef(null)
   const selectedImgPicker = (e)=>{
      const reader = new FileReader();
      if (e.target.files[0]) {
         reader.readAsDataURL(e.target.files[0])
      }
      reader.onload =(readerEvent) =>{
         setSelectedFile(readerEvent.target.result)
      }

   } 
  
   const uploadInfo = async ()=>{
    if(loading) return;
    setLoading(true)
    const imageRef = ref(storage,`posts/${Math.random() * Math.pow(10, 6)}/postImage`);
    selectedFile && await uploadString(imageRef,selectedFile,'data_url').then(async onSnapshot =>{
       const downloadUrl = await getDownloadURL(imageRef);
        const docRef = collection(db,`posts/${session ? ProviderId : UserUid[0]}/post`)
              await addDoc(docRef, {
                timeStamp:serverTimestamp(),
                Caption:caption,
                PostImage : downloadUrl,
         })
         

    })
    setSelectedFile(null)
    setLoading(false)
    setCaption('')
   }
 
  return (
    <>
    {back && <div className='lg:hidden fixed w-full h-full top-[0px] bottom-0 bg-black opacity-[0.8] ease-out z-50'></div>}
    <div className=' shadow-sm sticky top-0 z-50 bg-white'>
     
     
    
    <div className="flex relative items-center justify-between md:max-w-5xl max-w-2xl mx-auto  bg-white py-2px-3 outline-none" >
      {
        dropmenu &&  <div className=' flex md:hidden flex-col items-center px-4 absolute top-14 right-[10px] z-[60px] w-[300px] rounded-xl drop-shadow-2xl h-[400px] py-3  bg-white'> 
        <div className='flex items-start gap-4'>
        <div className='flex flex-col items-center hover:scale-105 ease-out duration-150'>
          <AiOutlineHome className='text-[40px]'/>
          <p className='text-[12px] text-center'>Home</p>
        </div>
        <div className='flex flex-col items-center hover:scale-105 ease-in-out duration-200 '>
          <HiOutlinePaperAirplane className='text-[40px]'/>
          <p className='text-[12px] text-center'>Notifications</p>
        </div>
        <div className='flex flex-col items-center hover:scale-105 ease-out duration-150'>
          <BiHeart className='text-[40px]'/>
          <p className='text-[12px] text-center'>Love</p>
        </div>
        <div className='flex flex-col items-center hover:scale-105 ease-out duration-150'>
          <HiUserGroup className='text-[40px]'/>
          <p className='text-[12px] text-center'>Community</p>
        </div>
        </div>
        <div className='mt-1'><MiniProfile/></div>
       </div> 
      }
   
    
        {/*start section*/}
        <div   className="relative sm:w-[100px] w-[40px]  h-[50px] cursor-pointer flex items-center  " >
          <Link href='/'>
          <img src="instagram.png" alt="instagram" className="w-full h-full object-contain hidden md:inline-block " />
          <FiInstagram className='text-[35px]  md:hidden' />
          </Link>
          

           
        </div>
        {/*start section*/}

          {/*middle section*/}
        <div className={`${styles.flexCenter} relative `}>
          <BiSearch className='absolute left-2 text-[15px] text-[#0000008f] pointer-events-none' />
          <input type="text" placeholder='Search' className='sm:w-[14.5rem] w-[8.5rem] px-6 py-1 border-[2px] rounded-[8px] placeholder:text-xs ' />
        </div>
        {/*middle section*/}
          {/*icons*/}
          
        <div className={`${styles.flexCenter} space-x-3 after:content-["3"] 
        after:text-[10px] relative after:absolute after:top-0 after:left-[42px] after:w-[15px] after:h-[15px] after:text-white after:animate-pulse after:text-center after:bg-red-500 after:rounded-full after:invisible md:after:visible`}>
         
          <AiFillHome className='text-[20px] cursor-pointer hover:scale-150 ease-in-out duration-200 hidden sm:inline'/>
          <HiOutlinePaperAirplane className=' text-[20px] cursor-pointer hover:scale-150 ease-in-out duration-200 hidden sm:inline' />
          <div className=' sm:hidden' onClick={()=>menu ? setMenu(false) :setMenu(true)}>
            {!menu ? <CiMenuBurger onClick={menuHandlerOp} className='text-[20px] cursor-pointer sm:hidden hover:scale-150 ease-in-out duration-200'/> : <CiMenuFries onClick={menuHandlerCl}  className='text-[20px] cursor-pointer  sm:hidden hover:scale-150 ease-in-out duration-200'/>}</div> 
          <button onClick={()=>document.getElementById('my_modal_1').showModal()}>
            <AiOutlinePlusCircle className='text-[20px] cursor-pointer hover:scale-150 ease-in-out duration-200 '/>
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
               <div className='flex  flex-col justify-center  items-center'>
                <h1 className='py-3'>upload your photo post</h1>
                <input type="file" hidden ref={filePickerRef}  onChange={selectedImgPicker}/>
                <button onClick={()=>filePickerRef.current.click()} className='w-full flex justify-center items-center  h-[300px]'>
                  <div className={`w-[380px] h-[240px] flex justify-center items-center  ${!selectedFile && 'border-dashed  border-[3px]'} rounded-md  border-slate-300 `}>
              {selectedFile ? <img src={selectedFile} alt="post" className='w-full h-full object-contain' /> : <img src="upload.png" alt="upload" className='w-[50px] h-[50px]'/>}
                </div>
                </button>
                <input value={caption} type="text" onChange={(e)=>{setCaption(e.target.value)}} placeholder='Put your post caption here' className='outline-none px-4 py-4 text-black  border border-gray-400 focus:ring-1 w-full h-6 placeholder:text-sm placeholder:text-gray-400' />
                <button type='submit' disabled={!selectedFile} onClick={uploadInfo} className='flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:bg-gray-200 w-[80px] h-7 py-1text-white text-sm text-white bg-sky-400 rounded-md mt-3'>
                <p>Post</p>
                { loading && <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
                </button>
               </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn"  onClick={()=>setSelectedFile(null)}>Close</button>
                  </form>
                </div>
               </div>
            </dialog>
          <HiUserGroup className='text-[20px] cursor-pointer hover:scale-150 ease-in-out duration-200 hidden sm:inline' />
          <BiHeart className='text-[20px] cursor-pointer hover:scale-150 ease-in-out duration-200 hidden sm:inline' />

          
           
          
          <details className="relative dropdown dropdown-end">
             <summary className=" relative  btn bg-transparent  border-none"> 
             <img src={profileImg[0] ? profileImg[0] : photoUrl } alt="profile" className='w-8 h-8 rounded-full object-cover' />
             </summary>
             <ul className="mt-1 flex flex-col overflow-hidden p-2 shadow menu dropdown-content z-[10] bg-base-100  rounded-box w-52">
              <Link href='/profile' className='px-4 py-2 flex items-center gap-2 hover:bg-[#f5f4f4b0] duration-150 cursor-pointer rounded-lg'>
              <CgProfile className='text-[20px]'/>
              <p  className='text-[15Linkx] font-semibold'>Profile</p>
              </Link>
              <Link href='/settings' className='px-[14px] py-2 flex items-center gap-[6px] hover:bg-[#f5f4f4b0] duration-150 cursor-pointer rounded-lg'>
              <CiSettings className='text-[24px]'/>
              <p className='text-[15px] font-semibold'>Settings</p>
              </Link>
              <div className='border-t-[1px] mx-3 mt-3 border-black'/>
              <button onClick={()=> session? signOUT() : signOutHandle()} className='mt-2  px-[14px] py-2 flex items-center gap-[6px] hover:bg-[#f5f4f4b0] duration-150 cursor-pointer '>
              <TbLogout className='text-[24px]'/>
              <p className='text-[13px] font-semibold'>Sign Out</p>
              </button>

                
              
            </ul>
            <div className='after:content[""] after:absolute after:w-4 after:h-4 after:rotate-45 after:bg-white after:shadow after:top-[47px] after:-right-[-23px]'></div>
          </details>

        
        </div>
          {/*icons*/}
    </div>
    </div></>
  )
}

export default NavBar