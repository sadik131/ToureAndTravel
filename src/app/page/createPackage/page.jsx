"use client"
import React, { useRef, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Layout from '@/app/components/Layout'
import { createPackageAsync } from '@/app/globalRedux/package/packageSlice';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { storage } from '../../../../firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function page() {
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const [bar, setProgress] = useState(0)
    const route = useRouter()


    const [data, setData] = useState({
        title: '',
        location: '',
        description: '',
        thumbnil: '',
        price: 0,
        maxGust: 0,
        available: 0
    });

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

    const createPackage = (e) => {
        e.preventDefault();
        dispatch(createPackageAsync({ data }))
        toast.success("Success")
        setData({
            title: '',
            location: '',
            description: '',
            price: 0,
            maxGust: 0,
            thumbnil: "",
            available: 0
        })
        setProgress(0);
        route.push("/page/AllPackage")
    }

    return (
        <Layout>
            <div className='w-full'>
                {bar}
                <form className='w-[50%] mx-auto' onSubmit={createPackage}>
                    {data.thumbnil ? <div className='relative w-40 h-40 rounded-md'>
                        <Image src={data.thumbnil} alt='user' fill />
                    </div> : <div
                        onClick={() => fileInputRef.current.click()}
                        className='bg-gray-400 text-center text-white rounded-xl cursor-pointer  h-20 w-28'>select Image</div>}
                    <input ref={fileInputRef} type="file" className='hidden' onChange={uploadFile} />
                    <input className='w-full block my-2 px-1 py-2' type="text" name="title" placeholder='title' value={data.title} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="text" name="location" placeholder='location' value={data.location} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="text" name="description" placeholder='description' value={data.description} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="number" name="available" placeholder='available Rooms' value={data.available} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="number" name="price" placeholder='price' value={data.peoples} onChange={handleChange} />
                    <input className='w-full block my-2 px-1 py-2' type="number" name="maxGust" placeholder='number of member' value={data.peoples} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default page