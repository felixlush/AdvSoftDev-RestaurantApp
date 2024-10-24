'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, CartItem } from '../lib/definitions';

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (product: MenuItem, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateItemQuantity: (itemId: number, amount: number) => void
    clearCart: () => void;
    getTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: MenuItem, quantity: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.item_id === product.item_id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.item_id === product.item_id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { product, quantity }];
            }
        });
    };

    const updateItemQuantity = (itemId: number, amount: number) => {
        setCartItems((prevItems) => 
            prevItems.map((item) => 
                item.product.item_id === itemId ? { ...item, quantity: amount} : item
            )
        );
    };

    const getTotal = () => {
        let sum = 0
        for (let i = 0; i < cartItems.length; ++i){
            sum += parseFloat(cartItems[i].product.price) * cartItems[i].quantity
        }
        return sum
    }


    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product.item_id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateItemQuantity, getTotal}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};