'use client'
import Link from 'next/link';
import { Description, NameState, ProfilState, UserName } from './RecoilState';
import { FaUserEdit,FaUserCog } from "react-icons/fa";
import { useRecoilState } from 'recoil';
const UserProfileMobile = () => {
    const userName = useRecoilState(UserName);
    const profileImg = useRecoilState(ProfilState)
    const description = useRecoilState(Description)
    const name = useRecoilState(NameState)
    const photoUrl = 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png'
  return (
    <div className='flex flex-col bg-white gap-1 px-5 py-2'> 
        <div className='flex px-4 py-4 justify-between items-center'>
        <Link href='settings'><FaUserEdit  className='text-[20px]'/></Link>
           <h1 className='text-[15px] font-bold  '>
            {userName[0]}
           </h1>
        <Link href='settings'><FaUserCog className='text-[20px]' /></Link>
        </div>
        <div className='flex items-center gap-6 justify-between'>
        <img src={profileImg[0] ? profileImg[0] : photoUrl} alt="Photo profile" className='w-[70px] h-[70px] object-cover rounded-full '/>
        <div className='flex flex-[0.8] items-center gap-4'>
        <p className='flex items-center flex-col  text-center font-normal text-[14px] leading-[1.1]'>
                <span className='font-extrabold'>
                285
                </span>
                Posts
            </p>
            <p className='flex items-center flex-col  text-center font-normal text-[14px] leading-[1.1]'>
                <span className='font-extrabold'>
                974k
                </span>
                Followers
            </p>
            <p className='flex items-center flex-col  text-center font-normal text-[14px] leading-[1.1]'>
                <span className='font-extrabold'>
                444
                </span>
                Following
            </p>
            
        </div>
        
        </div>
        <div>
            <h4 className='font-bold text-[15px] pt-1'>{name[0]}</h4>
        </div>
        <div>
            <h6 className='w-[80%] text-[13px] pb-1 text-[#313131]'>{description[0]}</h6>
        </div>

    </div>
  )
}

export default UserProfileMobile