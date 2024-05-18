import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPackage, deletePackage, getPackage, editPackage } from './packageApi';

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
export const deletePackageAsync = createAsyncThunk(
    "package/deletePackage",
    async (id) => {
        const responce = await deletePackage(id)
        return responce.data
    }
)
export const editPackageAsync = createAsyncThunk(
    "package/editPackage",
    async (update) => {
        const responce = await editPackage(update)
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
            .addCase(deletePackageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePackageAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.packages = state.packages.filter(pk => pk._id !== action.payload.id)
                console.log(state.packages)
            })
            .addCase(editPackageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editPackageAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                const index = state.packages.findIndex(pk => pk._id !== action.payload._id)
                console.log(index)
            })
    }
})

export const selectPackage = (state) => state.package.packages
export const selectStatus = (state) => state.package.status
export default packageSlice.reducer