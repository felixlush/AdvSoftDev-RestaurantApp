import { NextResponse } from "next/server";
import { PaymentMethod } from "@/app/lib/definitions";
import {deletePaymentMethod} from "@/app/lib/data";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {

    console.log(`payment method ID in users/userID/route.ts ${params.id}`)
    const payment_id = parseInt(params.id);

    // if (isNaN(item_id)) {
    //     return NextResponse.json({ error: 'Invalid item ID provided.' }, { status: 400 });
    // }

    try {
        const result = await deletePaymentMethod(payment_id);
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 404 });
        }

        return NextResponse.json({ message: 'Menu item deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}