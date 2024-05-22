"use client"
import Layout from '@/app/components/Layout'
import Row from '@/app/components/Row'
import { selectUser } from '@/app/globalRedux/auth/authSlice'
import { deleteBookingByIdAsync, getBookingByUserIdAsync, selectBookLoading, selectUserBooking } from '@/app/globalRedux/booking/bookingSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function page() {
    const user = useSelector(selectUser)
    const myBooking = useSelector(selectUserBooking)
    const loading = useSelector(selectBookLoading)
    const dispatch = useDispatch()
    const route = useRouter()
    if (!user) {
        // return route.push("/")
    }

    useEffect(() => {
        if (user?._id) {
            dispatch(getBookingByUserIdAsync(user._id))
        }
    }, [user?._id])

    return (
        <Layout>
            <div className='flex gap-5 items-center'>
                <div className='h-auto w-[150px] rounded-md bg-pink-300'>
                    a
                </div>
                <div>
                    <h1>Name:{user?.name}</h1>
                    <h1>Email:{user?.email}</h1>
                </div>
            </div>
            <Row />
            <h1 className='my-5 text-2xl'>Your Order</h1>
            {loading === "loading" ? (
                <h1>Loading...</h1>
            ) : <>
                {myBooking.map(book => (
                    <div key={book._id} className='bg-white my-2 rounded-md p-5 flex justify-between'>
                        <div className='flex gap-5'>
                            <div className='h-10 w-10 rounded-md bg-purple-300'></div>
                            <div>
                                <h1 className='font-bold text-amber-700'>Status : {book.status}</h1>
                                <h1>Booking Name : {book.fullName}</h1>
                                <h1>Phon Number : {book.phonNumber}</h1>
                                <h1>Guest : {book.guest}</h1>
                                <h1>Total price : ${book.totalPrice}</h1>
                            </div>
                            <div>
                                <h1>Package : {book._id}</h1>
                                <h1>location : {book.packageId?.location}</h1>
                                <h1>Price : ${book.packageId?.price}/per person</h1>
                                <h1>rate : 5</h1>
                            </div>
                        </div>
                        <button onClick={() => dispatch(deleteBookingByIdAsync(book._id))} className='py-2 px-4 rounded-lg text-white bg-red-600'>cencel</button>
                    </div>
                ))}
            </>}

        </Layout>
    )
}

export default page
