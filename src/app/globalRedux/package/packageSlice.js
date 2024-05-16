import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPackage, feedback, getPackage } from './packageApi';

export const getPackageAsync = createAsyncThunk(
    "package/getPackage",
    async () => {
        const responce = await getPackage()
        return responce.data
    }
)
export const createPackageAsync = createAsyncThunk(
    "package/createPackage",
    async (data) => {
        const responce = await createPackage(data)
        return responce.data
    }
)


const packageSlice = createSlice({
    name: "package",
    initialState: {
        status: 'loading',
        error: null,
        packages: []
    },
    reducers: {

    },
    extraReducers: (bulder) => {
        bulder
            .addCase(getPackageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPackageAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.packages = action.payload;
            })
            
            .addCase(createPackageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPackageAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.packages.push(action.payload)
            })
    }
})

export const selectPackage = (state) => state.package.packages
export const selectStatus = (state) => state.package.status
export default packageSlice.reducer