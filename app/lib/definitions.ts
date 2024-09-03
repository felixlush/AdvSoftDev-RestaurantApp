export type MenuItem = {
    item_id: number,
    item_name: string,
    description: string,
    price: number,
    category: string,
    avaliable: boolean,
}

export type Order = {
    order_id: number
    user_id: number
    order_status: string
    total_amount: number
    payment_status: string
}

export type OrderItems = {
    order_item_id: number,
    order_id: number,
    item_id: number,
    quantity: number,
    price_at_purchase: number
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

export type Paymemt = {
    payment_id: number,
    order_id: number,
    payment_method: string,
    payment_amount: string,
    payment_status: string,
    payment_date: string
}





