'use client'
import { MenuItem } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react'
import MenuSearch from './MenuSearch';
import { useCart } from '@/app/context/CartContext';
import { FaPlus, FaMinus, FaCartShopping } from "react-icons/fa6";
import Categories from '@/app/components/Categories';

const MenuPanel = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState<boolean>(false);

    const handleSearch = async (term: string) => {
        const response = await fetch(`/api/menu?search=${term}`);
        const data = await response.json();
        console.log(data)
        setMenuItems(data.menuItems || []);  
    };

    useEffect(() => {
        handleSearch('');  // Fetch all menu items initially
    }, []);

    const handleAddToCart = (item: MenuItem) => {
        addToCart(item, 1);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000)
    };

    return (
        <section>
            <div><Categories handleFilter={handleSearch}/></div>
            <div><MenuSearch onSearch={handleSearch}/></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <div key={item.item_id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            {item.image_url && (
                                <img src={item.image_url} alt={item.item_name} className="w-full h-64 object-cover rounded-md mt-2" />
                            )}
                            <h2 className="text-lg font-bold">{item.item_name}</h2>
                            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                            
                            <div className='flex'>
                                <p className='text-green-600 font-semibold mr-auto'>${item.price}</p>
                                <div className='flex space-x-3'>
                                    <button className='justify-self-end bg-green-700 text-white rounded-md p-2 hover:bg-green-600' onClick={() => handleAddToCart(item)}>Add to cart</button> 
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No menu items found</p>
                )}
            </div>
            {/* Animated Cart Icon */}
            <button
                className={`fixed bottom-5 right-5 p-2 bg-green-500 rounded-full shadow-lg 
                    transition-transform transform ${addedToCart ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            >
                <p className="text-white font-semibold">Added to cart!</p>
            </button>
        </section>
    );
};


export default MenuPanel