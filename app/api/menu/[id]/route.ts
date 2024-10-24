import { NextResponse } from "next/server";
import { MenuItem } from "@/app/lib/definitions";
import { deleteMenuItem, updateMenuItem } from "@/app/lib/data";

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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {

    // console.log(`item ID in menu/id/route.ts ${params.id}`)
    const item_id = parseInt(params.id);

    // if (isNaN(item_id)) {
    //     return NextResponse.json({ error: 'Invalid item ID provided.' }, { status: 400 });
    // }

    try {
        const result = await deleteMenuItem(item_id);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 404 });
        }

        return NextResponse.json({ message: 'Menu item deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}