'use client'
import React, { useState, useEffect } from 'react';
import logo from "@/public/logoNew.webp"
import Image from "next/image"
import { CiUser, CiShoppingCart, CiLogout } from "react-icons/ci";
import NavLink from "@/app/ui/Nav/NavLink"
import Cart from './Cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bars } from 'react-loading-icons'

export default function Header() {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userType, setUserType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const response = await fetch('/api/auth/verify');
                const data = await response.json();

                if (response.ok && data) {
                    setLoggedIn(true);
                    setUserType(data.user.type);
                } else {
                    setLoggedIn(false);
                    setUserType('');
                }
            } catch (error) {
                console.error('Error fetching session:', error);
                setLoggedIn(false);
                setUserType('');
            } finally {
                setLoading(false);
            }
        };

        fetchUserSession();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });
        setLoggedIn(false);
        setUserType('');
        router.push("/");
    };

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    function handleMenuClick(menu: string) {
        setOpenMenu(prevState => (prevState === menu ? null : menu));
    }

    const [cartOpen, setCartOpen] = useState(false);

    function handleCartClick() {
        setCartOpen(prevCartOpen => !prevCartOpen);
        // console.log("cart open is " + cartOpen);
    }

    if (loading) {
        return <Bars/>; 
    }

    return (
        <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <Image
                className="mr auto flex sm:flex-col"
                src={logo}
                alt="Restaurant Logo"
                width={120}
                height={100}
            />
            <div className='flex gap-7 justify-center'>
                <NavLink
                    title={"Home"}
                    subtitles={["My Home", "Website Home"]}
                    onClick={() => handleMenuClick("home")}
                    isOpen={openMenu == "home"}
                    href={"/"}
                />
                <NavLink
                    title={"Menu"}
                    subtitles={["Every restaurant", "My Restaurants", "Categories"]}
                    onClick={() => handleMenuClick("menu")}
                    isOpen={openMenu == "menu"}
                    href={"/menu"}
                />
                <NavLink
                    title={"Locations"}
                    subtitles={["Find your nearest location", "All locations"]}
                    onClick={() => handleMenuClick("locations")}
                    isOpen={openMenu == "locations"}
                    href={"/locations"}
                />
                {
                    userType === "admin" && 
                    <NavLink
                    title={"Admin"}
                    subtitles={["Edit Menu", "Check Orders"]}
                    onClick={() => handleMenuClick("admin")}
                    isOpen={openMenu == "admin"}
                    href={"/admin"}
                    />
                }
            </div>
            <div className='flex self-center gap-5 mr-6 sm:mt-5'>
                <Link href={"/account/dashboard"}><CiUser /></Link>
                <button onClick={handleCartClick}><CiShoppingCart /></button>
                {loggedIn && <button onClick={handleLogout}><CiLogout /></button>}
            </div>
            {cartOpen && <Cart cartOpen={cartOpen} />}
        </nav>
    );
};
