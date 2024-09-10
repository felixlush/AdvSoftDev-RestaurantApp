'use client'
import { Order } from "@/app/lib/definitions";
import React, { useEffect, useState } from "react";
import Bars from "react-loading-icons/dist/esm/components/bars";
import OrderViewPanel from "./OrderViewPanel";

interface orderIdProps{
    userId: number
}

export default function OrdersCard(props: orderIdProps){
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [isOrderPanelOpen, setOrderPanelOpen] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${props.userId}`);
                const data = await response.json();
                // console.log(data.orders);
                setOrders(data.orders);
                setLoading(false);
            }
            catch (e) {
                console.log("Couldn't get orders: " , e)
                setLoading(false);
            }
        }
        if (props.userId) {fetchOrder()}
    }, [props.userId])

    if (loading) {
        return <div><Bars/></div>; 
    }

    function openOrderPanel(order: Order){
        setSelectedOrder(order);
        setOrderPanelOpen(true);
    }

    function closeOrderPanel(){
        setOrderPanelOpen(false);
        setSelectedOrder(null);
    }

    return(
        <section>

            {/* Order Table */}
            <div className="flex justify-center p-10">
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full overflow-x-auto">
                <h1 className="font-semibold p-5 tracking-widest">My Orders</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercas ">ID</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Total Price</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">View</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.length > 0 ? (orders.map(order => (
                                <tr key={order.order_id} className='p-2 border-b justify-evenly hover:bg-gray-100'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.order_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.created_at.split("T", 1)}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.total_amount}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.payment_status}</td>
                                    <td>
                                        <button 
                                        className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
                                        text-blue-600 hover:text-blue-800 
                                        focus:outline-none focus:text-blue-800 
                                        disabled:opacity-50 disabled:pointer-events-none 
                                        dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'
                                        onClick={() => openOrderPanel(order)}
                                        >
                                        View Items
                                        </button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <p className="p-4">No Orders Found</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div> 

            {/* Order View Popup */}
            {isOrderPanelOpen && selectedOrder && (
                <OrderViewPanel order={selectedOrder} closeOrderPanel={closeOrderPanel}/>
            )}
        </section> 
    )
}