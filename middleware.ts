import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth')?.value;
    
    if (!token) {
        console.log('No token found. Redirecting to login.');
        return NextResponse.redirect(new URL('/account/login', req.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        // console.log('JWT verification successful:', payload);
    } catch (err) {
        console.log('JWT verification failed:', err);
        return NextResponse.redirect(new URL('/account/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/dashboard', '/admin'], 
};
