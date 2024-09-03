import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserById } from '@/app/lib/data';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.AUTH_SECRET as string;

export async function POST(req: Request) {
    const { token } = await req.json();

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userID: string };
        const user = await getUserById(decoded.userID);

        if (!user) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}

export async function GET(req: Request) {
    try {
        const token = cookies().get('auth')?.value;

        if (!token) {
            return NextResponse.json({ error: 'No token found' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userID: string };
        const user = await getUserById(decoded.userID);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ userType: user.type });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
