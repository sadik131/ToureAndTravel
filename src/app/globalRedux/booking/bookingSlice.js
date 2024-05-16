import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBooking, feedback, getBooking, getpackageById } from './bookingApi';

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

export const createBookingAsync = createAsyncThunk(
    "booking/createBooking",
    async (doc) => {
        const responce = await createBooking(doc)
        return responce.data
    }
)

export const feedbackAsync = createAsyncThunk(
    "package/feedback",
    async (data) => {
        const responce = await feedback(data)
        return responce.data
    }
)

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        status: "loading",
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
            .addCase(feedbackAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(feedbackAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.package = action.payload.result;
                
                console.log(state.package)
            })
            .addCase(createBookingAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createBookingAsync.fulfilled, (state, action) => {
                state.status = "success",
                state.booking = state.booking.push(action.payload)
            })
    }
})

export const selectBooking = (state) => state.booking.booking
export const selectPackage = (state) => state.booking.package
export const selectBookLoading = (state) => state.booking.status

export default bookingSlice.reducer