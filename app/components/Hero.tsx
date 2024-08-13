import React from 'react'
import heroimage from '@/public/heroImage.jpg'
import Image from "next/image"
import { lusitana } from '@/app/ui/fonts'

export default function Hero(){
    return(
        <div className='relative'>
            <Image
                className='w-full h-auto'
                src={heroimage}
                alt={"Image of three tacos"}
            />
            <div className={`absolute inset-0 flex flex-col justify-center items-start p-4 `}>
                <h1 className="text-7xl font-bold tracking-widest text-white p.with-eight">Australia's Best Mexican Food</h1>
                <button className='bg-green-500 hover:bg-green-50 hover:text-black text-white rounded-xl font-semibold shadow-lg p-2 mt-8'>
                    Order Now
                </button>
            </div>
        </div>
    )
}