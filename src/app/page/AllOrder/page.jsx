import React from 'react'
import SideLayout from '../admin/SideLayout'
import Layout from '@/app/components/Layout'
import Order from './Order'

function page() {
  return (
    <Layout>
      <SideLayout>
        <h1>All Orders</h1>
        <Order></Order>
      </SideLayout>
    </Layout>
  )
}

export default page