import { NextResponse } from "next/server";
import { User, PaymentMethod } from "@/app/lib/definitions";
import bcrypt from 'bcrypt';
import { addPaymentMethod, deletePaymentMethod, getPaymentMethodByUserID } from "@/app/lib/data";

export async function POST(req: Request){
    const formData = await req.json()

    if (!formData.card_number || !formData.security_code){
        return NextResponse.json({ error: "Value missing, please try again"}, { status: 500 })
    }

    formData.last_four_digits = formData.card_number.slice(-4);

    formData.card_number = await bcrypt.hash(formData.card_number, 10);
    formData.security_code = await bcrypt.hash(formData.security_code, 10);

    try {
        const result = await addPaymentMethod(formData)
        return NextResponse.json({ paymentMethod: result }, {status: 201})
    } catch (e) {
        console.log("Error adding payment method: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}

export async function GET(req: Request, { params }: { params: { userID: string } }){
    try {
        // console.log(`user ID in users/paymentMethods/route.ts ${params.userID}`)
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