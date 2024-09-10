import { NextResponse } from 'next/server';
import { getOrderItemsByID, getOrdersByUserID } from '@/app/lib/data';

export async function GET(req: Request, { params }: { params: { orderID: string } }) {
    const { orderID } = params;

    try {
        const orderItems = await getOrderItemsByID(orderID);

        if (!orderItems || orderItems.length === 0) {
            return NextResponse.json({ error: 'No orders found' }, { status: 500 });
        }

        return NextResponse.json({ orderItems });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: `Failed to fetch orders ${error}`}, { status: 500 });
    }
}