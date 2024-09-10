import { UUID } from 'crypto'
import React, { useState } from 'react'
import Image from "next/image"

export default function Cart(props: {cartOpen: boolean}){

    interface Product {
        name: string
        price: number
        id: number
        image: string
    }
    
    interface ProductOrder{
        product: Product
        id: number
        quantity: number
        totalPrice: number
    }

    const productOrders: ProductOrder[] = [
        {
            product: {
                name: "Product name : Taco",
                price: 5.99,
                id: 1,
                image: "/public/tacoIcon.jpg"
            },
            id: 11,
            quantity: 2,
            totalPrice: 11.98
        },
        {
            product: {
                name: "Burrito",
                price: 8.99,
                id: 2,
                image: "/images/burrito.jpg"
            },
            id: 22,
            quantity: 1,
            totalPrice: 8.99
        },
        {
            product: {
                name: "Nachos",
                price: 7.49,
                id: 3,
                image: "/images/nachos.jpg"
            },
            id: 33,
            quantity: 3,
            totalPrice: 22.47
        },
        {
            product: {
                name: "Quesadilla",
                price: 6.75,
                id: 4,
                image: "/images/quesadilla.jpg"
            },
            id: 44,
            quantity: 1,
            totalPrice: 6.75
        }
    ];

    return(
        <div 
        // className={'bg-gray-200 py-8 antialiased md:py-16 z-50 rounded-md fixed h-3/4 mt-5 w-1/3 shadow-2xl ease-in-out'
        //     }>
        className={`fixed mt-5 z-30
                bg-gray-200
                py-8 antialiased md:py-16 
                rounded-md 
                h-3/4 w-1/3 
                shadow-2xl
                transition 
                duration-300 
                `}
                >
            <div className='mx-auto max-w-screen-xl px-4 2xl:px-0 m-auto opacity-100'>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-black sm:text-2xl mb-10">Shopping Cart</h2>
                {productOrders.map((productOrder) => (
                    <div className='flex gap-2'>
                        <Image
                            src={productOrder.product.image}
                            width={100}
                            height={100}
                            alt={`${productOrder.product.name} Cart item icon`}
                        />
                        <div className='flex-row'>
                            <h2 className='font-medium'>{productOrder.product.name}</h2>
                            <p className='font-light'>Description</p>
                            <p className='font-light'>Qty {productOrder.quantity}</p>
                        </div>
                        <div className='flex-row'>
                            ${productOrder.quantity * productOrder.product.price}
                            <button className='font-medium text-lime-600 hover:text-lime-500 mt-6'>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )

    

}