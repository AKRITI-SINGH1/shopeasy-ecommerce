import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isLoading : false,
    user : null
}



const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reduces : {
        setUser:(state, action) => {

         }  
    }
})

export const {setuser} = authSlice.actions;
export default authSlice.reducer;
