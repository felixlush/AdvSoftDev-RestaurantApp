import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminUserPanel from '../ui/Admin/AdminUserPanel'
import AdminMenuPanel from '../ui/Admin/AdminMenuPanel'
import AdminOrderPanel from '../ui/Admin/AdminOrderPanel'

export default function Page(){
    return (
        <div>
            <Header/>
            <AdminUserPanel />
            <AdminMenuPanel />
            <AdminOrderPanel />
            <Footer />
        </div>
    )
}
