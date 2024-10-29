'use client'
import React, { useEffect, useState } from 'react'
import { PaymentMethod, User } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

const PaymentMethods = (props: {userId: number}) => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(); 
    const [editPanelOpen, setEditPanelOpen] = useState<boolean>(false);
    const [addPaymentPanelOpen, setAddPaymentPanelOpen] = useState<boolean>(false);
    const router = useRouter();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [paymentFormData, setPaymentFormData] = useState<PaymentMethod>({
        user_id: props.userId,
        payment_method_id: 0,
        card_holder_name: "",
        card_number: "",
        expiry_date: "",
        security_code: "",
        method_name: "",
        last_four_digits: ""
    });

    const fetchPaymentMethods = async () => {
        const response = await fetch(`/api/users/${props.userId}/paymentMethods`)
        const data = await response.json();
        console.log(data.paymentMethods)
        setPaymentMethods(data.paymentMethods)
    }
    
    const deletePayment = async (payment_method_id: number | null) => {
        try {
            const response = await fetch(`/api/paymentMethods/${payment_method_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok){
                fetchPaymentMethods();
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to delete payment');
            }
        } catch(err) {
            console.error("Database Error: ", err);
            alert('An unexpected error occurred');
        }
    }

    const validate = () => {

        const newErrors: { [key: string]: string } = {}

        if (!paymentFormData.card_holder_name.trim()) {
            newErrors.name = "Name is required!";
        }

        if (!paymentFormData.expiry_date.trim()) {
            newErrors.expiry = "Expiry is required";
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentFormData.expiry_date.trim())){
            newErrors.expiry = "Expiry must be in MM/YY format";
        }
        
        if (!paymentFormData.card_number) {
            newErrors.cardNum = "Card Number is Required!";
        } else if (!/^\d{13,19}$/.test(paymentFormData.card_number)){
            newErrors.cardNum = "Invalid Card Number!";
        }

        if (!paymentFormData.security_code) {
            newErrors.secCode = "Security code is required!";
        } if (paymentFormData.security_code.length != 3) {
            newErrors.secCode = "Invalid security code";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleAddPaymentPanel = () => {
        console.log("opening payment panel");
        setAddPaymentPanelOpen(!addPaymentPanelOpen);
    }

    const addPayment = async (e: React.FormEvent) => {

        setErrors({});

        e.preventDefault()

        if(!validate()){
            return;
        }

        try {
            const response = await fetch(`/api/users/${props.userId}/paymentMethods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentFormData)
            })

            if (response.ok){
                fetchPaymentMethods();
                toggleAddPaymentPanel()
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to add payment');
            }

        } catch(err) {
            console.error("Database Error: " , err)
            alert('An unexpected error occurred');
        }
    }

    useEffect(() => {
        if (props.userId) {fetchPaymentMethods()}
    }, [props.userId])

    return (
        <div>
            <div className="flex justify-center p-10">
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full overflow-auto">
                    <div className='flex'>
                        <h1 className='mb-10 font-semibold p-5 tracking-widest'>Payment Methods</h1>
                        
                        <div className="ml-auto p-4">
                            <button className="p-2 bg-green-500 text-white font-semibold rounded-md" onClick={() => toggleAddPaymentPanel()}>Add Payment</button>
                        </div>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercas ">Type</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name On Card</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Last 4 Digits</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Expiry</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paymentMethods && paymentMethods.length > 0 ? (paymentMethods.map(paymentMethod => (
                                <tr key={paymentMethod.payment_method_id} className='p-2 border-b justify-evenly hover:bg-gray-100'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{paymentMethod.method_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{paymentMethod.card_holder_name}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{paymentMethod.last_four_digits}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{paymentMethod.expiry_date}</td>
                                    <td>
                                        <button 
                                        className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
                                        text-red-600 hover:text-red-800 
                                        focus:outline-none focus:text-red-800 
                                        disabled:opacity-50 disabled:pointer-events-none 
                                        dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400'
                                        onClick={() => deletePayment(paymentMethod.payment_method_id)}
                                        >
                                        Delete Method
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
            {addPaymentPanelOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <div className='flex'>
                        <h2 className="text-2xl font-bold mb-4 mr-auto">Add Payment Method</h2>
                        </div>
                        <form onSubmit={addPayment}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Type</label>
                                <input
                                    type="text"
                                    onChange={(e) => setPaymentFormData({ ...paymentFormData, method_name: e.target.value })}
                                    value={paymentFormData.method_name}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name On Card</label>
                                <input
                                    type="text"
                                    value={paymentFormData.card_holder_name}
                                    onChange={(e) => setPaymentFormData({ ...paymentFormData, card_holder_name: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Card Number</label>
                                <input
                                    type="text"
                                    value={paymentFormData.card_number}
                                    onChange={(e) => setPaymentFormData({ ...paymentFormData, card_number: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {errors.cardNum && <p className="mt-2 text-sm text-red-600">{errors.cardNum}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Expiry</label>
                                <input
                                    type="text"
                                    value={paymentFormData.expiry_date}
                                    className="border rounded-lg p-2 w-full"
                                    onChange={(e) => setPaymentFormData({ ...paymentFormData, expiry_date: e.target.value })}
                                />
                                {errors.expiry && <p className="mt-2 text-sm text-red-600">{errors.expiry}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Security Code</label>
                                <input
                                    type="text"
                                    value={paymentFormData.security_code}
                                    onChange={(e) => setPaymentFormData({ ...paymentFormData, security_code: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {errors.secCode && <p className="mt-2 text-sm text-red-600">{errors.secCode}</p>}
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={toggleAddPaymentPanel} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Method</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentMethods