import { createSlice } from '@reduxjs/toolkit';
import type { StoreProduct } from '../../type';

interface NextState {
  productData: StoreProduct[],
  favoriteData: StoreProduct[],
  allProducts: StoreProduct[],
  userInfo: null | string
}

const initialState:NextState ={
    productData: [],
    favoriteData: [],
    allProducts: [],
    userInfo: null,
}

export const nextSlice = createSlice({
    name: 'next',
    initialState,
    reducers: {
      addToCart:(state,action)=>{
       const existingProduct = state.productData.find((item:StoreProduct)=>item._id === action.payload._id);
       if(existingProduct){
        existingProduct.quantity += action.payload.quantity
       }else{
        state.productData.push(action.payload)
       }

      },
      addToFavorites:(state,action)=>{
        const existingProduct = state.favoriteData.find((item:StoreProduct)=>item._id === action.payload._id);
        if(existingProduct){
         existingProduct.quantity += action.payload.quantity
        }else{
         state.favoriteData.push(action.payload)
        }
      },
      increaseQuantity:(state,action)=>{
        const existingProduct = state.productData.find((item:StoreProduct)=>item._id === action.payload._id);
        existingProduct && existingProduct.quantity++;

      },
      decreaseQuantity:(state,action)=>{
        const existingProduct = state.productData.find((item:StoreProduct)=>item._id === action.payload._id)
        if(existingProduct?.quantity === 1){
          existingProduct.quantity=1
        }else{
          existingProduct!.quantity--
        }
      },
      deleteProduct:(state,action)=>{
        state.productData = state.productData.filter((item)=>item._id !== action.payload);
      },
      resetcart:(state,)=>{
        state.productData = []
      },
      addUser:(state,action)=>{
        state.userInfo= action.payload
      },
      removeUser:(state)=>{
        state.userInfo = null
      },
      setAllProducts:(state,action)=>{
        state.allProducts = action.payload;
      }
    },
  })

  export const { addToCart, resetcart,removeUser,setAllProducts,addUser,addToFavorites,deleteProduct,increaseQuantity,decreaseQuantity } = nextSlice.actions

export default nextSlice.reducer