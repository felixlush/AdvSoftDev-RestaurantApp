import React from 'react'
import heroimage from '@/public/heroImage.jpg'
import Image from "next/image"

export default function HeroImage() {
    return(
        <div>
            <Image
                className='relative'
                src={heroimage}
                alt={"Image of three tacos"}
            />
        </div>
    )
}