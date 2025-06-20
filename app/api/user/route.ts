import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: NextRequest) {
    const { userEmail, userName } = await req.json();
    try {
        // Check if user exists
        const existing = await db.select().from(usersTable)
            .where(eq(usersTable.email, userEmail));
        if (!existing || existing.length === 0) {
            // Insert new user with default credits
            await db.insert(usersTable).values({
                name: userName,
                email: userEmail,
                credits: 3,
            });
            // Fetch the newly inserted record
            const newUser = await db.select().from(usersTable)
                .where(eq(usersTable.email, userEmail));
            return NextResponse.json(newUser[0]);
        }
        // Return existing user
        return NextResponse.json(existing[0]);
    } catch (error) {
        console.error('User API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const email = searchParams?.get('email');

    if (email) {
        const result = await db.select().from(usersTable)
            .where(eq(usersTable.email, email));
        return NextResponse.json(result[0]);
    }
}