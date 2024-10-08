import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminUserPanel from '../ui/Admin/AdminUserPanel'
import AdminMenuPanel from '../ui/Admin/AdminMenuPanel'

export default function Page(){
    return (
        <div>
            <Header/>
            <AdminUserPanel />
            <AdminMenuPanel />
            <Footer />
        </div>
    )
}
