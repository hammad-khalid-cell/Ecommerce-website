import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product  : null,
    error: null,
};

const productSlice  =  createSlice({
    name : "product",
    initialState,
    reducers :{
       setProducts:(state, action) =>{
        state.product =  action.payload;
        state.error =  null;
       },
       clearProducts :(state)=>{
        state.product = null;
        state.error =  null;
       },
    }
})

export const {setProducts, clearProducts} =  productSlice.actions;
export default productSlice.reducer;