import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './authApi';

export const fetchUserAsync = createAsyncThunk(
    "auth/fetchUser",
    async (id) => {
        const responce = await fetchUser(id)
        return responce.data
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: true,
        currentUser: null
    },
    reducers: {
        logOut: state => {
            state.currentUser = null
        }
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchUserAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserAsync.fulfilled, (state, action) => {
                state.loading = false,
                    state.currentUser = action.payload.user
            })
    }
})

export const selectUser = state => state.auth.currentUser
export const { logOut } = authSlice.actions

export default authSlice.reducer