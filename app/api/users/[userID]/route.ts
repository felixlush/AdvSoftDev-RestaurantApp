import { NextResponse } from "next/server";
import { User } from "@/app/lib/definitions";
import { getUserById, updateUser } from "@/app/lib/data";

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

export async function GET(req: Request, { params }: { params: { userID: string } }){
    try {
        console.log(`userID in users/route.ts ${params.userID}`)
        const user = await getUserById(params.userID)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ user: user }, {status: 201})
    } catch (e) {
        console.log("Can't find user: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}