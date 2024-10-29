'use client'
import { MenuItem } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react'
import MenuSearch from '../Menu/MenuSearch';

const AdminMenuPanel = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>();
    const [editPanelOpen, setEditPanelOpen] = useState<boolean>(false);
    const [addPanelOpen, setAddPanelOpen] = useState<boolean>(false);
    const [newMenuItem, setNewMenuItem] = useState<MenuItem | null>({
        item_id: 0,
        item_name: "",
        description: "",
        price: "",
        category: "",
        available: false,
        image_url: ""
    })

    const handleSearch = async (term: string) => {
        const response = await fetch(`/api/menu?search=${term}`);
        const data = await response.json();
        // console.log('API Response:', data)
        setMenuItems(data.menuItems || []);  
    };

    useEffect(() => {
        handleSearch('');  // Fetch all menu items initially
    }, []);

    const openEditPanel = (item: MenuItem) => {
        setSelectedItem(item);
        setEditPanelOpen(true);
    }

    const toggleAddPanel = () => {
        setAddPanelOpen(!addPanelOpen);
    }

    const closeEditPanel = () => {
        setEditPanelOpen(false);
        setSelectedItem(null);
    }

    const updateItem = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(JSON.stringify(selectedItem))
        const response = await fetch(`/api/menu/${selectedItem?.item_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedItem)
        })

        if(response.ok){
            closeEditPanel()
            handleSearch('')
        }
    }

    const deleteItem = async (item_id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        console.log("Item id at front end is: " , item_id);
        try {
            const response = await fetch(`/api/menu/${item_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.ok) {
                handleSearch(''); // Refresh the menu items after deletion
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('An unexpected error occurred');
        }
    };
    

    const addMenuItem = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/menu/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenuItem)
        })

        if(response.ok){
            toggleAddPanel()
            setNewMenuItem(null)
            handleSearch('')
        }
    }

    return (
        <section>

            {/* Main Menu panel */}
            <div className='flex justify-center p-10'>
                <div className='border rounded-lg p-4 shadow hover:shadow-lg transition w-full'>
                    <div className='flex p-5'>
                        <h1 className='font-bold tracking-wide text-xl p-2 mr-auto'>Menu Panel</h1>
                        <button className='rounded-md p-2 bg-green-700 text-white' onClick={toggleAddPanel}>Add Item</button>
                    </div>
                    <div><MenuSearch onSearch={handleSearch}/></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <div key={item.item_id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                                    {item.image_url && (
                                        <img src={item.image_url} alt={item.item_name} className="w-full h-32 object-cover rounded-md mt-2" />
                                    )}
                                    <p>Item ID: {item.item_id}</p>
                                    <h2 className="text-lg font-bold">{item.item_name}</h2>
                                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                                    <div className='flex space-x-3'>
                                        <div className='ml-auto'>
                                            <button onClick={() => openEditPanel(item)} className='justify-self-end bg-blue-700 text-white rounded-md p-2'>Edit</button>    
                                        </div>
                                        <div className='flex'>
                                            <button onClick={() => deleteItem(item.item_id)} className='justify-self-end bg-red-700 text-white rounded-md p-2'>Delete</button>    
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No menu items found</p>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Pop up edit menu */}
            {editPanelOpen && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <div className='flex'>
                        <h2 className="text-2xl font-bold mb-4 mr-auto">Edit Product</h2>
                        <p className='text-gray-400'>Item ID: {selectedItem.item_id}</p>
                        </div>
                        <form onSubmit={updateItem}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={selectedItem.item_name}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, item_name: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    value={selectedItem.description}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <input
                                    type="number"
                                    value={selectedItem.price}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image</label>
                                <input
                                    value={selectedItem.image_url}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, image_url: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Category</label>
                                <input
                                    type='select'
                                    value={selectedItem.category}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="mb-6 flex">
                                <label className="block text-gray-700">Avaliable</label>
                                <input
                                    type='checkbox'
                                    checked={selectedItem.available || false}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, available: e.target.checked })}
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

            {addPanelOpen && newMenuItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <div className='flex'>
                            <h2 className="text-2xl font-bold mb-4 mr-auto">Add New Item</h2>
                        </div>
                        <form onSubmit={addMenuItem}>
                            <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={newMenuItem.item_name}
                                        onChange={(e) => setNewMenuItem({ ...newMenuItem, item_name: e.target.value })}
                                        className="border rounded-lg p-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Description</label>
                                    <textarea
                                        value={newMenuItem.description}
                                        onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                                        className="border rounded-lg p-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        value={newMenuItem.price}
                                        onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                                        className="border rounded-lg p-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Image</label>
                                    <input
                                        value={newMenuItem.image_url}
                                        onChange={(e) => setNewMenuItem({ ...newMenuItem, image_url: e.target.value })}
                                        className="border rounded-lg p-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Category</label>
                                    <input
                                        type='select'
                                        value={newMenuItem.category}
                                        onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                                        className="border rounded-lg p-2 w-full"
                                    />
                                </div>
                                <div className="mb-6 flex">
                                    <label className="block text-gray-700">Avaliable</label>
                                    <input
                                        type='checkbox'
                                        checked={newMenuItem.available || false}
                                        onChange={(e) => setNewMenuItem({ ...newMenuItem, available: e.target.checked })}
                                        className="border rounded-lg p-2 w-full"
                                    />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={toggleAddPanel} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
                                </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};


export default AdminMenuPanel