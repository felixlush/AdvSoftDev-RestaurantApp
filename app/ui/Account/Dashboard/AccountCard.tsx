'use client'
import React, { useEffect, useState } from "react";
import {User} from '@/app/lib/definitions'
import { getUserById } from "@/app/lib/data";
import { useRouter } from "next/navigation";

interface AccountCardProps{
    userId: number
}

export default function AccountCard(props: AccountCardProps){
    const [user, setUser] = useState<User | null>(null);
    const [editPanelOpen, setEditPanelOpen] = useState<boolean>(false);
    const router = useRouter()

    const updateUser = () =>{

    }

    const openEditPanel = (user: User) => {
        setEditPanelOpen(true);
    }

    const closeEditPanel = () => {
        setEditPanelOpen(false);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${props.userId}`)
            const data = await response.json();
            // console.log(data.user)
            setUser(data.user)
        }
        if (props.userId) {fetchUser()}
    }, [props.userId])

    return(
        <section>
            
            <div className="flex justify-center p-10">
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full">
                    <div>
                        {user ? (
                        <>
                        <div className="flex">
                            <div className="flex-col">
                                <h1 className="mb-10 font-semibold p-5 tracking-widest">My Details</h1>
                                <div className="p-4">
                                    <h2 className="mb-5">id: {user.id}</h2>
                                    <h2 className="mb-5">Name: {user.name}</h2>
                                    <h2 className="mb-5">Email: {user.email}</h2>
                                    <h2 className="mb-5">Address: {user.address}</h2>
                                    <h2 className="mb-5">PostCode: {user.postcode}</h2>
                                </div>
                            </div>

                            <div className="ml-auto p-4">
                                <button className="p-2 bg-green-500 text-white font-semibold rounded-md" onClick={() => openEditPanel(user)}>Edit Details</button>
                            </div>
                        </div>
                        </>
                        ) : (<p>User not found</p>)}
                    </div>
                </div>
            </div>
            {editPanelOpen && user && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <div className='flex'>
                        <h2 className="text-2xl font-bold mb-4 mr-auto">Edit Account Details</h2>
                        <p className='text-gray-400'>ID: {user.id}</p>
                        </div>
                        <form onSubmit={updateUser}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="text"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={user.address}
                                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">PostCode</label>
                                <input
                                    value={user.postcode}
                                    onChange={(e) => setUser({ ...user, postcode: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type='password'
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={closeEditPanel} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}