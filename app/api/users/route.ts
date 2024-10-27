import { fetchAllUsers, fetchMenuItems, getUserSearch, createUserAdmin } from "@/app/lib/data"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function GET(req: Request){
    try {
        let users;
        const { search } = Object.fromEntries(new URL(req.url).searchParams)

        if (search !== '' && search.trim() !== ''){
            users = await getUserSearch(search);
        } else {
            users = await fetchAllUsers();
        }

        if (!users) {
            return NextResponse.json({ error: "No Users Found"}, { status: 500 })
        }

        return NextResponse.json({ users: users }, {status: 201})
    } catch (e) {
        console.log("Error retrieving users: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}

export async function POST(req: Request){
    const user = await req.json();

    if(!user || !user.password){
        return NextResponse.json({ error: "Bad Request"}, { status: 500 })
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword

    try {
        const response = await createUserAdmin(user);
        

        if (!response) {
            return NextResponse.json({ error: "User not created"}, { status: 500 })
        }

        return NextResponse.json({ user: user }, {status: 201})
    } catch (e) {
        console.log("Error retrieving users: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}