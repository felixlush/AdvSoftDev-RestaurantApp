'use client'
import React, { useEffect, useState } from 'react'
import UserSearch from '@/app/ui/Admin/UserSearch'
import { User } from '@/app/lib/definitions';


const AdminUserPanel = () => {
    const [users, setUsers] = useState<User[]>([]);

    const handleSearch = async (term: string) => {
        const response = await fetch(`/api/users?search=${term}`);
        const data = await response.json();
        setUsers(data.users);  
    };

    useEffect(() => {
        handleSearch('');  // Fetch all users initially
    }, []);


    return (
        <div className='flex justify-center p-10'>
            <div className='border rounded-lg p-4 shadow hover:shadow-lg transition w-full'>
                <h1 className='font-bold tracking-wide text-xl p-5'>User Admin</h1>
                <UserSearch onSearch={handleSearch}/>
                <div className='mt-10 mb-4 border-gray-400'>
                    {users.length > 0 ? (
                        <table className='min-w-full divide-y divide-gray-200 '>
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Name</th>
                                    <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Email</th>
                                    <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Address</th>
                                    <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Type</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {users.map(user => (
                                    <tr key={user.id} className='p-2 border-b justify-evenly hover:bg-gray-100 '>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{user.name}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{user.email}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{user.address}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{user.type}</td>
                                        <td><button className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'>Edit</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Users Found</p>
                    )} 
                </div>
                <button className='rounded-md p-2 bg-green-700 text-white'>Add New User</button>
            </div>
        </div>
    )
}

export default AdminUserPanel