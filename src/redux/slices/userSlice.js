import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        isLoggedIn: false,
        user:{}
    },
    reducers: {
        setUser:(state, action)=>{
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        removeToken: (state) => {
            state.token = null;
            state.isLoggedIn = false;
        }
    }
})

export const {setToken, removeToken, setUser} = userSlice.actions;
export default userSlice.reducer;