import React, { useEffect, useState } from 'react'
import { SiMediamarkt } from 'react-icons/si'
import FormattedPrice from './FormattedPrice'
import { useDispatch, useSelector } from 'react-redux'
import type { StateProps, StoreProduct } from '../../type'

import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'


const CartPayment = () => {
    const {productData,userInfo}=useSelector((state:StateProps)=>state.next);
    const [totalamount,setTotalAmount] = useState(0)
    const dispatch = useDispatch()
    useEffect(()=>{
        let amt = 0 ;
        productData.map((item:StoreProduct)=>{
            amt += item.price * item.quantity
            return
        })
        setTotalAmount(amt)
    },[productData])

    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const { data: session } = useSession();
  
    const handlecheckout = async () => {
      const stripe = await stripePromise;
  
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: productData, email: session?.user?.email }),
      });
      const checkoutSession = await response.json();
  
      // Redirecting user/customer to Stripe Checkout
      const result: any = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
      if (result.error) {
        alert(result?.error.message);
      }
    };
  return (
    <div className='flex flex-col gap-4 '>
      <div className='flex gap-2'>

        <span className='bg-green-600 rounded-full p-1 h-6 text-sm text-white flex items-center justify-center'><SiMediamarkt/></span>
        <p className='text-sm'>Your order qualifies for free shipping by choosing this option at checkout, see details</p>      
      </div>
      <p className='flex items-center justify-between px-2 font-semibold'>Total: <span className='font-bold text-xl'>
         <FormattedPrice amount={totalamount}/>
        </span></p>
       {
        userInfo?( <div className='flex flex-col items-center'>
        <button onClick={handlecheckout} className='px-2 py-1 bg-black text-white hover:bg-amazon_yellow hover:text-amazon_blue active:text-white active:bg-black duration-300 rounded-lg'>
            proceed to buy
        </button>
        
    </div>):( <div className='flex flex-col items-center'>
            <button className='w-full h-10 font-semibold text-sm bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed'>
                proceed to buy
            </button>
            <p className='text-xs mt-1 text-red-500 font-semibold animate-bounce '>please login to continue</p>
        </div>)
       }

    </div>
  )
}

export default CartPayment
