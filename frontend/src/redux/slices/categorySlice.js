import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cateogry  : null,
    error: null,
};

const cateogrySlice  =  createSlice({
    name : "cateogry",
    initialState,
    reducers :{
       setCategory:(state, action) =>{
        state.cateogry =  action.payload;
        state.error =  null;
       },
       clearCategory :(state)=>{
        state.cateogry = null;
        state.error =  null;
       },
    }
})

export const {setCategory, clearCategory} =  cateogrySlice.actions;
export default cateogrySlice.reducer;