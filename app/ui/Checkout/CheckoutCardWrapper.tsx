'use client'
import Cart from '@/app/components/Cart';
import { useCart } from '@/app/context/CartContext';
import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import router from 'next/router';
import CheckoutCard from './CheckoutCard';
import DeliveryDetails from './DeliveryDetails';
import PaymentForm from './PaymentForm';

const CheckoutCardWrapper = () => {

    const { cartItems, removeFromCart, updateItemQuantity, getTotal } = useCart();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [telephone, setTelephone] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newErrors, setNewErrors] = useState<{ [key: string]: string }>({});
    const [cardNum, setCardNum] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('')

    const total = getTotal();

    const handleIncrement = (itemId: number) => {
        const item = cartItems.find((item) => item.product.item_id === itemId);
        if (item) {
            updateItemQuantity(itemId, item.quantity + 1);
        }
    };

    const handleDecrement = (itemId: number) => {
        const item = cartItems.find((item) => item.product.item_id === itemId);
        if (item && item.quantity > 1) {
            updateItemQuantity(itemId, item.quantity - 1);
        }
    };

    const validate = () => {
        if (!name.trim()) {
            newErrors.name = "Name is required!";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = "Invalid email address";
        }

        if (!address.trim()) {
            newErrors.address = "Address is required!";
        }

        if (!postcode.trim()) {
            newErrors.postcode = "Postcode is required!";
        }

        if (!telephone.trim()) {
            newErrors.telephone = "Phone number is required!";
        }

        if (!securityCode.trim()) {
            newErrors.securityCode = "Security Code is required!";
        }

        if (!cardNum.trim()) {
            newErrors.cardNum = "Card Number is required!";
        } 
        // else if (!/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})[\s-]*$/.test(cardNum)){
        //     newErrors.cardNum = "Invalid Card Number";
        // }

        if (!expiryDate.trim()) {
            newErrors.expiryDate = "Expiry Date is required!";
        }

        if (!cardName.trim()) {
            newErrors.cardName = "Card Name is required!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const res = await fetch('/api/order/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    address,
                    postcode,
                    telephone,
                })
            });

            if (res.ok) {
                router.push('/login');
            } else {
                console.log(await res.json());
            }
        } catch (error) {
            console.error('Error during order submission:', error);
        }
    };

    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const response = await fetch('/api/auth/verify');
                const data = await response.json();

                if (response.ok && data) {
                    setAddress(data.user.address);
                    setName(data.user.name);
                    setEmail(data.user.email);
                    setPostcode(data.user.postcode);
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };
        fetchUserSession();
    }, []);

    return (
        <div className="flex-col justify-center p-10">
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full bg-gray-100">
                {cartItems.length !== 0 ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-black mb-6">
                            Checkout
                        </h2>
                        <div className="flex md:flex-row gap-10">
                            <div className="w-full md:w-1/2">
                                <CheckoutCard 
                                    handleIncrement={handleIncrement}
                                    handleDecrement={handleDecrement}
                                    removeFromCart={removeFromCart}
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-1/2 space-y-6">
                                <div className="mb-10">
                                    <DeliveryDetails
                                        name={name}
                                        setName={setName}
                                        address={address}
                                        setAddress={setAddress}
                                        postcode={postcode}
                                        setPostcode={setPostcode}
                                        telephone={telephone}
                                        setTelephone={setTelephone}
                                        errors={errors}
                                        email={email}
                                        setEmail={setEmail}
                                    />
                                </div>
                                <PaymentForm 
                                    cardName={cardName}
                                    setCardName={setCardName}
                                    cardNum={cardNum}
                                    setCardNum={setCardNum}
                                    securityCode={securityCode}
                                    setSecurityCode={setSecurityCode}
                                    expiryDate={expiryDate}
                                    setExpiryDate={setExpiryDate}
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="p-3 mt-10 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-1/3 justify-end rounded-lg bg-green-500 p-3 text-white font-semibold hover:bg-green-600"
                            >
                                {isLoading ? 'Submitting...' : 'Submit Order'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-black mb-6">
                            Checkout
                    </h2>
                    <h2 className="text-xl text-gray-900 dark:text-black mb-6">
                            No Items in cart : (
                    </h2>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutCardWrapper;
