'use client'
import { useRecoilState } from 'recoil'
import { Description, EmailState, Gender, NameState, Password, Posts, ProfilState, UserName, timeStamp, userUid } from './RecoilState'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { db } from '@/app/firebase'
import { useEffect } from 'react'
const AllData = () => {
const {data:session} = useSession()
const ProviderId = session?.user?.id
const UserUid = useRecoilState(userUid)
const [name, setName] = useRecoilState(NameState)
const [profileImg, setprofileImg] = useRecoilState(ProfilState)
const [userEmail, setUserEmail] = useRecoilState(EmailState)
const [useerName, setUseerName] = useRecoilState(UserName)
const [description, setDescription] = useRecoilState(Description)
const [gender, setGender] = useRecoilState(Gender)
const [ServerStamp, setServerStamp] = useRecoilState(timeStamp)
const [Pass, setPass] = useRecoilState(Password)
const RuserName = useRecoilState(NameState);
const profilePic = useRecoilState(ProfilState)
const UserEmail = useRecoilState(EmailState)
const UUserName = useRecoilState(UserName)
const dEscription =useRecoilState(Description)
const GenDer = useRecoilState(Gender)
const serverTime = useRecoilState(timeStamp)
   const senData = async ()=>{
      const docRef = doc(db, "users", ProviderId, "PrivateSession", ProviderId);
      await setDoc(docRef, {
        Email:UserEmail[0] ? UserEmail[0] : session?.user?.email,
        Username:UUserName[0] ? UUserName[0] :session?.user?.name?.toLocaleLowerCase().replace(/ /g, ''),
        Name:RuserName[0] ? RuserName[0] : session?.user?.name,
        timeStamp:serverTime[0] ? serverTime[0] : serverTimestamp()
   })
       const ref1 = doc(db,'users', ProviderId)
       const docref1 = await setDoc(ref1, {
        Description:dEscription[0] ? dEscription[0] : '',
        PhotoProfile:profilePic[0] ? profilePic[0] :session?.user?.image,
        Gender:GenDer[0] ? GenDer[0] : '',
        })
    }
    (UserEmail[0] == undefined) && 
    (
    senData()
      )
useEffect(() => {
   const retrievData = async ()=> 
   {
    const docRef = doc(db,'users',session ? ProviderId : UserUid[0],"PrivateSession",session ? ProviderId : UserUid[0] )
      const docSnap = await  getDoc(docRef)
      setUseerName(docSnap?.data()?.Username)
      setUserEmail(docSnap?.data()?.Email)
      setName(docSnap?.data()?.Name)
      const docRef1 = doc(db,'users',session ? ProviderId : UserUid[0])
      const docSnap1 = await  getDoc(docRef1)
      setprofileImg(docSnap1?.data()?.PhotoProfile)
      setDescription(docSnap1?.data()?.Description)
      setGender(docSnap1?.data()?.Gender)
      setServerStamp(docSnap1?.data()?.timeStamp)
      setPass(docSnap1?.data()?.Pass)
      }
      retrievData()
}, [session,db])
}
export default AllData