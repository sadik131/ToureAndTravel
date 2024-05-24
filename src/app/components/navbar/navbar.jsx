"use client"
import { fetchUserAsync, logOut, selectUser } from '@/app/globalRedux/auth/authSlice';
import { getPackageAsync } from '@/app/globalRedux/package/packageSlice';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch()

    const { data } = useSession()
    useEffect(() => {
        dispatch(getPackageAsync())
        if (data && data.user) {
            dispatch(fetchUserAsync(data.user))
        }
    }, [data?.user, dispatch])

    const user = useSelector(selectUser)

    const handelLogOut = async (e) => {
        e.preventDefault()
        await signOut()
        dispatch(logOut())
    }
    return (
        <div className='flex justify-between py-6 px-8 fixed z-10 rounded-md bg-white w-[95%] mx-5 my-5 top-0'>
            <h1>logo</h1>
            <div className='flex gap-2'>
                <Link href={"/"}>Home</Link>
                <Link href={"/page/packagePage"}>Package</Link>
                <Link href={""}>About us</Link>
                {
                    user ? (
                        user.role === "admin" ? (
                            <>
                                <Link href={"/page/AllOrder"}>admin</Link>
                                <button onClick={handelLogOut}>log out</button>
                            </>
                        ) : (
                            <>
                                <Link href={"/page/profile"}>profile</Link>
                                <button onClick={handelLogOut}>log out</button>
                            </>
                        )
                    ) : (
                        <Link href={"/page/login"}>login</Link>
                    )
                }

            </div>
        </div>
    );
}

export default Navbar;
