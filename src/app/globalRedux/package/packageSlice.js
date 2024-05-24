import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPackage, deletePackage, getPackage, editPackage, approvePackage, filterPackage } from './packageApi';
import toast from 'react-hot-toast';

export const getPackageAsync = createAsyncThunk(
    "package/getPackage",
    async (prop) => {
        const responce = await getPackage(prop)
        return responce.data
    }
)
export const filterPackageAsync = createAsyncThunk(
    "package/filterPackage",
    async (filter) => {
        const responce = await filterPackage(filter)
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

export const approvePackageAsync = createAsyncThunk(
    "package/approvePackage",
    async (update) => {
        const responce = await approvePackage(update)
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
            .addCase(filterPackageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(filterPackageAsync.fulfilled, (state, action) => {
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
            })
            .addCase(approvePackageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(approvePackageAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.packages.findIndex(pk => pk._id === action.payload.result._id)
                if (index !== -1) {
                    state.packages[index] = action.payload.result
                }
            })
            .addCase(editPackageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editPackageAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.packages.findIndex(pk => pk._id === action.payload.result._id)
                if (index !== -1) {
                    state.packages[index] = action.payload.result;
                } else {
                    toast.error('Package not found');
                }
            })
    }
})

export const selectPackage = (state) => state.package.packages
export const selectStatus = (state) => state.package.status
export default packageSlice.reducer