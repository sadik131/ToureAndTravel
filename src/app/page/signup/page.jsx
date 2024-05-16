"use client"
import Layout from '@/app/components/Layout'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const route = useRouter()
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handelFormSubmit = async (e) => {
        e.preventDefault()
        try {
            fetch("/api/register", {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 400) {
                        toast.error(data.messaage)
                    }
                    toast.success("login now")
                    return route.push("/page/login")
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className='w-full h-screen flex justify-center items-center '>
                <form onSubmit={handelFormSubmit} className='bg-white w-1/2 p-5 rounded-xl'>
                    <h1 className='text-center font-bold'>Sign up</h1>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="">Name</label>
                        <input className='bg-white border border-gray-400 px-2 py-1 rounded-md ' onChange={(e) => setName(e.target.value)} type="text" />
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="">Email</label>
                        <input className='bg-white border border-gray-400 px-2 py-1 rounded-md ' onChange={(e) => setEmail(e.target.value)} type="text" />
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor="">Password</label>
                        <input className='bg-white border border-gray-400 px-2 py-1 rounded-md ' onChange={(e) => setPassword(e.target.value)} type="password" />
                    </div>
                    <button className='w-full bg-purple-600 text-white font-bold py-2 cursor-pointer rounded-md'>Register</button>
                    <div className='flex items-center justify-center gap-2 my-4'>
                        <div className='h-[1px] w-full bg-slate-600' />
                        or
                        <div className='h-[1px] w-full bg-slate-600' />
                    </div>
                    <p className='text-sm text-center'>Already have an account <Link className='text-purple-600' href={"/page/login"}>log in</Link></p>
                </form>
            </div>
        </Layout>
    )
}

export default page