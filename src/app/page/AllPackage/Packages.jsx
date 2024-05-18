"use client"
import { deletePackageAsync, editPackageAsync, selectPackage } from '@/app/globalRedux/package/packageSlice'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


function Packages() {
  const pack = useSelector(selectPackage)
  console.log(pack)
  const dispatch = useDispatch()

  return (
    <div>
      {pack.map(pack => {
        return <div key={pack._id} className='flex gap-4 justify-between my-5'>
          <div className='flex items-center gap-3'>
            <div className='relative h-24 w-32 rounded-md'>
              <Image src={pack.thumbnil} fill />
            </div>

            <div className='flex gap-4'>
              <div>
                <h1>Title :{pack.title}</h1>
                <h1>Location :{pack.location}</h1>
              </div>
              <div>
                <h1>price:{pack.price}</h1>
                <h1>guest:{pack.maxGust}</h1>
              </div>
            </div>
          </div>
          <div>
            {/* onClick={() => dispatch(editPackageAsync(pack._id))} */}
            <button>Edit</button>
            <button onClick={() => dispatch(deletePackageAsync(pack._id))}>Delete</button>
          </div>
        </div>
      })}
    </div>
  )
}

export default Packages