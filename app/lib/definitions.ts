export type Product = {
    name: string
    price: number
    id: number
    image: string
}

export type ProductOrder = {
    product: Product
    id: number
    quantity: number
    totalPrice: number
}

export type User = {
    name: string,
    id: number,
    email: string,
    address: string,
    password: string
}