import React, { useState } from 'react'
import { User } from '@/app/lib/definitions'

interface deliveryDetailsProps{
    user: User
    setUser: (updatedUser: User) => void
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
                        value={props.user.name}
                        onChange={(e) => props.setUser({...props.user, name: e.target.value})}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.name && <p className="mt-2 text-sm text-red-600">{props.errors.name}</p>}
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email:
                    <input
                        type="text"
                        value={props.user.email}
                        onChange={(e) => props.setUser({...props.user, email: e.target.value})}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    {props.errors.email && <p className="mt-2 text-sm text-red-600">{props.errors.email}</p>}
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Address:
                    <input
                        type="text"
                        value={props.user.address}
                        onChange={(e) => props.setUser({...props.user, address: e.target.value})}
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
                            value={props.user.postcode}
                            onChange={(e) => props.setUser({...props.user, postcode: e.target.value})}
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
                            value={props.user.telephone}
                            onChange={(e) => props.setUser({...props.user, telephone: e.target.value})}
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