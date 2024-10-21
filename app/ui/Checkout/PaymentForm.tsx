import React, { useState } from 'react'

interface paymentFormProps{
    cardNum: string
    securityCode: string
    cardName: string
    expiryDate: string
    setCardNum: (cardNum: string) => void
    setSecurityCode: (securityCode: string) => void
    setCardName: (cardName: string) => void
    setExpiryDate: (expiryDate: string) => void
    errors: any
}

const PaymentForm = (props: paymentFormProps) => {

    return (
        <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-black mb-4">
                Card Details
            </h2>
            <div className="p-4 bg-white rounded-lg shadow-md">
            <form className="space-y-6">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name On Card:
                    <input
                        type="text"
                        value={props.cardName}
                        onChange={(e) => props.setCardName(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.cardName && <p className="mt-2 text-sm text-red-600">{props.errors.cardName}</p>}
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Card Number:
                    <input
                        type="text"
                        value={props.cardNum}
                        onChange={(e) => props.setCardNum(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.cardNum && <p className="mt-2 text-sm text-red-600">{props.errors.cardNum}</p>}
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Security Code:
                    <input
                        type="text"
                        value={props.securityCode}
                        onChange={(e) => props.setSecurityCode(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.securityCode && <p className="mt-2 text-sm text-red-600">{props.errors.securityCode}</p>}
                    </label>
                    <div className='flex-col'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Expiry Date:
                        <input
                            type="text"
                            value={props.expiryDate}
                            onChange={(e) => props.setExpiryDate(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        {props.errors.expiryDate && <p className="mt-2 text-sm text-red-600">{props.errors.expiryDate}</p>}
                        </label>
                        <br />
                    </div>
                    <br /> 
                </form>
            </div>
        </div>
)}

export default PaymentForm