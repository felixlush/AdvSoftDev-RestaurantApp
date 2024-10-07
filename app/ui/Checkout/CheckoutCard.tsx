'use client'
import Cart from '@/app/components/Cart';
import { useCart } from '@/app/context/CartContext';
import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import router from 'next/router';

interface checkoutCardProps {
    handleIncrement: (itemId: number ) => void
    handleDecrement: (itemId: number ) => void
    removeFromCart: (itemId: number ) => void
}


const CheckoutCard = (props: checkoutCardProps) => {

    const { cartItems, getTotal, removeFromCart } = useCart();

    const total = getTotal();

    return (
        <div className="flex-1">
            <div className="space-y-4">
                {(cartItems.map((cartItem) => (
                        <div key={cartItem.product.item_id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                            <Image
                                src={cartItem.product.image_url}
                                width={100}
                                height={100}
                                alt={`${cartItem.product.item_name} Cart item icon`}
                                className="w-1/3 rounded-md"
                            />
                            <div className="flex flex-col w-2/3 pl-4">
                                <h3 className="font-medium">{cartItem.product.item_name}</h3>
                                <p className="font-light text-sm text-gray-500">{cartItem.product.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-gray-900 font-semibold">
                                        ${cartItem.quantity * parseFloat(cartItem.product.price)}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => props.handleIncrement(cartItem.product.item_id)}>
                                            <FiPlus size={14} />
                                        </button>
                                        <p className="font-medium text-green-600">{cartItem.quantity}</p>
                                        <button onClick={() => props.handleDecrement(cartItem.product.item_id)}>
                                            <FiMinus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="text-red-500 hover:text-red-700 transition ml-4" onClick={() => removeFromCart(cartItem.product.item_id)}>
                                <IoMdClose />
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold">Total: ${total}</p>
            </div>
        </div>
    );
};


export default CheckoutCard
