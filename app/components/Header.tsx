'use client'

import React, { useState } from 'react';
import logo from "@/public/logoNew.webp"
import Image from "next/image"
import { CiUser, CiShoppingCart } from "react-icons/ci";
import NavLink from "@/app/ui/Nav/NavLink"
import Cart from './Cart';

export default function Header(){
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    function handleMenuClick(menu: string) {
        setOpenMenu(prevState => (prevState === menu ? null : menu))
    }

    const [cartOpen, setCartOpen] = useState(false)

    function handleCartClick() {
        setCartOpen(prevCartOpen => !prevCartOpen)
        console.log("cart open is " + cartOpen)
    }


    return(
        <nav className="flex gap-5 justify-between bg-white sticky top-0 w-full z-40">
            <Image
                className="mr auto flex"
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
                />
                <NavLink 
                    title={"Menu"} 
                    subtitles={["Every restaurant", "My Restaurants", "Categories"]}
                    onClick={() => handleMenuClick("menu")}
                    isOpen={openMenu == "menu"}
                />
                <NavLink 
                    title={"Locations"} 
                    subtitles={["Find your nearest location", "All locations"]}
                    onClick={() => handleMenuClick("locations")}
                    isOpen={openMenu == "locations"}
                />
                <NavLink 
                    title={"Offers"} 
                    subtitles={["Latest Offers", "Best Offers"]}
                    onClick={() => handleMenuClick("offers")}
                    isOpen={openMenu == "offers"}
                />
            </div>
            <div className='flex self-center gap-5 mr-6'>
                <button><CiUser /></button>
                <button onClick={handleCartClick}><CiShoppingCart /></button>
            </div>
            {cartOpen && <Cart cartOpen={cartOpen}/>}
        </nav>

    )
    
};