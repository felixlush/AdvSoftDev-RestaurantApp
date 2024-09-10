'use client'
import React, { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AccountCard from '@/app/ui/Account/Dashboard/AccountCard';
import OrdersCard from '@/app/ui/Account/Dashboard/OrdersCard';
import { redirect, useRouter } from 'next/navigation';
import { User } from '@/app/lib/definitions';
import { Bars } from 'react-loading-icons'

export default function DashboardPage() {
    const [userId, setUserId] = useState<number | null>(null)
    const router = useRouter();

    useEffect(() => {
        const fetchUserSession = async () => {
                const response = await fetch('/api/auth/verify');
                const data = await response.json();
                if (response.ok && data) {
                    console.log(data);
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
            <Header />
            {userId !== null &&
            <div>
                <AccountCard userId={userId} />
                <OrdersCard userId={userId} />
            </div>
            }
            <Footer />
        </section>
    );
}
