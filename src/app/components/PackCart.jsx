import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from 'next/image';
import Link from 'next/link';


function PackCart({ pack }) {
    return (
        <>
            <div className='my-6 border-gray-400 shadow-2xl rounded-lg'>
                <div className='w-full h-[250px] relative rounded-md'>
                    <Image src={pack.thumbnil} alt="pack" fill />
                </div>
                <div className='px-4'>
                    <div className='flex items-center justify-between'>
                        <p className='flex text-gray-500 flex-row gap-2 items-center my-4'> <FaLocationDot className='text-orange-400' />{pack.location}</p>
                        <p className='flex items-center gap-2FaStar'><span><FaStar className='text-orange-500' /></span>{pack.ratings.length > 0 ? (pack.ratings.length) : "Not ratted"}</p>
                    </div>
                    <h1 className='text-xl font-extrabold my-4 text-gray-500'>{pack.title}</h1>
                    <div className='flex justify-between items-center my-4'>
                        <p>${pack.price}/ per person</p>
                        <Link href={`/page/${pack._id}`} className='bg-orange-500 text-white px-5 py-2 rounded-md'>Book Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PackCart