'use client'
import React, { useEffect, useState } from 'react'
import { PaymentMethod } from '@/app/lib/definitions';

const PaymentMethods = (props: {userId: number}) => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(); 
    const [editPanelOpen, setEditPanelOpen] = useState<boolean>(false);
    
    const openPaymentPanel = (paymentMethod: PaymentMethod) => {

    }

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            const response = await fetch(`/api/users/${props.userId}/paymentMethods`)
            const data = await response.json();
            console.log(data.paymentMethods)
            setPaymentMethods(data.paymentMethods)
        }
        if (props.userId) {fetchPaymentMethods()}
    }, [props.userId])

    return (
        <div>
            <div className="flex justify-center p-10">
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full">
                    <h1 className='mb-10 font-semibold p-5 tracking-widest'>Payment Methods</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercas ">Type</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name On Card</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Last 3 Digits</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Expiry</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paymentMethods && paymentMethods.length > 0 ? (paymentMethods.map(paymentMethod => (
                                <tr key={paymentMethod.payment_method_id} className='p-2 border-b justify-evenly hover:bg-gray-100'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{paymentMethod.method_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{paymentMethod.card_holder_name}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{paymentMethod.card_number}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{paymentMethod.expiry_date}</td>
                                    <td>
                                        <button 
                                        className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
                                        text-blue-600 hover:text-blue-800 
                                        focus:outline-none focus:text-blue-800 
                                        disabled:opacity-50 disabled:pointer-events-none 
                                        dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'
                                        onClick={() => openPaymentPanel(paymentMethod)}
                                        >
                                        Update Method
                                        </button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <p className="p-4">No Methods Found</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethods