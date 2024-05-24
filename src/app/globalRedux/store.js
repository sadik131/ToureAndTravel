import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter/counterSlice"
import packageReducer from "./package/packageSlice"
import authReducer from "./auth/authSlice"
import bookingReducer from "./booking/bookingSlice"
import paymentReducer from "./payment/paymentSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        package: packageReducer,
        auth: authReducer,
        booking: bookingReducer,
        payment: paymentReducer
    }
})