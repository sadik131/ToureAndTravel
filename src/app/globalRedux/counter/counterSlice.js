import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        }
    }
})

export const { increment, decrement } = counterSlice.actions
export const selectCounter = (state) => state.counter.increment
export default counterSlice.reducer