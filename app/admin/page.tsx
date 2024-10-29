import React from 'react'
import AdminUserPanel from '../ui/Admin/AdminUserPanel'
import AdminMenuPanel from '../ui/Admin/AdminMenuPanel'
import AdminOrderPanel from '../ui/Admin/AdminOrderPanel'

export default function Page(){
    return (
        <div className='pt-40'>
            <AdminUserPanel />
            <AdminMenuPanel />
            <AdminOrderPanel />
        </div>
    )
}
