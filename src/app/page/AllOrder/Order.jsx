"use client"
import { editStatusAsync, getBookingAsync, selectBookLoading, selectBooking } from '@/app/globalRedux/booking/bookingSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Order() {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(null)
    useEffect(() => {
        dispatch(getBookingAsync())
    }, [])

    const books = useSelector(selectBooking)
    const loading = useSelector(selectBookLoading)

    const handelStatus = (id) => {
        setEdit((prevId) => (prevId === id ? null : id));
    }

    const handelStatusChange = (status, id) => {
        dispatch(editStatusAsync({ status, id }))
        setEdit(null)
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "confirm":
                return "bg-green-400";
            case "pending":
                return "bg-yellow-400";
            case "cencel":
                return "bg-red-400";
            default:
                return ""

        }
    }

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
                        {books.map(book => {
                            return <tr key={book._id}>
                                <td className="py-2 px-4 border-b border-gray-200">{book.userId}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{book.packageId?._id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{book.fullName}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{book.date}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{book.totalPrice}</td>
                                <td className="py-2 px-4 border-b border-gray-200 flex gap-5">
                                    {edit === book._id ? <select value={book.status} onChange={(e) => handelStatusChange(e.target.value, book._id)} className='border border-gray-500 p-2 font-medium rounded-lg '>
                                        <option value="pending">pending</option>
                                        <option value="confirm">confirm</option>
                                        <option value="cencel">cencel</option>
                                    </select> : <h1 className={`rounded-md p-1 ${getStatusClass(book.status)}`}>{book.status}</h1>}

                                    <button className='' onClick={() => handelStatus(book._id)}>edit</button>
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