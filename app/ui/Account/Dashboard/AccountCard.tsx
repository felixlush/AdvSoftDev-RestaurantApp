import React from "react";
import {User} from '@/app/lib/definitions'

interface AccountCardProps{
    user: User
}

export default function AccountCard({user}: AccountCardProps){
    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 p-10 bg-slate-200">
            <div className="p-10 shadow-lg rounded-md bg-slate-100 max-w-sm">
                <h1 className="mb-10 font-semibold">My Details</h1>
                <h2 className="mb-5">Name: {user.name}</h2>
                <h2 className="mb-5">Email: {user.email}</h2>
                <h2 className="mb-5">Address: {user.address}</h2>
            </div>
        </div>        
    )
}