"use client"
import { approvePackageAsync, deletePackageAsync, selectPackage } from '@/app/globalRedux/package/packageSlice'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


function Packages() {
  const pack = useSelector(selectPackage)
  const dispatch = useDispatch()

  const sortedPackages = [...pack].sort((a, b) => {
    if (a.approve === b.approve) {
      return 0;
    }
    return a.approve ? 1 : -1;
  });

  return (
    <div>
      {sortedPackages.map(pack => {
        return <div key={pack._id} className='flex gap-4 justify-between my-5'>
          <div className='flex items-center gap-3'>
            <div className='relative h-24 w-32 rounded-md'>
              <Image src={pack.thumbnil} alt={pack.title} fill />
            </div>

            <div className='flex gap-4'>
              <div>
                <h1>Title :{pack.title}</h1>
                <h1>Location :{pack.location}</h1>
              </div>
              <div>
                <h1>price: ${pack.price}</h1>
                <h1>guest:{pack.maxGust}</h1>
              </div>
            </div>
          </div>
          <div>

            {pack.approve ? (
              <>
                <Link className='bg-blue-500 text-sm text-white rounded-md p-2' href={`/page/createPackage/${pack._id}`}>Edit</Link>
                <button className='bg-red-500 text-sm text-white rounded-md p-2' onClick={() => dispatch(deletePackageAsync(pack._id))}>Delete</button>
              </>
            ) : (<button className='bg-green-400 text-sm rounded-md p-2' onClick={() => dispatch(approvePackageAsync({ id: pack._id, data: { approve: true } }))}>Approve</button>)}
          </div>
        </div>
      })}
    </div>
  )
}

export default Packages