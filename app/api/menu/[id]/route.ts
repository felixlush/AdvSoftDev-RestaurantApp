import { NextResponse } from "next/server";
import { MenuItem } from "@/app/lib/definitions";
import { updateMenuItem } from "@/app/lib/data";

export async function PUT(req: Request){
    const body = await req.json()
    try {
        const result = await updateMenuItem(body)
        return NextResponse.json({ menuItem: result }, {status: 201})
    } catch (e) {
        console.log("Error updating item: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}