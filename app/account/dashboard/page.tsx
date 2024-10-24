'use client'
import React, { useEffect, useState } from 'react';
import AccountCard from '@/app/ui/Account/Dashboard/AccountCard';
import OrdersCard from '@/app/ui/Account/Dashboard/OrdersCard';
import { redirect, useRouter } from 'next/navigation';
import { User } from '@/app/lib/definitions';
import { Bars } from 'react-loading-icons'
import PaymentMethodsCard from '@/app/ui/Account/Dashboard/PaymentMethodsCard';

export default function DashboardPage() {
    const [userId, setUserId] = useState<number | null>(null)
    const router = useRouter();

    useEffect(() => {
        const fetchUserSession = async () => {
                const response = await fetch('/api/auth/verify');
                const data = await response.json();
                if (response.ok && data) {
                    // console.log(data);
                    setUserId(data.user.id);
                } else {
                    console.log("Log in failed")
                    setUserId(null);
                    router.push("/account/login")
                }      
        };
        fetchUserSession();
    }, []);

    if (!userId) {
        return <div><Bars/></div>; 
    }

    return (
        
        <section>
            {userId !== null &&
            <div>
                <AccountCard userId={userId} />
                <OrdersCard userId={userId} />
                <PaymentMethodsCard userId={userId}/>
            </div>
            }
        </section>
    );
}
