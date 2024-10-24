'use client'
import React, { useState } from 'react';
import MenuSearch from '@/app/ui/Menu/MenuSearch';
import MenuCardWrapper from '@/app/ui/Menu/MenuPanel';

export default function Page() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <>
        <MenuCardWrapper />
        </>
    );
}
