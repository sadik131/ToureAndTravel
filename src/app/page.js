"use client"
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./globalRedux/counter/counterSlice";

export default function Home() {
  const counter = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <main className="h-screen bg-slate-400 w-11/12 mx-auto">
      <button onClick={() => dispatch(increment())}>+</button>
      value:{counter}
      <button onClick={() => dispatch(decrement())}>-</button>
    </main>
  );
}
