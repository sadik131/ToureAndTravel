"use client"
import { getBookingAsync, selectBookLoading, selectBooking } from '@/app/globalRedux/booking/bookingSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Order() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBookingAsync())
    }, [])

    const books = useSelector(selectBooking)
    const loading = useSelector(selectBookLoading)
    console.log(books)

    if (loading === "loading") return <h1>Loading...</h1>
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold text-left">userId</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold text-left">packId</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold text-left">BookingName</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold text-left">date</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold text-left">Price</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold text-left">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book=>{
                            return <tr key={book._id}>
                            <td className="py-2 px-4 border-b border-gray-200">{book.userId}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{book.packageId?._id}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{book.fullName}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{book.date}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{book.totalPrice}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                            </td>
                        </tr>
                        })}
                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order