import Layout from '@/app/components/Layout';
import Sidebar from '@/app/components/sidebar/Sidebar';
import { createPackageAsync } from '@/app/globalRedux/package/packageSlice';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SideLayout from './SideLayout';

const Page = () => {
   


    return (
        <Layout>
           <SideLayout />
        </Layout>
    );
}

export default Page;
