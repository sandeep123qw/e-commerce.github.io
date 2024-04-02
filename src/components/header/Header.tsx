import Image from 'next/image'
import React, { useEffect } from 'react'
 import logo from '@/images/logo.png'
 import { BiCaretDown } from 'react-icons/bi'
 import { HiOutlineSearch } from 'react-icons/hi'
 import { BiSolidLocationPlus } from 'react-icons/bi'
 import carticon from '@/images/cartIcon.png'
 import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import type { StateProps } from '../../../type'
import { useSession, signIn, signOut } from "next-auth/react"
import { addUser, removeUser } from '@/store/nextSlice'
 

const Header = () => {
  const { data: session} = useSession()
  const dispatch = useDispatch()
  const {productData,favoriteData,userInfo}=useSelector((state:StateProps)=>state.next)
  useEffect(()=>{
    if(session){
      dispatch(addUser({
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      }))
    }
  },[session])
  const handlesignout = () =>{
    signOut();
    dispatch(removeUser())
  }

  return (
    <div className='w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50'>
        <div className='h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4 '>
           <Link href={'/'}>
           <div className='px-2 py-1 border-[1px] border-transparent hover:border-white cursor-pointer duration-300  flex items-center justify-center h-[70%] mt-1'>
            <Image src={logo} alt='logo'  className='w-28 object-cover' />
            </div>
           </Link>
            {/* delivery */}
            <div className='px-2 border border-transparent hover:border-white cursor-pointer duration-300 xl:inline-flex items-center justify-center h-[70%] hidden gap-1'>
                <BiSolidLocationPlus/>
              <div className='text-xs'>
              <p>Deliver to</p>
                <p className='text-white font-bold uppercase'>India</p>
              </div>
            </div>
            {/* serach bar */}
            <div className='flex-1 h-10 hidden md:inline-flex items-center justify-between relative'>
                <input type="text" placeholder='search products' className='w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow' />
                <span className='w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md'>
                    <HiOutlineSearch/>
                </span>
            </div>
            {/* sign in */}
        {
          userInfo?    <div className='flex items-center px-2 md:border md:border-transparent md:hover:border-white cursor-pointer duration-300 md:h-[70%] gap-1'>
       <img src={userInfo.image} alt="userimage" className='h-8 w-8 rounded-full object-cover' />
       <div>
        <p className='text-xs'>{userInfo.name}</p>
        <div>
          <button onClick={handlesignout} className='text-red-600 active:text-red-700 duration-300'>sign Out</button>
        </div>
       </div>
          
      </div>:
          <div onClick={()=>signIn()} className='text-xm text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]'>
          <p className='text-sm font-semibold'>Hello, sign in</p>
          {/* <p className='text-white font-semibold flex items-center'>Account & lists
          <span><BiCaretDown/></span>
          </p> */}
          
      </div>
        }
            {/* favrt */}
            <div className='text-xm text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
                {/* <p className='text-sm'>Marked</p> */}
                <p className='text-white font-semibold'>favorite</p>
               {
                favoriteData.length>0 && (
                  <span className='absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400  items-center justify-center text-xs text-amazon_yellow md:flex hidden'>{favoriteData.length}</span>
                )
               }
            </div>
            {/* cart */}
            <Link href={'/cart'} className='text-xm text-gray-100 flex items-center justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
                <Image src={carticon} alt='cart icon' className='w-auto object-cover h-7'/>
                <p className='text-xs text-white font-bold mt-3 '>Cart</p>
                <span className='absolute text-amazon_yellow text-sm top-2 left-[26px]'>{productData? productData.length:0}</span>
            </Link>
        </div>
      
    </div>
  )
}

export default Header
