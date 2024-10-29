import React, { useState } from 'react';

interface MenuSearchProps {
    onSearch: (searchTerm: string) => void;
}

const MenuSearch: React.FC<MenuSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    }

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const bool = e.target.value;
    }

    const clearSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch("");
        setSearchTerm("");
    }

    return (
        <div className="flex justify-center my-4">
        <input
            type="text"
            placeholder="Search for items"
            value={searchTerm}
            onChange={handleInputChange}
            className="border rounded-l-md p-2 w-1/2 mr-10 "
        />
        <div>
            <button className='border-slate-600 border-solid bg-green-600 rounded-md text-white font-semibold p-2 hover:bg-green-500' onClick={clearSearch}>
                Clear Filters
            </button>
        </div>
        </div>
    );
}

export default MenuSearch;
