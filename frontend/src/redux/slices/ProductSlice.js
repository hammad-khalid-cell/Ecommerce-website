import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product  : [],
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
        state.product = [];
        state.error =  null;
       },
    }
})

export const {setProducts, clearProducts} =  productSlice.actions;
export default productSlice.reducer;