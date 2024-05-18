"use client"
import React, { useEffect, useState } from 'react'
import Layout from '@/app/components/Layout'
import Row from '@/app/components/Row'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import { FaUserCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { FaLocationDot } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux'
import { createBookingAsync, feedbackAsync, getpackageByIdAsync, selectBookLoading, selectPackage } from '@/app/globalRedux/booking/bookingSlice'
import { selectUser } from '@/app/globalRedux/auth/authSlice'
import toast from 'react-hot-toast'



function page() {
  const id = useParams()
  const dispatch = useDispatch()
  const starRatings = [1, 2, 3, 4, 5];
  const pack = useSelector(selectPackage)
  const user = useSelector(selectUser)
  const status = useSelector(selectBookLoading)
  const [startDate, setStartDate] = useState(new Date());
  const [guest, setGuest] = useState(1)
  const [name, setName] = useState("")
  const [number, setNumber] = useState(0)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  useEffect(() => {
    dispatch(getpackageByIdAsync(id))
  }, [id])

  const totalPrice = pack?.price * guest + 10

  // book a package
  const makeBooking = (e) => {
    e.preventDefault()
    if (!user) {
      return toast.error("user must be login")
    }
    const data = {
      userId: user._id,
      packageId: pack._id,
      fullName: name,
      phonNumber: number,
      date: startDate,
      guest: guest,
      totalPrice
    }
    dispatch(createBookingAsync(data))
    return toast.success("Success")
  }

  // feedback
  const submitRating = (e) => {
    e.preventDefault()
    if (!user) {
      return toast.error("user must be login")

    }
    const data = {
      userId: user._id,
      packageId: pack._id,
      comment,
      rating
    }
    dispatch(feedbackAsync(data))
  }
  console.log(pack)

  return (
    <Layout>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className='flex w-full mt-[100px] gap-10'>
          <div className='w-[60%]'>
            <div className='relative w-[100%] h-[500px]'>
              <Image src={pack.thumbnil} fill alt="dsf" />
            </div>
            <div className='border border-gray-300 my-5 p-5'>
              <h1 className='text-2xl font-bold my-2'>{pack?.title}</h1>
              <div className='my-2 flex items-center flex-row gap-5'>
                <span className='flex items-center justify-center'><FaStar className='text-orange-500' /> 5.1(1)</span>
                <span>SomeWhere in {pack?.location}</span>
              </div>
              <div className='flex flex-row my-2 gap-5'>
                <span className='flex items-center gap-2'><FaLocationDot className='text-orange-400' />London</span>
                <span>${pack?.price} /per person</span>
                <span>10 people</span>
              </div>
              <div>
                <h1 className='text-xl font-bold'>Description</h1>
                <p className='text-gray-500'>{pack?.description}</p>
              </div>
            </div>
            {/* ratting part */}
            <div className='border border-gray-300 my-5 p-5'>
              <div className='flex gap-2'>
                {starRatings.map((rate, index) => (
                  <span key={index} className={`flex items-center ${rate === rating ? 'text-orange-400' : ''}`} onClick={() => setRating(rate)}>
                    {rate} <FaStar />
                  </span>
                ))}
              </div>
              <input type="text" onChange={(e) => setComment(e.target.value)} className='w-10/12 rounded-md py-2 my-2' placeholder='Share you thoughts' />
              <button onClick={submitRating} className='px-4 rounded-md bg-orange-400 py-2 text-white'>submit</button>
              <div>
                {pack.ratings.map(rat => (
                  <div key={rat._id} className='flex my-5 justify-between items-center'>
                    <div className='flex items-center gap-3'>
                      <span><FaUserCircle className='text-3xl' /></span>
                      <div className='flex flex-col gap-1'>
                        <span>Supto</span>
                        <span>19/5/2024</span>
                        <p>awosome place that i visited</p>
                      </div>
                    </div>
                    <span className='flex items-center gap-2'>5<FaStar className='text-orange-400' /></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='w-[35%]'>
            <div className='border border-gray-300 p-8'>
              <div className='flex justify-between items-center my-4'>
                <h1><span className='text-2xl font-bold'>${pack?.price}</span> /per person</h1>
                <span className='flex items-center justify-center'><FaStar className='text-orange-500' /> 5.1(1)</span>
              </div>
              <Row></Row>
              <form onSubmit={makeBooking}>
                <h1 className='text-xl my-4 font-bold'>information</h1>
                <div className='border border-gray-300 p-4'>
                  <input onChange={(e) => setName(e.target.value)} className='px-1 bg-gray-100 py-2 border border-b-gray-300 w-full my-2' placeholder='Full name' type='text' />
                  <input onChange={(e) => setNumber(e.target.value)} className='px-1 bg-gray-100 py-2 border border-b-gray-300 w-full my-2' placeholder='Phon' type='number' />
                  <div className='flex overflow-hidden gap-2 items-center'>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <input required type='number' placeholder='Guest' value={guest} onChange={(e) => setGuest(e.target.value)} />
                  </div>
                </div>
                <div className='flex flex-col gap-5'>
                  <div className='flex justify-between items-center mt-5'>
                    <span className='text-gray-500'>${pack?.price} * {guest} person</span>
                    <span className='text-gray-500'>${pack?.price}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-500'>Service charge</span>
                    <span className='text-gray-500'>$10</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold '>Total</span>
                    <span className='font-bold '>${totalPrice}</span>
                  </div>
                </div>
                <button type="submit" className='w-full block mt-2 text-white py-2 rounded-md bg-orange-400'>Book Now</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default page