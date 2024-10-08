'use client'
import { UUID } from 'crypto'
import React, { useState } from 'react'
import Image from "next/image"
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { useCart } from '../context/CartContext';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';


interface cartProps{
    closeCart: ()=>void,
    cartOpen: Boolean
}



export default function Cart(props: cartProps){

    const{cartItems, removeFromCart, updateItemQuantity, getTotal} = useCart();
    const router = useRouter()
    
    const total = getTotal();
    

    const handleIncrement = (itemId: number ) => {
        const item = cartItems.find((item) => item.product.item_id === itemId)
        if (item) {
            updateItemQuantity(itemId, item.quantity + 1)
        }
    }

    const handleDecrement = (itemId: number ) => {
        const item = cartItems.find((item) => item.product.item_id === itemId)
        if (item && item.quantity > 1) {
            updateItemQuantity(itemId, item.quantity - 1)
        }
    }

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return(
        <div className={`flex flex-col fixed left-0 top-10 z-30 bg-gray-200 py-8 md:py-16  rounded-md  h-3/4 w-1/3 shadow-2xl overflow-scroll `}>
            <div className=''>
                <div className='flex justify-end px-4'>
                    <button onClick={props.closeCart}>
                        <IoMdClose size={24}/>
                    </button>
                </div>
            </div>

            <div className='px-6'>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-black sm:text-2xl mb-10">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>No Items In Cart</p>
                ) : (
                cartItems.map((cartItem) => (
                    <div className='flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-md'>
                        <div className='w-1/3'>
                            <Image
                                src={cartItem.product.image_url}
                                width={100}
                                height={100}
                                alt={`${cartItem.product.item_name} Cart item icon`}
                            />
                        </div>

                        
                        <div className='flex flex-col w-2/3 pl-4'>
                            <h2 className='font-medium'>{cartItem.product.item_name}</h2>
                            <p className='font-light text-sm text-gray-500'>{cartItem.product.description}</p>
                            
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-gray-900 font-semibold">
                                        ${cartItem.quantity * parseFloat(cartItem.product.price)}
                                </p>
                                <div className='flex items-center space-x-2'>
                                    <button onClick={() => handleIncrement(cartItem.product.item_id)}>
                                        <FiPlus size={10}/>
                                    </button>
                                    <p className="font-medium text-green-600">
                                        {cartItem.quantity}
                                    </p>
                                    <button onClick={() => handleDecrement(cartItem.product.item_id)}>
                                        <FiMinus size={10}/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button className='text-lime-600 hover:text-lime-500 transition ml-4' onClick={() => removeFromCart(cartItem.product.item_id)}>
                            <IoMdClose />
                        </button>
                    </div>
                    
                )))}
            </div>
            {cartItems.length > 0 &&
                <div className='flex items-center justify-between pl-10 pr-10'>
                    ${total} 
                    <button onClick={() => handleCheckout()} className='ml-auto rounded-lg bg-green-500 p-2 text-white font-bold'>Check Out</button>
                </div>
            }   
        </div>
    )
}