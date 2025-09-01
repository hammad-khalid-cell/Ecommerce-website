import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,   // will store user object (id, name, email, profilePic, role, etc.)
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState : {user:null, loading:true},
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading =  false;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading =  false;
    },
    startLoading: (state)=>{
      state.loading= true;
    }
  },
});

export const { setUser, clearUser, startLoading } = userSlice.actions;
export default userSlice.reducer;
