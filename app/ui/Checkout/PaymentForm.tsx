import { PaymentMethod } from '@/app/lib/definitions'
import React, { useEffect, useState } from 'react'

interface paymentFormProps{
    paymentMethod: PaymentMethod
    setPaymentMethod: (updatedPaymentMethod: PaymentMethod) => void
    errors: any
    hideCardNumber: boolean
}

const PaymentForm = (props: paymentFormProps) => {

    return (
        <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-black mb-4">
                Card Details
            </h2>
            <div className="p-4 bg-white rounded-lg shadow-md">
            <form className="space-y-6">
                {props.hideCardNumber && 
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Name On Card:
                        <input
                            type="text"
                            value={props.paymentMethod.card_holder_name}
                            onChange={(e) => props.setPaymentMethod({...props.paymentMethod, card_holder_name: e.target.value})}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        {props.errors.cardName && <p className="mt-2 text-sm text-red-600">{props.errors.cardName}</p>}
                    </label>
                }
                    {props.hideCardNumber && 
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Card Number:
                        <input
                            type="text"
                            value={props.paymentMethod.card_number}
                            onChange={(e) => props.setPaymentMethod({...props.paymentMethod, card_number: e.target.value})}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        {props.errors.cardNum && <p className="mt-2 text-sm text-red-600">{props.errors.cardNum}</p>}
                        </label>
                    }
                    
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Security Code:
                    <input
                        type="text"
                        value={props.paymentMethod.security_code}
                        onChange={(e) => props.setPaymentMethod({...props.paymentMethod, security_code: e.target.value})}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.securityCode && <p className="mt-2 text-sm text-red-600">{props.errors.securityCode}</p>}
                    </label>
                    {props.hideCardNumber && 
                        <div className='flex-col'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                            Expiry Date:
                            <input
                                type="text"
                                value={props.paymentMethod.expiry_date}
                                onChange={(e) => props.setPaymentMethod({...props.paymentMethod, expiry_date: e.target.value})}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                            />
                            {props.errors.expiryDate && <p className="mt-2 text-sm text-red-600">{props.errors.expiryDate}</p>}
                            </label>
                            <br />
                        </div>
                    }
                    <br /> 
                </form>
            </div>
        </div>
)}

export default PaymentForm