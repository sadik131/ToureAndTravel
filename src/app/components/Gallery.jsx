import React from 'react'
import Layout from './Layout'
import Image from 'next/image'

const imgs = [
    { id: 1, src: "/Australia.jpg" },
    { id: 2, src: "/China.jpg" },
    { id: 3, src: "/Turkey.jpg" },
    { id: 4, src: "/Egypt.jpg" },
    { id: 5, src: "/Germany.jpg" },
    { id: 6, src: "/Indonesia.jpg" },
    { id: 7, src: "/japan.jpg" },
    { id: 8, src: "/Kasmir.jpg" },
    { id: 9, src: "/Russia.jpg" },
]

function Gallery() {
    return (
        <Layout>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {imgs.map(img => (
                    <div key={img.id} className='relative h-60 w-full'>
                        <Image src={img.src} fill alt='gallery' />
                    </div>
                ))}

            </div>
        </Layout>
    )
}

export default Gallery