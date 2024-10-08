import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { createUser } from "@/app/lib/data";

export async function POST(req: Request){
    try{
        const formData = await req.json();

        // console.log(formData)

        if (!formData.password) {
            throw new Error('Password is required');
        }

        const hashedPassword = await bcrypt.hash(formData.password, 10)
        const user = await createUser(formData.email, hashedPassword, formData.address, formData.name, formData.postcode, 
        );

        if(user){
            const { password, ...userWithoutPassword } = user;
            return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
        }

        return NextResponse.json({ error: "User creation failed "}, { status: 500 })
    } catch (e) {
        console.error('Error creating user:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
