"use client"
import React from 'react'
import Layout from '../../Layout';
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectPackage, selectStatus } from '@/app/globalRedux/package/packageSlice';
import Link from 'next/link';


function PackSection() {
    const Packages = useSelector(selectPackage)
    const status = useSelector(selectStatus)
    return (
        <Layout>
            <div className='my-8'>
                <span className='bg-orange-300 px-4 py-2 rounded-xl italic text-white'>Exproler</span>
                <h1 className='text-2xl my-3 font-bold'>Most Visited Destination</h1>
                {status === 'loading' ? (
                    <div>Loading...</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {Packages.map((pack, i) => (
                            <div key={i} className='my-6 border-gray-400 shadow-2xl rounded-lg'>
                                <div className='w-full h-[250px] relative rounded-md'>
                                    <Image src={pack.thumbnil} alt="pack" fill />
                                </div>
                                <div className='px-4'>
                                    <div className='flex items-center justify-between'>
                                        <p className='flex text-gray-500 flex-row gap-2 items-center my-4'> <FaLocationDot className='text-orange-400' />{pack.location}</p>
                                        <p className='flex items-center gap-2FaStar'><span><FaStar className='text-orange-500' /></span>Not ratted</p>
                                    </div>
                                    <h1 className='text-xl font-extrabold my-4 text-gray-500'>{pack.title}</h1>
                                    <div className='flex justify-between items-center my-4'>
                                        <p>${pack.price}/ per person</p>
                                        <Link href={`/page/${pack._id}`} className='bg-orange-500 text-white px-5 py-2 rounded-md'>Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button className='mx-auto bg-purple-500 px-4 py-2 text-white font-bold rounded-lg block'>See All Package</button>
            </div>
        </Layout>
    )
}

export default PackSection