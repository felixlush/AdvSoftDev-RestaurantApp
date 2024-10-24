import { Order, OrderItem } from '@/app/lib/definitions'
import React, { useEffect, useState } from 'react'
import Image from "next/image"

interface OrderViewProps{
    closeOrderPanel: () => void
    order: Order
}

export default function OrderViewPanel(props: OrderViewProps) {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    let total = 0;

    const fetchOrderDetails = async () => {
        const response = await fetch(`/api/orderItems/${props.order.order_id}`);
        const data = await response.json();
        // console.log('API Response:', data)
        setOrderItems(data.orderItems || []); 
    }

    useEffect(() => {
        fetchOrderDetails()
        console.log("Fetching order items")
        console.log(orderItems)
    }, [props.order.order_id])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 h-3/5 overflow-scroll">
                <div className='flex justify-evenly'>
                    <h1 className='font-bold text-lg p-4'>Order ID: {props.order.order_id}</h1>
                    <p className='text-gray-400'>Date: {props.order.created_at.split("T", 1)}</p>
                </div>
                <div className='gap-4'>
                    {orderItems.map(orderItem => (
                    <div className='flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-md'>
                        <div className='w-1/3'>
                            {orderItem.image_url && (
                                <Image
                                src={orderItem.image_url}
                                width={100}
                                height={100}
                                alt={`${orderItem.item_name} Cart item icon`}
                                />
                            )}
                        </div>

                        <div className='flex flex-col w-2/3 pl-4'>
                            <h2 className='font-medium'>{orderItem.item_name}</h2>
                            <p className='font-light text-sm text-gray-500'>{orderItem.description}</p>
                            
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-gray-900 font-semibold">
                                        ${orderItem.quantity * orderItem.price}
                                </p>
                                {total += orderItem.quantity * orderItem.price}
                                <div className='flex items-center space-x-2'>
                                    <p className="font-medium text-green-600">
                                        x {orderItem.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    ))}
                </div>
                <div className="flex justify-start">
                    <h1>Total: ${total}</h1>
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={props.closeOrderPanel} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    )
}