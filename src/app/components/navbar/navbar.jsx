import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='flex justify-between'>
            <h1>logo</h1>
            <div className='flex gap-2'>
                <Link href={""}>Home</Link>
                <Link href={""}>Package</Link>
                <Link href={""}>About us</Link>
            </div>
        </div>
    );
}

export default Navbar;
