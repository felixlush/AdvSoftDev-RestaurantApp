import React from 'react'
import Image from 'next/image'
import logo from "@/public/logoNew.webp"
import Link from 'next/link'

export default function Footer(){
    return(
        <section className='flex justify-between mr-10 ml-10 mt-10 mb-10'>
            <div className='flex-row max-w-xs'>
                <Image
                    className=""
                    src={logo}
                    alt="Restaurant Logo"
                    width={50}
                    height={20}
                />
                <p className='italic font-light text-s'>Taco's 2 U, where we serve the most authentic mexican food in Australia</p>
            </div>
            {/* <div className='flex-row'>
                <h1 className='font-bold mb-3'>Useful Links</h1>
                <p>My Home</p>
                <p>My account</p>
                <p>About us</p>
                <p>FAQ</p>cs
            </div>
            <div className='flex-row'>
                <h1 className='font-bold mb-3'>Locations</h1>
                <p>Docklands</p>
                <p>Dullwich Hill</p>
                <p>Manly</p>
            </div> */}

        </section>
    )
}