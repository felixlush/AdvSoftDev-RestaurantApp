'use client'
import React from 'react'
import heroimage from '@/public/heroImage.jpg'
import Image from "next/image"
import { lusitana } from '@/app/ui/fonts'
import { useRouter } from 'next/navigation'

export default function Hero(){
    const router = useRouter()

    function onOrderClick(){
        router.push("/menu")
    }

    return(
        <section className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-center"
                style={{ backgroundImage: "url('https://www.thespruceeats.com/thmb/ereeBcFkDEbDT2VSlDe34sqXO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tinga-tinga-de-pollo-4773239-Hero_01-1bd1d960c02a4fdb812323b8c60fd55b.jpg" }} // Replace with a relevant image URL
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Tacos 2 U</h1>
                    <p className="text-lg md:text-2xl mb-6">Delicious meals, just a click away.</p>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg" onClick={onOrderClick}>
                        Order Now
                    </button>
                </div>
        </section>
        
    )
}