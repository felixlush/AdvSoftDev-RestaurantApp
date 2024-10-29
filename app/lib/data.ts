'use server'
import { sql, db } from '@vercel/postgres'
import { User, MenuItem, Order, OrderItem, PaymentMethod, CartItem, Payment } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function createUser(email: string, password: string, address: string, name: string, postcode: string) {

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

export async function createOrder(client: any, user: User, totalAmount: number){ 
    try {
        const query = 
            `INSERT INTO Orders (user_id, order_status, total_amount, payment_status) 
            VALUES ($1, 'Recieved', $2, 'Paid') 
            RETURNING order_id;
        `;
        const data = [user.id, totalAmount];

        const result = await client.query(query, data); 
        if (result.rows.length > 0 || result.rows[0].order_id) {
            return result.rows[0].order_id;  
        } else {
            throw new Error('Order ID not generated.');
        }
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order.');
    }
}

export async function getOrderByID(orderID: string){
    try{
        const result = await sql<Order>`
            SELECT * 
            FROM orders
            where order_id = ${orderID}
        `;
        if (result.rows.length == 0){
            return null
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error finding items:', error);
        throw new Error('Failed to create order items.');
    }
}

export async function createOrderItem(client: any, orderId: number, cartItem: CartItem){
    try {
        const query = 
            `INSERT INTO OrderItems(order_id, item_id, quantity, price_at_purchase) 
            VALUES( $1, $2, $3, $4)
        `;
        const data = [orderId, cartItem.product.item_id, cartItem.quantity, cartItem.product.price];
        const result = await client.query(query, data)
    } catch (error) {
        console.error('Error creating order items:', error);
        throw new Error('Failed to create order items.');
    }
}

export async function createPayment(client: any, orderId: number, paymentMethod: PaymentMethod, paymentAmount: number){
    try {
        const query = `
            INSERT INTO Payments (order_id, payment_method, payment_amount, payment_status) 
            VALUES ($1, $2, $3, 'Paid');
        `;
        const data = [orderId, paymentMethod.method_name, paymentAmount]
        const result = await client.query(query, data)
    } catch (error) {
        console.error('Error creating payment:', error);
        throw new Error('Failed to create payment.');
    }
}

export async function getPaymentMethodById(paymentMethodId: number){
    try {
        const result = await sql<PaymentMethod>`
            SELECT *
            FROM PaymentMethods 
            WHERE payment_method_id = ${paymentMethodId};
        `;
        return result.rows[0];
    } catch (error) {
        console.error('Failed to fetch payment method by ID:', error);
        throw new Error('Failed to fetch payment method.');
    }
}

export async function getPaymentMethodByUserID(userId: string): Promise<PaymentMethod[]> {
    try {
        const result = await sql<PaymentMethod>`
            SELECT 
                method_name,
                card_holder_name,
                expiry_date,
                last_four_digits,
                payment_method_id
            from PaymentMethods where user_id = ${userId}`
        return result.rows;
    } catch(error) {
        console.error('Failed to fetch payment methods:', error);
        throw new Error('Failed to fetch payment methods.');
    }
}

export async function updatePaymentMethod(paymentMethod: PaymentMethod){
    try {
        const result = await sql`UPDATE * FROM PaymentMethods
            SET 
                method_name = ${paymentMethod.method_name},
                user_id = ${paymentMethod.user_id},
                card_holder_name = ${paymentMethod.card_holder_name},
                card_number = ${paymentMethod.card_number},
                expiry_date=${paymentMethod.expiry_date}
            WHERE id = ${paymentMethod.payment_method_id}
            RETURNING *;`;
        
        if (result.rowCount === 0){
            return NextResponse.json({ error: 'Payment Method not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Method updated successfully', paymentMethod: result.rows[0] });
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
            return { error: 'User not found' };
        }
        
        return { message: 'User updated successfully', user: result.rows[0] };
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update user data.');
    }
}

export async function addPaymentMethod(paymentMethod: PaymentMethod) {

    // const lastFourDigits = paymentMethod.card_number.slice(-4);

    try {
        const result = await sql`
            INSERT INTO PaymentMethods (
                method_name, 
                user_id, 
                card_holder_name, 
                card_number, 
                expiry_date,
                security_code,
                last_four_digits
            ) 
            VALUES (
                ${paymentMethod.method_name}, 
                ${paymentMethod.user_id}, 
                ${paymentMethod.card_holder_name}, 
                ${paymentMethod.card_number}, 
                ${paymentMethod.expiry_date},
                ${paymentMethod.security_code},
                ${paymentMethod.last_four_digits}
            ) 
            RETURNING *;
        `;

        return { message: 'Payment added successfully', paymentMethod: result.rows[0] };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to add user.');
    }
}

export async function deletePaymentMethod(payment_method_id: number) {
    try{
        const result = await sql`
            DELETE FROM PaymentMethods
            WHERE payment_method_id = ${payment_method_id}
            RETURNING *;
        `;

        if (result.rows.length === 0) {
            return { success: false, error: 'Payment Method not found' }
        }
        return { success: true, data: result.rows[0] };
    }
    catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete payment data.');
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

export async function addMenuItem(item: MenuItem){
    try {
        const result = await sql`
            INSERT INTO menuitems (
                item_name, 
                description, 
                price, 
                category, 
                available,
                image_url
            ) 
            VALUES (
                ${item.item_name}, 
                ${item.description}, 
                ${item.price}, 
                ${item.category}, 
                ${item.available},
                ${item.image_url}
            ) 
            RETURNING *;
        `;

        return { message: 'Item added successfully', menuItem: result.rows[0] };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to insert menu item.');
    }
}

export async function deleteMenuItem(item_id: number) {
    // console.log("Item ID is: ", item_id);
    try {
        const result = await sql`
            DELETE FROM menuitems
            WHERE item_id = ${item_id}
            RETURNING *;
        `;

        if (result.rows.length === 0) {
            return { error: 'No menu item found with the provided ID.' };
        }

        return { message: 'Menu item deleted successfully.', menuItem: result.rows[0] };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete menu item.');
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
                image_url = ${item.image_url},
                category = ${item.category.toLowerCase()}
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
        const data = await sql<MenuItem>`SELECT * FROM menuItems ORDER BY item_id`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch items.');
    }
}

export async function fetchMenuItems(search: string){
    try{
        const data = await sql<MenuItem>`SELECT * FROM menuItems WHERE item_name ILIKE ${'%' + search + '%'} or category ILIKE ${'%' + search + '%'} ORDER BY item_id`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch items.');
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
        const users = await sql<User>`
            SELECT id, name, email, type, address 
            FROM users WHERE name 
            ILIKE ${'%' + search + '%'} 
            OR email ILIKE ${'%' + search + '%'} 
            OR type ILIKE ${'%' + search + '%'}
            order by id
        `;
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
        const user = await sql<User>`SELECT * FROM users ORDER BY id`;
        return user.rows || [];
    } catch (error) {
        console.error('Failed to fetch users', error);
        throw new Error('Failed to fetch users.');
    }
}

export async function getOrdersByUserID(userID: string): Promise<Order[] | undefined> {
    try {
        const userIdInt = parseInt(userID, 10);

        //console.log(`Fetching orders for userID: ${userIdInt}`);

        const orders = await sql<Order>`
            SELECT order_id, order_status, total_amount, payment_status, created_at  
            FROM orders 
            WHERE user_id = ${userIdInt}    
        `;

        console.log(`Number of orders fetched: ${orders.rows.length}`);
        console.log('Orders fetched:', orders.rows);

        return orders.rows || [];
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw new Error('Failed to fetch orders.');
    }
}

export async function updateOrderStatus(order_id: number, order_status: string, payment_status: string){
    try {
        const result = await sql`UPDATE Orders
            SET 
                order_status = ${order_status},
                payment_status = ${payment_status}
            WHERE order_id = ${order_id}
            RETURNING *;`
        ;
        if (result.rowCount === 0){
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Order updated successfully', menuItem: result.rows[0] });
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update order.');
    }


}

export async function createUserAdmin(user: User){
    try{
        const result = await sql<User>`
            INSERT INTO users (
                name,
                email,
                address,
                postcode,
                password,
                type
            )
            VALUES (
                ${user.name},
                ${user.email},
                ${user.address},
                ${user.postcode},
                ${user.password},
                ${user.type}
            )
            RETURNING *;
        `;
        return { message: 'User added successfully', user: result.rows[0] };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to insert menu item.');
    }
}
export async function deleteUser(id: number){
    try{
        const result = await sql<User>`
            DELETE FROM USERS
            WHERE id = ${id}
            RETURNING *;
        `
        if (result.rowCount == 0){
            console.log("User not found")
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete user.');
    }
}


export async function getAllOrders(): Promise<Order[]>{
    try {
        const orders = await sql<Order>`
            SELECT order_id, user_id, order_status, total_amount, payment_status, created_at
            FROM orders 
            ORDER BY created_at DESC
        `;

        return orders.rows || [];
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw new Error('Failed to fetch orders.');
    }
}

export async function getOrderItemsByID(order_id: string): Promise<OrderItem[]> {
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