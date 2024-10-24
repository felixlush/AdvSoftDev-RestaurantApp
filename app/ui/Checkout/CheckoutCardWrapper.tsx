'use client'
import Cart from '@/app/components/Cart';
import { useCart } from '@/app/context/CartContext';
import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CheckoutCard from './CheckoutCard';
import DeliveryDetails from './DeliveryDetails';
import PaymentForm from './PaymentForm';
import { User, PaymentMethod } from '@/app/lib/definitions'

const CheckoutCardWrapper = () => {

    const { cartItems, removeFromCart, updateItemQuantity, getTotal, clearCart } = useCart();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newErrors, setNewErrors] = useState<{ [key: string]: string }>({});
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<number | null>(null);
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
        user_id: null,
        payment_method_id: null,
        method_name: "",
        card_number: "",
        expiry_date: "",
        card_holder_name: "",
        security_code: "",
        last_four_digits: "",
    })
    
    const [user, setUser] = useState<User>({
        id: null,
        name: "",
        email: "",
        address: "",
        postcode: "",
        type: "",
        password: "",
        telephone: ""
    });

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
        setNewErrors({})
        if (!user.name.trim()) {
            newErrors.name = "Name is required!";
        }

        if (!user.email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
            errors.email = "Invalid email address";
        }

        if (!user.address.trim()) {
            newErrors.address = "Address is required!";
        }

        if (!user.postcode.trim()) {
            newErrors.postcode = "Postcode is required!";
        }

        // if (!user.telephone.trim()) {
        //     newErrors.telephone = "Phone number is required!";
        // }

        if (!paymentMethod.security_code.trim()) {
            newErrors.securityCode = "Security Code is required!";
        }

        if (!selectedPaymentMethodId && !paymentMethod.card_number.trim()) {
            newErrors.cardNum = "Card Number is required!";
        } 
        // else if (!/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})[\s-]*$/.test(cardNum)){
        //     newErrors.cardNum = "Invalid Card Number";
        // }

        if (!selectedPaymentMethodId && !paymentMethod.expiry_date.trim()) {
            newErrors.expiryDate = "Expiry Date is required!";
        }

        if (!selectedPaymentMethodId && !paymentMethod.card_holder_name.trim()) {
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
        const data = {user: user, paymentMethod: paymentMethod, cartItems: cartItems, totalAmount: total};
        console.log(data)
        try {
            const res = await fetch('/api/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    paymentMethod: paymentMethod,
                    cartItems: cartItems,
                    totalAmount: total
                })
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log(responseData);
                clearCart();
                const order_id = responseData.orderId;
                router.push(`/checkout/success/${order_id}`);
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
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };
    
        fetchUserSession();
    }, []);


    useEffect(() => {
        const fetchPaymentMethods = async () => {
            if (user.id === 0 || user.id == undefined) return; 
    
            try {
                const response = await fetch(`/api/users/${user.id}/paymentMethods`);
                const data = await response.json();
                // console.log(data.paymentMethods);
                setPaymentMethods(data.paymentMethods);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };
    
        fetchPaymentMethods();
    }, [user.id]);

    const handlePaymentMethodChange = (methodId: number) => {
        const selectedMethod = paymentMethods.find((method) => method.payment_method_id === methodId);
        if (selectedMethod) {
            setPaymentMethod(selectedMethod);
        }
        setSelectedPaymentMethodId(methodId);
    };

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
                                        user={user}
                                        setUser={setUser}
                                        errors={errors}
                                    />
                                </div>
                                {user.id && paymentMethods &&
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Select Payment Method:
                                    </label>
                                    <select
                                        value={selectedPaymentMethodId ?? ''}
                                        onChange={(e) => handlePaymentMethodChange(Number(e.target.value))}
                                        className="block w-full rounded-md border py-2 px-3 text-gray-900"
                                    >
                                        <option value="">-- Select Payment Method --</option>
                                        {paymentMethods.map((method) => (
                                            <option
                                                key={method.payment_method_id}
                                                value={method.payment_method_id ? method.payment_method_id: ""}
                                            >
                                                {method.method_name} - {method.card_holder_name} - ****{method.last_four_digits}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                }
                                <PaymentForm 
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    errors={errors}
                                    hideCardNumber={!selectedPaymentMethodId}
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
                            No Items in cart :(
                    </h2>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutCardWrapper;
