'use client'
import React, { useEffect, useState } from 'react'
import UserSearch from '@/app/ui/Admin/UserSearch'
import { User } from '@/app/lib/definitions';
import { fetchAllUsers } from '@/app/lib/data';


const AdminUserPanel = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditPanelOpen, setUserPanelOpen] = useState<boolean>(false);

    const handleSearch = async (term: string) => {
        const response = await fetch(`/api/users?search=${term}`);
        const data = await response.json();
        setUsers(data.users);  
    };

    useEffect(() => {
        handleSearch('');  
    }, []);

    const openEditPanel = (item: User) => {
        setSelectedUser(item);
        setUserPanelOpen(true);
    }

    const deleteUser = async (id: number | null) => {
        confirm("Are you sure you want to delete this user")
        try{
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok){
                handleSearch('')
            } else {
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch(err) {
            console.error("Database Error: ", err);
            alert('An unexpected error occurred');
        }
    }

    const closeEditPanel = () => {
        setUserPanelOpen(false);
        setSelectedUser(null);
    }

    const updateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(JSON.stringify(selectedUser))
        const response = await fetch(`/api/users/${selectedUser?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedUser)
        })

        if(response.ok){
            closeEditPanel()
            handleSearch('')
        } else {
            console.log("Error, response: ", response.status)
        }
    }


    return (
        <section>
            <div className='flex justify-center p-10'>
                <div className='border rounded-lg p-4 shadow hover:shadow-lg transition w-full overflow-auto'>
                    <h1 className='font-bold tracking-wide text-xl p-5'>User Admin</h1>
                    <UserSearch onSearch={handleSearch}/>
                    <div className='mt-10 mb-4 border-gray-400 sm:overflow-x-auto lg:justify-evenly justify-center'>
                        {users.length > 0 ? (
                            <table className='divide-y divide-gray-200  ml-4 sm:ml-0 w-full'>
                                <thead>
                                    <tr>
                                        <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Name</th>
                                        <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Email</th>
                                        <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Address</th>
                                        <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase '>Type</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 ml-4'>
                                    {users.map(user => (
                                        <tr key={user.id} className='p-2 border-b justify-evenly hover:bg-gray-100 '>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{user.name}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{user.email}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{user.address}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{user.type}</td>
                                            <td>
                                                <button 
                                                    className='inline-flex items-center 
                                                    gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 
                                                    focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 
                                                    dark:hover:text-blue-400 dark:focus:text-blue-400'
                                                    onClick={() => openEditPanel(user)} >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                    className='inline-flex items-center 
                                                    gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 
                                                    focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 
                                                    dark:hover:text-blue-400 dark:focus:text-blue-400'
                                                    onClick={() => deleteUser(user.id)} >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No Users Found</p>
                        )} 
                    </div>
                    <button className='rounded-md p-2 bg-green-700 text-white ml-4'>Add New User</button>
                </div>
            </div>

            {isEditPanelOpen && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <div className='flex'>
                            <h2 className="text-2xl font-bold mb-4 mr-auto">Edit User</h2>
                            <p className='text-gray-400'>User ID: {selectedUser.id}</p>
                        </div>
                        <form onSubmit={updateUser}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={selectedUser.name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type='text'
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={selectedUser.address}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">PostCode</label>
                                <input
                                    value={selectedUser.postcode}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, postcode: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Type</label>
                                <input
                                    type='select'
                                    value={selectedUser.type}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, type: e.target.value })}
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

export default AdminUserPanel