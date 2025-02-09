import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isAuthenticated: false,
    isLoading : false,
    user : null
};

export const registerUser = createAsyncThunk("/auth/register",
   
    async (formData) => {
        const response = await axios.post(
            "http://localhost:3000/api/auth/register", 
             formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);




const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reduces : {
        setUser:(state, action) => {}, 
    },
    extraReducers : (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(registerUser.fulfilled, (state , action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }) 
        .addCase(registerUser.rejected, (state , action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
});

export const { setuser } = authSlice.actions;
export default authSlice.reducer;
