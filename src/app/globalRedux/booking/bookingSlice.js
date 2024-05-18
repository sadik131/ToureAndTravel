import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBooking, feedback, getBooking, getBookingByUserId, getpackageById ,deleteBookingById} from './bookingApi';

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
            })
    }
})

export const selectBooking = (state) => state.booking.booking
export const selectUserBooking = (state) => state.booking.userBooks
export const selectPackage = (state) => state.booking.package
export const selectBookLoading = (state) => state.booking.status

export default bookingSlice.reducer