import React from 'react'
import SideLayout from '../admin/SideLayout'
import Layout from '@/app/components/Layout'
import Packages from './Packages'
import Link from 'next/link'

function page() {
    return (
        <Layout>
            <SideLayout>
                <Link href={"/page/createPackage"} className='bg-orange-400 px-4 py-2 rounded-md text-white'>Create New</Link>
                <Packages></Packages>
            </SideLayout>
        </Layout>
    )
}

export default page