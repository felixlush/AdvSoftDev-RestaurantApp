import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {

    cookies().set({
        name: 'auth',
        value: ''
    });
    return NextResponse.json({ message: 'Logout successful' });
}
