import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPaymentIntent } from './paymentApi';


export const createPaymentIntentAsync = createAsyncThunk(
    'payment/createPaymentIntent',
    async (amount) => {
        const responce = await createPaymentIntent(amount)
        return responce.data
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        clientSecret: null,
        status: 'idle',
        error: null,
    },
    reducers: {

    },
    extraReducers: build => {
        build
            .addCase(createPaymentIntentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPaymentIntentAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.clientSecret = action.payload.clientSecret;
            })
            .addCase(createPaymentIntentAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export const selectClientSecret = (state) => state.payment.clientSecret;
export const selectPaymentStatus = (state) => state.payment.status;
export default paymentSlice.reducer