import React, { useState } from 'react'

interface deliveryDetailsProps{
    email: string,
    setEmail: (email: string) => void
    address: string,
    setAddress: (address: string) => void,
    name: string,
    setName: (name: string) => void,
    telephone: string,
    setTelephone: (telephone: string) => void,
    postcode: string,
    setPostcode: (postcode: string) => void,
    errors: any
}

const DeliveryDetails = (props: deliveryDetailsProps) => {

    return (
        <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-black mb-4">
                Delivery Details
            </h2>
            <div className="p-4 bg-white rounded-lg shadow-md">
            <form className="space-y-6">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name:
                    <input
                        type="text"
                        value={props.name}
                        onChange={(e) => props.setName(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.name && <p className="mt-2 text-sm text-red-600">{props.errors.name}</p>}
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email:
                    <input
                        type="text"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.email && <p className="mt-2 text-sm text-red-600">{props.errors.email}</p>}
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Address:
                    <input
                        type="text"
                        value={props.address}
                        onChange={(e) => props.setAddress(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.address && <p className="mt-2 text-sm text-red-600">{props.errors.address}</p>}
                    </label>
                    <div className='flex-col'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Post Code:
                        <input
                            type="text"
                            value={props.postcode}
                            onChange={(e) => props.setPostcode(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        {props.errors.postcode && <p className="mt-2 text-sm text-red-600">{props.errors.postcode}</p>}
                        </label>
                        <br />
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Phone Number:
                        <input
                            type="text"
                            value={props.telephone}
                            onChange={(e) => props.setTelephone(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        {props.errors.telephone && <p className="mt-2 text-sm text-red-600">{props.errors.telephone}</p>}
                        </label>
                    </div>
                    <br /> 
                </form>
            </div>
        </div>
    )
}

export default DeliveryDetails