import { NextResponse } from 'next/server';
import { getOrdersByUserID } from '@/app/lib/data';

export async function GET(req: Request, { params }: { params: { userID: string } }) {
    const { userID } = params;

    try {
        const orders = await getOrdersByUserID(userID);

        if (!orders || orders.length === 0) {
            return NextResponse.json({ error: 'No orders found' }, { status: 500 });
        }

        return NextResponse.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: `Failed to fetch orders ${error}`}, { status: 500 });
    }
}
