import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth')?.value;
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        jwt.verify(token, process.env.AUTH_SECRET || 'your-secret-key');
        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/account'], 
};
