import { NextResponse, NextRequest } from "next/server";
import { User } from "@/app/lib/definitions";
import { getUserById, updateUser, deleteUser } from "@/app/lib/data";

export async function PUT(req: Request){
    const body = await req.json()
    try {
        const result = await updateUser(body);
        if (result.error){
            return NextResponse.json({ error: result.error }, { status: 501 });
        }
        return NextResponse.json({ user: result.user }, {status: 201});


    } catch (e) {
        console.log("Error updating user: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}

export async function GET(req: Request, { params }: { params: { userID: string } }){
    try {
        // console.log(`userID in users/route.ts ${params.userID}`)
        const user = await getUserById(params.userID)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ user: user }, {status: 200})
    } catch (e) {
        console.log("Can't find user: ", e)
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500})
    }
}

export async function DELETE(request: NextRequest,{ params }: { params: { userID: string } }) { 
    const { userID } = params;
    console.log('User ID:', userID);

    if (!userID) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const response = await deleteUser(parseInt(userID)); // Convert ID to number if necessary

        if (!response) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully.', user: response }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}