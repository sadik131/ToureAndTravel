"use client"
import Layout from '@/app/components/Layout'
import PackCart from '@/app/components/PackCart'
import { selectPackage, selectStatus } from '@/app/globalRedux/package/packageSlice'
import React from 'react'
import { useSelector } from 'react-redux'

function page() {
    const status = useSelector(selectStatus)
    const packagesApprove = useSelector(selectPackage)
    const packages = packagesApprove.filter(pk => pk.approve === true)


    if (status === "loading") {
        return <Layout><h1>loading...</h1></Layout>
    }
    return (
        <Layout>
            <div>
                <h1 className='text-orange-600 text-3xl text-center font-bold'>Our All Package</h1>
                <div>
                    <div>
                        <label>location</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>location</label>
                        <input type="text" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {packages.map(pack => <PackCart key={pack._id} pack={pack}></PackCart>)}
                </div>
            </div>
        </Layout>
    )
}

export default page