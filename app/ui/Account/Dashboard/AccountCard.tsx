'use client'
import React, { useEffect, useState } from "react";
import {User} from '@/app/lib/definitions'
import { getUserById } from "@/app/lib/data";
import { useRouter } from "next/navigation";

interface AccountCardProps{
    userId: number
}

export default function AccountCard(props: AccountCardProps){
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${props.userId}`)
            const data = await response.json();
            // console.log(data.user)
            setUser(data.user)
        }
        if (props.userId) {fetchUser()}
    }, [props.userId])

    return(
        <section>
            
            <div className="flex justify-center p-10">
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition w-full">
                    <div>
                        {user ? (
                        <>
                        <h1 className="mb-10 font-semibold p-5 tracking-widest">My Details</h1>
                        <div className="p-4">
                            <h2 className="mb-5">id: {user.id}</h2>
                            <h2 className="mb-5">Name: {user.name}</h2>
                            <h2 className="mb-5">Email: {user.email}</h2>
                            <h2 className="mb-5">Address: {user.address}</h2>
                        </div>
                        </>
                        ) : (<p>User not found</p>)}
                    </div>
                </div>
            </div>
        </section>
    )
}