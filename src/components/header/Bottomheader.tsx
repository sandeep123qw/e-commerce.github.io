import React from 'react'
import { LuMenu } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import type { StateProps } from '../../../type'
import { signOut } from 'next-auth/react'
import { removeUser } from '@/store/nextSlice'

const Bottomheader = () => {
  const {userInfo}= useSelector((state:StateProps)=>state.next)
  const dispatch = useDispatch()

  const handlesignout=()=>{
    signOut();
    dispatch(removeUser())
    
  }


  return (
    <div className=' w-full h-10 bg-amazon_light text-sm text-white px-4 flex items-center'>
      <p className='flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 '>
        <LuMenu />All
      </p>
      <p className='hidden md:inline-flex  items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>Todays Deals</p>
      <p className='hidden md:inline-flex  items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>Customer Service</p>
      <p className='hidden md:inline-flex  items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>Registry</p>
      <p className='hidden md:inline-flex  items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>Gift Cards</p>
      <p className='hidden md:inline-flex  items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>Sale</p>
     {
      userInfo && ( <button onClick={handlesignout} className='hidden md:inline-flex  items-center h-8 px-2 border border-transparent hover:border-red-600 text-amazon_yellow hover:text-red-400 cursor-pointer duration-300'>Sign Out</button>
      )
     }
    </div>
  )
}

export default Bottomheader
