export type MenuItem = {
    item_id: number,
    item_name: string,
    description: string,
    price: string,
    category: string,
    available: boolean,
    image_url: string;
}

export type Order = {
    order_id: number
    user_id: number
    order_status: string
    total_amount: number
    payment_status: string,
    created_at: string
}

export interface OrderItem {
    order_item_id: number;
    order_id: number;
    item_id: number;
    quantity: number;
    price_at_purchase: number;
    item_name: string;
    description: string;
    price: number;
    image_url: string;
}

export type User = {
    name: string,
    id: number,
    email: string,
    address: string,
    postcode: string,
    password: string,
    type: string
}

export type Payment = {
    payment_id: number,
    order_id: number,
    payment_method: string,
    payment_amount: string,
    payment_status: string,
    payment_date: string
}

export type CartItem = {
    product: MenuItem;
    quantity: number;
}

export type PaymentMethod = {
    user_id: number,
    payment_method_id: number,
    method_name: string,
    card_number: number,
    expiry_date: string,
    card_holder_name: string,
}



