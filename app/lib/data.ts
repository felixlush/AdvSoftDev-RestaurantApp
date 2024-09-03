'use server'
import { sql } from '@vercel/postgres'
import { User, MenuItem, Order, OrderItems } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'

export async function createUser(email: string, password: string, address: string, name: string, postcode: string) {
    
    console.log(password)

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

export async function handleLogin(email: string, password: string){

    if (!email || !password) {
        console.log(email + " " + password)
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

export async function fetchMenuItems(){
    try{
        const data = await sql<MenuItem>`SELECT * FROM products`;

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

export async function getUserById(id: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getOrdersByUserID(userID: string): Promise<OrderItems[] | undefined> {
    try {
        const orders = await sql<OrderItems>`
            SELECT order_id, order_status, total_amount, payment_status 
            FROM orders 
            WHERE user_id = ${userID}
        `;

        return orders.rows || [];
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw new Error('Failed to fetch orders.');
    }
}