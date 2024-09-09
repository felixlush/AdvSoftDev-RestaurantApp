import { NextResponse } from "next/server";
import { User } from "@/app/lib/definitions";
import { updateUser } from "@/app/lib/data";

export async function PUT(req: Request){
    const body = await req.json()
    try {
        const result = await updateUser(body)
        return NextResponse.json({ user: result }, {status: 201})
    } catch (e) {
        console.log("Error updating item: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}