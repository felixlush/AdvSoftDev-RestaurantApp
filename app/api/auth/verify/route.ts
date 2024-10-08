import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserById } from '@/app/lib/data';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

interface JWTPayload {
    userID: string,
    email: string,
    type: string
}

export async function GET(req: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get('auth')?.value; 

    if (!token) {
        console.log("No Token Found")
        return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET) as {payload: JWTPayload};
        const user = await getUserById(payload.userID);
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        console.log(`Verified user is: ${JSON.stringify(user)}`);
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 500 });
    }
}
