import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { handleLogin } from "@/app/lib/data";
import { serialize } from 'cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await handleLogin(body.email, body.password);

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = await new SignJWT({ userID: user.id, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1h')
            .sign(JWT_SECRET);

        const response = NextResponse.json({ message: 'Login Successful' });
        
        response.cookies.set('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}