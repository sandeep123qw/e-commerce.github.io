import { resetcart } from '@/store/nextSlice';
import React from 'react'
import { useDispatch } from 'react-redux';

const Resetcart = () => {
    const dispatch = useDispatch();
    const handleResetCart = () => {
      const confirmReset = window.confirm(
        "Are you sure to reset your items from the cart?"
      );
      if (confirmReset) {
        dispatch(resetcart());
      }
    };
  return (
    <button
    onClick={handleResetCart}
    className="w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300"
  >
    reset cart
  </button>
  )
}

export default Resetcart
