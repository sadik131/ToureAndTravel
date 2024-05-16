import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter/counterSlice"
import packageReducer from "./package/packageSlice"
import authReducer from "./auth/authSlice"
import bookingReducer from "./booking/bookingSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        package: packageReducer,
        auth: authReducer,
        booking: bookingReducer
    }
})