"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Layout from '@/app/components/Layout'
import { createPackageAsync, editPackageAsync, selectStatus } from '@/app/globalRedux/package/packageSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { storage } from '../../../../../firebase';
import { getpackageByIdAsync, selectPackage } from '@/app/globalRedux/booking/bookingSlice';

function page() {
    const { id } = useParams()
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const [bar, setProgress] = useState(0)
    const route = useRouter()

    useEffect(() => {
        dispatch(getpackageByIdAsync(id))
    }, [id])


    const pack = useSelector(selectPackage)
    const loading = useSelector(selectStatus)
    const [data, setData] = useState({
        title: '',
        location: '',
        description: '',
        thumbnil: '',
        price: 0,
        maxGust: 0
    });
    useEffect(() => {
        if (pack) {
            setData({
                title: pack.title,
                location: pack.location,
                description: pack.description,
                thumbnil: pack.thumbnil,
                price: pack.price || 0,
                maxGust: pack.maxGust || 0
            })
        }
    }, [pack])
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const uploadFile = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress)
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData({
                            ...data,
                            thumbnil: downloadURL
                        });
                    })
                }
            );
        }
        return
    }

    const editPackage = (e) => {
        e.preventDefault();
        dispatch(editPackageAsync({ data, id }))
        setData({
            title: '',
            location: '',
            description: '',
            price: 0,
            maxGust: 0,
            thumbnil: ""
        })
        toast.success("Success")
        route.push("/page/AllPackage")
        // setProgress(0);
    }

    if (loading === "loading") {
        return <Layout><h1>loading...</h1></Layout>
    }
    return (
        <Layout>
            <div className='w-full'>
                <form className='w-[50%] mx-auto' onSubmit={editPackage}>
                    {data.thumbnil ? <div className='relative w-40 h-40 rounded-md'>
                        <Image src={data.thumbnil} alt='user' fill />
                    </div> : <div
                        onClick={() => fileInputRef.current.click()}
                        className='bg-gray-400 text-center text-white rounded-xl cursor-pointer  h-20 w-28'>select Image</div>}
                    <input ref={fileInputRef} type="file" className='hidden' onChange={uploadFile} />
                    <input className='w-full block my-2 px-1 py-2' type="text" name="title" placeholder='title' value={data.title} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="text" name="location" placeholder='location' value={data.location} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="text" name="description" placeholder='description' value={data.description} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="number" name="price" placeholder='price' value={data.price} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="number" name="maxGust" placeholder='number of member' value={data.maxGust} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default page