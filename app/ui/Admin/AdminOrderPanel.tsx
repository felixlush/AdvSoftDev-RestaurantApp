'use client'
import React, { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { Order } from '@/app/lib/definitions'
import OrderViewPanel from '../Account/Dashboard/OrderViewPanel'
import Bars from 'react-loading-icons/dist/esm/components/bars'

const AdminOrderPanel = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [isOrderPanelOpen, setOrderPanelOpen] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isOrderViewOpen, setOrderViewOpen] = useState<boolean>(false);

    const paymentOptions = [
        {value: "pending", label: "Pending"},
        {value: "paid", label: "Paid"},
        {value: "refunded", label: "Refunded"}
    ]
    
    const statusOptions = [
        {value: "in progress", label: "In Progress"},
        {value: "completed", label: "Completed"},
        {value: "cancelled", label: "Cancelled"}
    ]

    const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/orders/`, {
                method: 'GET' 
            });
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
    
    
    useEffect(() => {
        fetchOrders()
    }, [])

    const updateOrder = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedOrder){
            alert("No Order selected")
            return
        }

        try {
            const response = await fetch(`api/orders/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedOrder)
            })
            const data = await response.json();
            setSelectedOrder(null);
            closeOrderEditPanel();
            fetchOrders();

        } catch (e) {
            console.log("Couldn't update orders: " , e)
            setLoading(false);
        }
    }

    if (loading) {
        return <div><Bars/></div>; 
    }

    function openOrderEditPanel(order: Order){
        setSelectedOrder(order);
        setOrderPanelOpen(true);
    }

    function closeOrderEditPanel(){
        setOrderPanelOpen(false);
        setSelectedOrder(null);
    }

    function openOrderViewPanel(order: Order){
        setSelectedOrder(order);
        setOrderViewOpen(true);
    }

    function closeOrderViewPanel(){
        setOrderViewOpen(false);
        setSelectedOrder(null);
    }


    return (
        <section>

            {/* Order Table */}
            <div className="flex justify-center p-10">
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full overflow-x-auto">
                <h1 className="font-semibold p-5 tracking-widest">Customer Orders</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercas ">Order ID</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercas ">User ID</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Total Price</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Payment Status</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Order Status</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Edit</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">View Order</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders && orders.length > 0 ? (orders.map(order => (
                                <tr key={order.order_id} className='p-2 border-b justify-evenly hover:bg-gray-100'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.order_id}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.user_id == null ? "Guest" : order.user_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.created_at.split("T", 1)}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.total_amount}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.payment_status}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{order.order_status}</td>
                                    <td>
                                        <button 
                                        className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
                                        text-green-700 hover:text-green-800 
                                        focus:outline-none focus:text-green-800 
                                        disabled:opacity-50 disabled:pointer-events-none 
                                        dark:text-green-500 dark:hover:text-green-400 dark:focus:text-green-400'
                                        onClick={() => openOrderEditPanel(order)}
                                        >
                                        Update Order
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                        className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
                                        text-blue-600 hover:text-blue-800 
                                        focus:outline-none focus:text-blue-800 
                                        disabled:opacity-50 disabled:pointer-events-none 
                                        dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'
                                        onClick={() => openOrderViewPanel(order)}
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

            {/* Order Edit Popup */}
            {isOrderPanelOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <div className='flex'>
                            <h2 className="text-2xl font-bold mb-4 mr-auto">Update Order</h2>
                        </div>
                        <form onSubmit={updateOrder}>
                            <div className="mb-4">
                                    <label className="block text-gray-700">Order Status</label>
                                    <select
                                        value={selectedOrder.order_status}
                                        onChange={(e) => setSelectedOrder({ ...selectedOrder, order_status: e.target.value})}
                                        className="border rounded-lg p-2 w-full"
                                    >
                                        <option value={""} disabled>Select status</option>
                                        <option value={"Recieved"}>Recieved</option>
                                        <option value={"Confirmed"}>Confirmed</option>
                                        <option value={"Completed"}>Completed</option>
                                        <option value={"Cancelled"}>Cancelled</option>
                                    </select>    
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Payment Status</label>
                                    <select
                                        value={selectedOrder.payment_status}
                                        onChange={(e) => setSelectedOrder({ ...selectedOrder, payment_status: e.target.value})}
                                        className="border rounded-lg p-2 w-full"
                                    >
                                        <option value={""} disabled>Select payment status</option>
                                        <option value={"Pending"}>Pending</option>
                                        <option value={"Paid"}>Paid</option>
                                        <option value={"Refunded"}>Refunded</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={closeOrderEditPanel} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
                                </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Order View Popup */}
            {isOrderViewOpen && selectedOrder && (
                <OrderViewPanel order={selectedOrder} closeOrderPanel={closeOrderViewPanel}/>
            )}
        </section> 
    )
}

export default AdminOrderPanel