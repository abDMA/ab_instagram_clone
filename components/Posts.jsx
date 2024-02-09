'use client'
import { useEffect, useState } from "react"
import { Post } from "./constant"
import { db } from "@/app/firebase"
import { useSession } from "next-auth/react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { EmailState, NameState, ProfilState, UserName, userUid } from "./RecoilState"
import { useRecoilState } from "recoil"
import any from "../public/any.png"

const Posts = () => {
  const {data:session} = useSession()
  const [posts, setPosts] = useState([])
  const UserUid = useRecoilState(userUid)
  const ProviderId = session?.user?.id
  const userName = useRecoilState(UserName);
  const profileImg = useRecoilState(ProfilState)


/*

<----


*/ 
  
  useEffect(() => { 
    return onSnapshot(query(collection(db,'posts',session ? ProviderId : UserUid[0],'post'),orderBy('timeStamp','desc')),snapshot =>{
      setPosts(snapshot.docs)
  
    })
  }, [session])



  return (
    <div className=' w-[99%] flex flex-col gap-5  py-4 rounded-md mt-7 '>
      {
        posts.map((post)=>(
          <Post key={post.id} id={post.id} username={userName[0]} profileImg={profileImg[0]} caption={post?.data()?.Caption} postImg={(post?.data()?.PostImage)?(post?.data()?.PostImage):any} />
        ))
      }

    </div>
  )
}

export default Posts