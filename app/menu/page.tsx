import React from 'react'
import Header from '@/app/components/Header'
import MenuSearch from '@/app/ui/Menu/MenuSearch'
import MenuCardWrapper from '@/app/ui/Menu/MenuCardWrapper'

export default function Page(){
    return(
        <>
            <Header />
            <MenuSearch />
            <MenuCardWrapper />
        </>
    )
}