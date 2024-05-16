import React from 'react'
import Image from 'next/image'


function Hero() {
    return (
        <div>
            <div className="bg-gray-200">
                <div className='h-[500px] w-full relative'>
                    <Image src={"/banner.jpg"} fill alt='hero' />
                </div>
                <div className='absolute top-[30%] w-[37%] left-[50%] text-white'>
                    <h1 className='text-3xl font-extrabold my-2'>Traveling opens the door to create <span className='text-orange-300'>memories</span></h1>
                    <p className='text-xl'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quidem iste optio dolor vel atque? Quos porro tempore unde. Maxime, cum qui id ipsum saepe dolor vero veritatis aut sequi voluptate, cupiditate magnam fugiat harum non expedita quo corrupti assumenda.</p>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Hero