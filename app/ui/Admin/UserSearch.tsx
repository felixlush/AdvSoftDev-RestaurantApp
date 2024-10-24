import { User } from '@/app/lib/definitions';
import React, { use } from 'react'
import { useState } from 'react';

interface UserSearchProps {
    onSearch: (searchTerm: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [customerBool, setCustomerBool] = useState<boolean>(true);
    const [adminBool, setAdminBool] = useState<boolean>(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    }

    // const handleAdminCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(searchTerm + " admin");
    // }

    // const handleCustomerCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(searchTerm + " admin");
    // }

    return (
        <div className="flex justify-center my-4 md:flex-row">
        <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleInputChange}
            className="border rounded-l-md p-2 w-1/2 mr-10 "
        />
        {/* <div className='mr-5'>
            <input
                type="checkbox"
                id="admin"
                name="admin"
                onChange={handleAdminCheckBoxChange}
            />
            <label className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500' htmlFor="admin">Admin</label>
        </div>
        <div>
            <input
                type="checkbox"
                id="customer"
                name="customer"
                onChange={handleCustomerCheckBoxChange}
            />
            <label className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500' htmlFor="customer">Customer</label>
        </div> */}
        </div>
    );
}

export default UserSearch

