'use client'
import {BsThreeDots } from 'react-icons/bs'
import {BiHeart,BiBookmark} from 'react-icons/bi'
import {TbMessageCircle2} from 'react-icons/tb'
import {HiOutlinePaperAirplane} from 'react-icons/hi'
import {GrEmoji} from 'react-icons/gr'
import { IoHeart } from "react-icons/io5";
import { useEffect, useState } from 'react'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { ProfilState, UserName, userUid } from './RecoilState'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import Moment from 'react-moment'



const Post = ({caption,postImg,username,profileImg,id}) => {
  const {data:session} = useSession()
  const photoUrl = 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'
  const UserUid = useRecoilState(userUid)
  const ProfileImg = useRecoilState(ProfilState)
  const ProviderId = session?.user?.id
 const [comment, setComment] = useState('')
 const [postedComment, setPostedComment] = useState([])
 const [IsLovePost, setIsLovePost] = useState(false)
 const [loading, setLoading] = useState(false)
 const userName = useRecoilState(UserName);

 const sendComment = async (e)=>{
  e.preventDefault()
  setLoading(true)
  const docRef = collection(db,`posts/${session ? ProviderId : UserUid[0]}/post/${id}/comment`)
  await addDoc(docRef, {
    timeStamp:serverTimestamp(),
    Comment:comment,
    PostImage : ProfileImg[0],
    Username:userName[0]
})
    setLoading(false)
    setComment('')
 }
 useEffect(() => { 
  return onSnapshot(query(collection(db,'posts',session ? ProviderId : UserUid[0],'post',id,'comment'),orderBy('timeStamp','desc')),snapshot =>{
    setPostedComment(snapshot.docs)
  })
  
  
}, [session])

  
  

const lovePostHandeler = async (e)=>{
  !IsLovePost ? setIsLovePost(true) : setIsLovePost(false)
  e.preventDefault()
const docRef = doc(db,`posts/${session ? ProviderId : UserUid[0]}`)
await setDoc(docRef, {
 Username:userName[0],
 PostLikes:!IsLovePost,
})

  
 
  
}

  return (
  
      <div  className=' bg-white '>
        {/* -------------------- top post ----------------- */}
        <div className='px-5 py-4'>
          <div className='flex items-center gap-3 float-left '>
          <img src={profileImg} alt="userImg" className='w-8 h-8 rounded-full' />
          <p className='font-bold text-sm'>{username}</p>
          </div>
          <div className='float-right mt-2 cursor-pointer'><BsThreeDots  /></div>
        </div>
        {/* -------------------- top post end ----------------- */}
        {/* -------------------- middle post ----------------- */}
        <div className='pt-9'>
          <img src={postImg} alt="postImg" className='w-full object-contain ' />
        </div>
        {/* -------------------- middle post end ----------------- */}
        {/* ----------------interactioIcons strt ----------------- */}
        <div className='px-5 py-5 mb-5'>
          <div className='flex items-center gap-3 float-left '>
            <div onClick={lovePostHandeler}>
            {IsLovePost? <IoHeart className='text-red-500 text-2xl cursor-pointer hover:scale-110 ease-in-out duration-200'/>:<BiHeart className='text-2xl cursor-pointer hover:scale-110 ease-in-out duration-200'/>}
            </div>
      
          
          <TbMessageCircle2 className='text-2xl cursor-pointer hover:scale-110 ease-in-out duration-200'/>
          <HiOutlinePaperAirplane className='text-2xl rotate-[70deg] origin-center cursor-pointer mb-1 hover:scale-110 ease-in-out duration-200'/>
          </div>
          <div className='float-right cursor-pointer'><BiBookmark className='text-2xl cursor-pointer hover:scale-110 ease-in-out duration-200'/></div>
        </div>
        {/* ----------------interactioIcons end ----------------- */}
       <div>
        {//<h1> {status?.data()?.Caption}</h1>
        }
        </div>
        {/* ----------------like comment start ----------------- */}
       <div className='px-5 '>
          <div><p className='text-sm font-bold '>3 likes</p></div>
          <div className='flex items-center gap-2'>
            <p className='font-bold text-sm'>{username}</p>
            <p className='text-sm'>{caption}</p>
          </div>
          <div className='h-[90px] overflow-y-auto'>
           { postedComment.length > 0 &&  postedComment.map((commented,i)=>(
               <div key={i+1}  className='flex items-center gap-2 mt-3 px-7' >
                 <img src={commented?.data()?.PostImage} alt="image" className='w-8 h-8 rounded-full' />
                 <div className='flex w-full justify-between items-center'>
                <div className='flex items-center gap-1'>
                <p className='font-bold text-xs w-15 truncate'>{commented?.data()?.Username}</p>
                <p className='text-xs font-light'>{commented?.data()?.Comment}</p>
               </div>
               <Moment fromNow className='text-sm'>
                {commented?.data()?.timeStamp?.toDate()}
                </Moment>
               </div>
          </div>

            ))}
            </div>
        </div>
        {/* ----------------like comment end ----------------- */}
        {/* ----------------hit comment start ----------------- */}
        <div className='px-5 py-4 flex items-center gap-2'>
          <div> <GrEmoji className='text-2xl' /></div>
          <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder='Add a comment...' className='placeholder:text-sm px-2 py-1 flex-1 outline-none focus:ring-2 focus:ring-neutral-600 border-none rounded-md' />
          <button type='submit' disabled={!comment.trim()} className='flex gap-3 items-center  px-3 py-1 rounded-sm text-sky-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-sky-300 duration-200' onClick={sendComment}>
            <p>Post</p>
            {loading && <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin  dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>}
            </button>
        </div>

        {/* ----------------hit comment end ----------------- */}




      </div>
    
     
   
  )
}

export default Post