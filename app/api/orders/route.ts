import { NextResponse } from 'next/server';
import { createOrder, createOrderItem, createPayment, getPaymentMethodById, getAllOrders, updateOrderStatus } from '@/app/lib/data'
import { db } from '@vercel/postgres'
import { CartItem } from '@/app/lib/definitions';

export async function POST(req: Request){

    try{
        const data = await req.json()

        const user = data.user;

        const paymentMethod = data.paymentMethod;
        const cartItems = data.cartItems;

        const totalAmount = data.totalAmount

        if(!user || !paymentMethod || cartItems.length == 0){
            return NextResponse.json({ error: 'need all required data' }, { status: 400 });
        }

        const client = await db.connect();

        try {
            const orderId = await createOrder(client, user, totalAmount);

            for (let i = 0; i < cartItems.length; ++i){
                await createOrderItem(client, orderId, cartItems[i]);
            }

            const payment = await createPayment(client, orderId, paymentMethod, totalAmount);

            await client.query('COMMIT');

            return NextResponse.json({ message: 'Order created successfully.', orderId }, { status: 200 });
        }
        catch(error) {
            await client.query('ROLLBACK');
            console.error('Transaction Error:', error);
            return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 });
        } finally {
            client.release();
        }
    } catch (reqError){
        console.error('Request Error:', reqError);
        return NextResponse.json({ error: 'Bad Request.' }, { status: 400 });
    }
    
}

export async function GET(req: Request){

    try {
        const orders = await getAllOrders();
        if (orders.length == 0){
            return NextResponse.json({ error: 'No orders found.' }, { status: 500 });
        }
        
        return NextResponse.json({ message: 'Orders returned successfully', orders }, { status: 200 });
    } catch (error) {
        console.error('Server error', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

}

export async function PUT(req: Request){
    try{
        const order = await req.json()
        const order_status = order.order_status;
        const payment_status = order.payment_status;
        const order_id = order.order_id

        const response = await updateOrderStatus(order_id, order_status, payment_status)

        if (response.ok){
            return NextResponse.json({ message: 'Order updated successfully'}, { status: 200 });
        } else {
            return NextResponse.json({ error: 'No orders found.' }, { status: 500 });
        }
    } catch (error) {
        console.error('Server error', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}