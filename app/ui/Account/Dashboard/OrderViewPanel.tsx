import { Order, OrderItem } from '@/app/lib/definitions'
import React, { useEffect, useState } from 'react'

interface OrderViewProps{
    closeOrderPanel: () => void
    order: Order
}

export default function OrderViewPanel(props: OrderViewProps) {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    const fetchOrderDetails = async () => {
        const response = await fetch(`/api/orderItems/${props.order.order_id}`);
        const data = await response.json();
        // console.log('API Response:', data)
        setOrderItems(data.orderItems || []); 
    }

    useEffect(() => {
        fetchOrderDetails()
        console.log(orderItems)
    }, [])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 h-3/5 overflow-scroll">
                <div className='flex justify-evenly'>
                    <h1 className='font-bold text-lg'>Order ID: {props.order.order_id}</h1>
                    <p className='text-gray-400'>Date: {props.order.order_status}</p>
                </div>
                <div className='gap-4'>
                    {orderItems.map(orderItem => (
                        <div className='flex p-5 justify-evenly overflow-y-auto border rounded-lg shadow hover:shadow-lg transition gap-4'>
                            {orderItem.image_url && (
                                <img src={orderItem.image_url} alt={orderItem.item_name} className="rounded-md mt-2 max-h-20 mb-2" />
                            )}
                            <div className='flex-col'>
                                <p>{orderItem.item_name}</p>
                                <p className='text-sm text-gray-500 mt-4'>Quantity: {orderItem.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={props.closeOrderPanel} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    )
}