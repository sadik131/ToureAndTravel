"use client"
import React from 'react'
import Layout from '../../Layout';
import { useSelector } from 'react-redux';
import { selectPackage, selectStatus } from '@/app/globalRedux/package/packageSlice';
import Link from 'next/link';
import PackCart from '../../PackCart';


function PackSection() {
    const packagesApprove = useSelector(selectPackage)
    const Packages = packagesApprove.filter(pk => pk.approve === true)
    const status = useSelector(selectStatus)

    return (
        <Layout>
            <div className='my-8'>
                <span className='bg-orange-300 px-4 py-2 rounded-xl italic text-white'>Exproler</span>
                <h1 className='text-2xl my-3 font-bold'>Most Visited Destination</h1>
                {status === 'loading' ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {Packages.slice(0, 6).map((pack, i) => <PackCart key={i} pack={pack}></PackCart>)}
                        </div>
                        <Link href={"/page/packagePage"} className='mx-auto bg-purple-500 px-4 py-2 text-white font-bold rounded-lg'>See All Package</Link>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default PackSection