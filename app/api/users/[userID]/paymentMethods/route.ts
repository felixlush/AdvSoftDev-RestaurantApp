import { NextResponse } from "next/server";
import { User, PaymentMethod } from "@/app/lib/definitions";
import { getPaymentMethodByUserID, updatePaymentMethod } from "@/app/lib/data";

export async function PUT(req: Request){
    const body = await req.json()
    try {
        const result = await updatePaymentMethod(body)
        return NextResponse.json({ user: result }, {status: 201})
    } catch (e) {
        console.log("Error updating item: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}

export async function GET(req: Request, { params }: { params: { userID: string } }){
    try {
        console.log(`user ID in users/paymentMethods/route.ts ${params.userID}`)
        const paymentMethods = await getPaymentMethodByUserID(params.userID)
        console.log(`paymentMethods is: ${paymentMethods}`)
        if (!paymentMethods) {
            return NextResponse.json({ error: 'Payment methods not found' }, { status: 404 });
        }
        return NextResponse.json({ paymentMethods: paymentMethods }, {status: 201})
    } catch (e) {
        console.log("Can't find payment methods: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}