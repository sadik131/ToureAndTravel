import Link from 'next/link'
import React from 'react'

function Sidebar() {
    return (
        <div className='flex flex-col w-32 gap-4'>
            <Link className='hover:bg-white rounded-md py-2 px-1 w-full' href={"/page/AllOrder"} >Order</Link>
            <Link className='hover:bg-white rounded-md py-2 px-1 w-full' href={"/page/AllPackage"} >Packages</Link>
        </div>
    )
}

export default Sidebar