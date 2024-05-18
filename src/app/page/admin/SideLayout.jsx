import Sidebar from '@/app/components/sidebar/Sidebar'
import React from 'react'

function SideLayout({ children }) {
    return (
        <div className='flex gap-5'>
            <div className='h-screen'>
                <Sidebar></Sidebar>
            </div>
            <div className='bg-white w-full p-4'>{children}</div>
        </div>
    )
}

export default SideLayout