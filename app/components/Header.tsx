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
import { User } from '../lib/definitions';
import { FaUser } from "react-icons/fa";

export default function Header() {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null)
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
                    setUser(data.user);
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
        setUser(null)
        setUserType('');
        router.push("/");
    };

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    function handleMenuClick(menu: string) {
        setOpenMenu(prevState => (prevState === menu ? null : menu));
    }

    const handleUserClick = () => {
        let url = (loggedIn ? "/account/dashboard" : "/account/login");
        router.push(url);
    }

    const [cartOpen, setCartOpen] = useState(false);

    function handleCartClick() {
        setCartOpen(prevCartOpen => !prevCartOpen);
        // console.log("Cart button clicked")
    }

    if (loading) {
        return <Bars />;
    }

    return (
        <nav className="container mx-auto md:justify-between lg:flex">
            <div className="flex justify-center">
                <Image
                    className="mr auto"
                    src={logo}
                    alt="Restaurant Logo"
                    width={120}
                    height={100}
                />
            </div>
            <div className='flex flex-col items-center sm:flex-row gap-x-20 gap-y-3'>
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
                    title={" Restaurant Locations"}
                    subtitles={["Find your nearest location", "All locations"]}
                    onClick={() => handleMenuClick("locations")}
                    isOpen={openMenu == "locations"}
                    href={"/locations"}
                />
                {
                    loggedIn &&
                    <NavLink
                        title={"My Account"}
                        subtitles={["Edit Menu", "Check Orders"]}
                        onClick={() => handleMenuClick("dashboard")}
                        isOpen={openMenu == "dashboard"}
                        href={"/account/dashboard"}
                    />
                }
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
            <div className='flex justify-center gap-5 mr-6 mb-8 mt-8'>
                {loggedIn ? <button onClick={handleUserClick}><FaUser/></button> : <button onClick={handleUserClick}><CiUser/></button>}
                <button onClick={handleCartClick}><CiShoppingCart /></button>
                {loggedIn && <button onClick={handleLogout}><CiLogout /></button>}
            </div>
            <Cart cartOpen={cartOpen} closeCart={handleCartClick}/>
        </nav>
    );
};
