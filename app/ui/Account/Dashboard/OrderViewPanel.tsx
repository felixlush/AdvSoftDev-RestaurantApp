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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex grid-cols-2 grid-rows-4 items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h1>Order: {props.order.order_id}</h1>
                <div>
                    {orderItems.map(orderItem => (
                        <div className='flex-col p-5 justify-evenly overflow-y-auto overflow-x-auto'>
                            <p>Quantity: {orderItem.quantity}</p>
                            {orderItem.image_url && (
                                <img src={orderItem.image_url} alt={orderItem.item_name} className="rounded-md mt-2 max-h-10" />
                            )}
                            <p>{orderItem.item_name}</p>
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