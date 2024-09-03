import { ProductOrder } from "@/app/lib/definitions";
import React from "react";

interface OrderCardProps {
    orders: ProductOrder[]
}

export default function OrdersCard(orders: OrderCardProps){
    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 p-10 bg-slate-200">
            <div className="p-10 shadow-lg rounded-md bg-slate-100">
                <h1 className="mb-10 font-semibold">My Orders</h1>
                <h2 className="mb-5">Name: {}</h2>
                <h2 className="mb-5">Email: {}</h2>
                <h2 className="mb-5">Address: {}</h2>
                <h2 className="mb-5">Status: {}</h2>
            </div>
        </div>  
    )
}