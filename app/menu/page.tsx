'use client'
import React, { useState } from 'react';
import Header from '@/app/components/Header';
import MenuSearch from '@/app/ui/Menu/MenuSearch';
import MenuCardWrapper from '@/app/ui/Menu/MenuCardWrapper';
import Footer from '../components/Footer';

export default function Page() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <>
        <Header />
        <MenuCardWrapper />
        <Footer/>
        </>
    );
}
