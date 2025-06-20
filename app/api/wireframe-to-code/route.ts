import { db } from "@/configs/db";
import { usersTable, WireframeToCodeTable } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { description, imageUrl, model, uid, email } = await req.json();
        console.log('Wireframe request:', { uid, email, model });

        const creditResult = await db.select().from(usersTable)
            .where(eq(usersTable.email, email));

        if (creditResult[0]?.credits && creditResult[0]?.credits > 0) {
            // Insert wireframe record
            await db.insert(WireframeToCodeTable).values({
                uid: uid.toString(),
                description: description,
                imageUrl: imageUrl,
                model: model,
                createdBy: email
            });

            // Get the inserted record
            const result = await db.select()
                .from(WireframeToCodeTable)
                .where(eq(WireframeToCodeTable.uid, uid.toString()));

            // Update user credits
            await db.update(usersTable).set({
                credits: creditResult[0]?.credits - 1
            }).where(eq(usersTable.email, email));

            return NextResponse.json(result[0]);
        } else {
            return NextResponse.json({ 'error': 'Not enough credits' });
        }
    } catch (error) {
        console.error('Wireframe API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const uid = searchParams?.get('uid');
    const email = searchParams?.get('email');
    if (uid) {
        const result = await db.select()
            .from(WireframeToCodeTable)
            .where(eq(WireframeToCodeTable.uid, uid));
        return NextResponse.json(result[0]);
    }
    else if (email) {
        const result = await db.select()
            .from(WireframeToCodeTable)
            .where(eq(WireframeToCodeTable.createdBy, email))
            .orderBy(desc(WireframeToCodeTable.id))
            ;
        return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'No Record Found' })

}

export async function PUT(req: NextRequest) {
    try {
        const { uid, codeResp } = await req.json();

        await db.update(WireframeToCodeTable)
            .set({
                code: codeResp
            }).where(eq(WireframeToCodeTable.uid, uid));

        // Get updated record
        const result = await db.select()
            .from(WireframeToCodeTable)
            .where(eq(WireframeToCodeTable.uid, uid));

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error('Update code error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}