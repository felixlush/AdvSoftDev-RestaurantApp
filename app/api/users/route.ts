import { fetchAllUsers, fetchMenuItems, getUserSearch } from "@/app/lib/data"
import { NextResponse } from "next/server";
import { User } from '@/app/lib/definitions'

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