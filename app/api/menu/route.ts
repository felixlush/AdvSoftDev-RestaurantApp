import { deleteMenuItem, fetchAllMenuItems, fetchMenuItems } from "@/app/lib/data"
import { NextResponse } from "next/server";
import { addMenuItem } from "@/app/lib/data"

export async function GET(req: Request){
    try {
        let menuItems;
        const { search } = Object.fromEntries(new URL(req.url).searchParams)
        
        if (search !== '' && search.trim() !== '') {
            menuItems = await fetchMenuItems(search);
        } else {
            menuItems = await fetchAllMenuItems();
        }

        if (!menuItems) {
            return NextResponse.json({ error: "No Items Found"}, { status: 500 })
        }

        return NextResponse.json({ menuItems: menuItems }, {status: 201})
    } catch (e) {
        console.log("Error retrieving menu: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}

export async function POST(req: Request){
    try{
        const formData = await req.json();
        const result = await addMenuItem(formData)
        return NextResponse.json({menuItem: result}, {status: 201})
    } catch (e) {
        console.log("Error adding menu item: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}

