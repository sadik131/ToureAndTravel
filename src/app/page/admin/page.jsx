"use client"
import Layout from '@/app/components/Layout';
import { createPackageAsync } from '@/app/globalRedux/package/packageSlice';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Page = () => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        price: 0,
        thumbnail: '',
        maxGust: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const createPackage = (e) => {
        e.preventDefault()
        dispatch(createPackageAsync(formData))
        setFormData({
            title: '',
            location: '',
            description: '',
            price: 0,
            thumbnail: '',
            maxGust: 0
        })
    }


    return (
        <Layout>
            <div className=''>
                <form onSubmit={createPackage}>
                    <input type="text" name="title" placeholder='title' value={formData.title} onChange={handleChange} />
                    <input type="text" name="location" placeholder='location' value={formData.location} onChange={handleChange} />
                    <input type="text" name="description" placeholder='description' value={formData.description} onChange={handleChange} />
                    <input type="number" name="price" placeholder='price' value={formData.price} onChange={handleChange} />
                    <input type="text" name="thumbnail" placeholder='thumbnail' value={formData.thumbnail} onChange={handleChange} />
                    <input type="number" name="maxGust" placeholder='number of member' value={formData.peoples} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>

            </div>
        </Layout>
    );
}

export default Page;
