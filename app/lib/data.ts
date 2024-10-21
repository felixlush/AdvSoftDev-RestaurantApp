'use server'
import { sql } from '@vercel/postgres'
import { User, MenuItem, Order, OrderItem, PaymentMethod } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function createUser(email: string, password: string, address: string, name: string, postcode: string) {
    
    // console.log(password)

    if (!name || !email || !address || !password) {
        throw new Error('All fields are required');
    }
    
    try {
        const result = await sql`
            INSERT INTO users (email, password, name, address, postcode)
            VALUES (${email}, ${password}, ${name}, ${address}, ${postcode})
            RETURNING *;
        `;

        return result.rows[0]; 

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create user.');
    }

}

export async function getPaymentMethodByUserID(userId: string): Promise<PaymentMethod[]> {
    try {
        const result = await sql<PaymentMethod>`SELECT * from PaymentMethods where user_id = ${userId}`
        return result.rows;
    } catch(error) {
        console.error('Failed to fetch payment methods:', error);
        throw new Error('Failed to fetch payment methods.');
    }
}

export async function updatePaymentMethod(paymentMethod: PaymentMethod){
    try {
        const result = await sql`UPDATE PaymentMethods
            SET 
                method_name = ${paymentMethod.method_name},
                user_id = ${paymentMethod.user_id},
                card_holder_name = ${paymentMethod.card_holder_name},,
                card_number = ${paymentMethod.card_number},
                expir_date=${paymentMethod.expiry_date}
            WHERE id = ${paymentMethod.payment_method_id}
            RETURNING *;`;
        
        if (result.rowCount === 0){
            return NextResponse.json({ error: 'Payment Method not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Method updated successfully', menuItem: result.rows[0] });
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update payment data.');
    }
}

export async function updateUser(user: User){
    try {
        const result = await sql`UPDATE Users
            SET 
                name = ${user.name},
                email = ${user.email},
                address = ${user.address},
                postcode = ${user.postcode},
                type = ${user.type}
            WHERE id = ${user.id}
            RETURNING *;`;
        
        if (result.rowCount === 0){
            return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Menu item updated successfully', menuItem: result.rows[0] });
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update menu data.');
    }
}

export async function handleLogin(email: string, password: string){

    if (!email || !password) {
        // console.log(email + " " + password)
        throw new Error('All fields are required');
    }

    try {
        const result = await sql`SELECT * FROM users WHERE users.email  = ${email}`
        const user = result.rows[0]

        if (!user){
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return user;
        
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to attempt login.');
    }

}

export async function updateMenuItem(item: MenuItem){
    try {
        const result = await sql`UPDATE MenuItems
            SET 
                item_name = ${item.item_name},
                description = ${item.description},
                price = ${item.price},
                available = ${item.available},
                image_url = ${item.image_url}
            WHERE item_id = ${item.item_id}
            RETURNING *;`;
        
        if (result.rowCount === 0){
            return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Menu item updated successfully', menuItem: result.rows[0] });
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update menu data.');
    }
}

export async function fetchAllMenuItems(){
    try{
        const data = await sql<MenuItem>`SELECT * FROM menuItems`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchMenuItems(search: string){
    try{
        const data = await sql<MenuItem>`SELECT * FROM menuItems WHERE item_name ILIKE ${'%' + search + '%'} or category ILIKE ${'%' + search + '%'}`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserSearch(search: string): Promise<User[]> {
    try {
        const users = await sql<User>`SELECT id, name, email, type, address FROM users WHERE name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'}`
        return users.rows || [];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserById(id: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function fetchAllUsers(): Promise<User[] | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users`;
        return user.rows || [];
    } catch (error) {
        console.error('Failed to fetch users', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getOrdersByUserID(userID: string): Promise<Order[] | undefined> {
    try {
        const orders = await sql<Order>`
            SELECT order_id, order_status, total_amount, payment_status, created_at  
            FROM orders 
            WHERE user_id = ${userID}
        `;

        return orders.rows || [];
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw new Error('Failed to fetch orders.');
    }
}

export async function getOrderItemsByID(order_id: string): Promise<OrderItem[] | undefined> {
    try {
        const orderItems = await sql<OrderItem>`
        SELECT 
            OrderItems.order_item_id, 
            OrderItems.quantity, 
            OrderItems.price_at_purchase, 
            MenuItems.item_name, 
            MenuItems.description, 
            MenuItems.price, 
            MenuItems.image_url
        FROM OrderItems
        JOIN MenuItems ON OrderItems.item_id = MenuItems.item_id
        WHERE OrderItems.order_id = ${order_id}
        `;
        return orderItems.rows;
    } catch (error){
        console.error('Failed to fetch order details:', error);
        throw new Error('Failed to fetch order details.');
    }
}