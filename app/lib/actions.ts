'use server'
import { sql } from '@vercel/postgres'

export async function createUser(formData: FormData) {
    const rawFormData = {
        customerId: formData.get('customerId') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        address: formData.get('address') as string,
        password: formData.get('password') as string
    };

    if (!rawFormData.customerId || !rawFormData.name || !rawFormData.email || !rawFormData.address || !rawFormData.password) {
        throw new Error('All fields are required');
    }
    
    try {
        const result = await sql`
            INSERT INTO users (customer_id, name, email, address, password)
            VALUES (${rawFormData.customerId}, ${rawFormData.name}, ${rawFormData.email}, ${rawFormData.address}, ${rawFormData.password})
            RETURNING *;
        `;

        return result.rows[0]; 

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create user.');
    }

}

export async function handleLogin(formData: FormData){

    const rawFormData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    };

    if (!rawFormData.email || !rawFormData.password) {
        throw new Error('All fields are required');
    }

    try {
        const result = await sql`SELECT * FROM users WHERE users.name  = ${rawFormData.email} and users.password = ${rawFormData.password}`
        return result.rows[0]
        
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to attempt login.');
    }

}