import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { handleLogin } from "@/app/lib/data"
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.AUTH_SECRET as string;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await handleLogin(body.email, body.password);

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { userID: user.id, email: user.email , type: user.type}, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        const response = NextResponse.json({ message: 'Login Successful' });
        response.headers.set('Set-Cookie', serialize('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600,
            path: '/'
        }));

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}