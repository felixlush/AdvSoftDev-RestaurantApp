import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AccountCard from '@/app/ui/Account/Dashboard/AccountCard';
import OrdersCard from '@/app/ui/Account/Dashboard/OrdersCard';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

async function fetchUserAndOrders(token: string) {
    const userRes = await fetch(`http://localhost:3000/api/auth/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    if (!userRes.ok) {
        console.log("user response not okay!")
        return null;
    }

    const { user } = await userRes.json();

    const ordersRes = await fetch(`http://localhost:3000/api/orders/${user.id}`);
    const { orders } = await ordersRes.json();

    return { user, orders };
}

export default async function DashboardPage() {
    // Get the cookies from the request
    const cookieStore = cookies();
    const token = cookieStore.get('auth')?.value; // Get the 'auth' token from cookies

    if (!token || token == " ") {
        // Redirect to login if there's no token
        console.log("No Token")
        redirect('/account/login');
    }

    const result = await fetchUserAndOrders(token);

    if (!result) {
        // Redirect to login page if the user is not authenticated
        console.log("No SQL Result")
        redirect('/account/login');
    }

    const { user, orders } = result;

    return (
        <section>
            <Header />
            <AccountCard user={user} />
            <OrdersCard orders={orders} />
            <Footer />
        </section>
    );
}
