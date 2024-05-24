"use client"
import Layout from '@/app/components/Layout'
import PackCart from '@/app/components/PackCart'
import { filterPackageAsync, getPackageAsync, selectPackage, selectStatus } from '@/app/globalRedux/package/packageSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function page() {
    const [location, setLocation] = useState("")
    const [option, setOption] = useState("asc")
    const status = useSelector(selectStatus)
    const packagesApprove = useSelector(selectPackage) || []
    const packages = packagesApprove.filter(pk => pk.approve === true)
    const dispatch = useDispatch()

    // useEffect(()=>{
    // },[dispatch])

    const handelfilter = (e) => {
        e.preventDefault()
        dispatch(getPackageAsync({ location, option }))
        setLocation("")
    }

    if (status === "loading") {
        return <Layout><h1>loading...</h1></Layout>
    }
    return (
        <Layout>
            <div>
                <h1 className='text-orange-600 text-3xl text-center font-bold'>Our All Package</h1>
                <form onSubmit={handelfilter}>
                    <div>
                        <label>location</label>
                        <input type="text" onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div>
                        <label>location</label>
                        <label>Sort by Price</label>
                        <select value={option} onChange={(e) => setOption(e.target.value)}>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                    </div>
                    <button type='submit'>submit</button>
                </form>
                <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {packages.map(pack => <PackCart key={pack._id} pack={pack}></PackCart>)}
                </div>
            </div>
        </Layout>
    )
}

export default page