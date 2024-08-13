import { sql } from '@vercel/postgres'
import { Product } from './definitions'


export async function fetchMenuItems(){
    try{
        const data = await sql<Product>`SELECT * FROM products`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}
