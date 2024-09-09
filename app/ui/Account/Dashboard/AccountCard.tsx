import React from "react";
import {User} from '@/app/lib/definitions'

interface AccountCardProps{
    user: User
}

export default function AccountCard({user}: AccountCardProps){
    return(
        <div className="flex justify-center p-10">
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full">
                <div>
                    <h1 className="mb-10 font-semibold p-5 tracking-widest">My Details</h1>
                    <div className="p-4">
                        <h2 className="mb-5">id: {user.id}</h2>
                        <h2 className="mb-5">Name: {user.name}</h2>
                        <h2 className="mb-5">Email: {user.email}</h2>
                        <h2 className="mb-5">Address: {user.address}</h2>
                    </div>
                </div>
            </div>
        </div> 
    )
}