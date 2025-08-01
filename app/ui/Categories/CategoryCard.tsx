import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface categoryCardProps {
    name: string
    imageURL: StaticImageData
    handleFilter: (term: string) => void
}

export default function CategoryCard(props: categoryCardProps) {
    return(
        <div>
            <button onClick={() => props.handleFilter(props.name.toLowerCase())}>
                <Image
                    width={100}
                    height={100}
                    className='rounded-full hover:scale-125 transform transition duration-500'
                    src={props.imageURL}
                    alt={`${props.name} category icon`}
                />
                <h1 className='text-center text-base font-medium tracking-wide mt-2'>{props.name}</h1>
            </button>
        </div>
    )
}