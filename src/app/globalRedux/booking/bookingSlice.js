import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBooking, feedback, getBooking, getBookingByUserId, getpackageById, deleteBookingById, editStatus } from './bookingApi';

export const getBookingAsync = createAsyncThunk(
    "booking/getBooking",
    async () => {
        const responce = await getBooking()
        return responce.data
    }
)
export const getpackageByIdAsync = createAsyncThunk(
    "booking/getpackageById",
    async (id) => {
        const responce = await getpackageById(id)
        return responce.data
    }
)

export const deleteBookingByIdAsync = createAsyncThunk(
    "booking/deleteBookingById",
    async (id) => {
        const responce = await deleteBookingById(id)
        return responce.data
    }
)

// get by user id
export const getBookingByUserIdAsync = createAsyncThunk(
    "booking/getBookingByUserId",
    async (id) => {
        const responce = await getBookingByUserId(id)
        return responce.data
    }
)

export const createBookingAsync = createAsyncThunk(
    "booking/createBooking",
    async (doc, { rejectWithValue }) => {
        try {
            const responce = await createBooking(doc)
            return responce.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const feedbackAsync = createAsyncThunk(
    "package/feedback",
    async (data) => {
        const responce = await feedback(data)
        return responce.data
    }
)
export const editStatusAsync = createAsyncThunk(
    "package/editStatus",
    async (data) => {
        const responce = await editStatus(data)
        return responce.data
    }
)

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        status: "loading",
        userBooks: [],
        booking: [],
        package: null
    },
    reducers: {

    },
    extraReducers: (bulder) => {
        bulder
            .addCase(getBookingAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getBookingAsync.fulfilled, (state, action) => {
                state.status = "success",
                    state.booking = action.payload
            })
            .addCase(getpackageByIdAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getpackageByIdAsync.fulfilled, (state, action) => {
                state.status = "success",
                    state.package = action.payload.result
            })
            .addCase(getBookingByUserIdAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getBookingByUserIdAsync.fulfilled, (state, action) => {
                state.status = "success",
                    state.userBooks = action.payload.result
            })
            .addCase(editStatusAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(editStatusAsync.fulfilled, (state, action) => {
                state.status = "success"
                const updateId = action.payload.result._id
                const index = state.booking.findIndex(pk => pk._id === updateId)
                state.booking[index] = action.payload.result
            })
            .addCase(feedbackAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(feedbackAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.package = action.payload.result;
            })
            .addCase(createBookingAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createBookingAsync.fulfilled, (state, action) => {
                state.status = "success",
                    state.booking = state.booking.push(action.payload)
                const packageId = action.payload.packageId
                if (state.package && state.package._id === packageId) {
                    state.package.available -= 1
                }
                console.log(state.package)
            })
            .addCase(createBookingAsync.rejected, (state, action) => {
                state.status = "failed",
                    state.error = action.payload
            })
    }
})

export const selectBooking = (state) => state.booking.booking
export const selectUserBooking = (state) => state.booking.userBooks
export const selectPackage = (state) => state.booking.package
export const selectBookLoading = (state) => state.booking.status

export default bookingSlice.reducer