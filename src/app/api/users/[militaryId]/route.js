import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// get user by military id
export async function GET(req, { params }){
    const { militaryId } = params;
    
    // no military id
    if(!militaryId){
        return NextResponse.json({error: 'לא התקבל מספר אישי של משתמש'}, {status: 400});
    }

    try{
        const user = await prisma.user.findUnique({
            where:{
                militaryId,
            },
        });

        // no user
        if(!user) {
            return NextResponse.json({ error: 'משתמש לא נמצא' }, { status: 404 });
        }

        return NextResponse.json(user, {status: 200});
    } catch {
        return NextResponse.json({error: 'לא הצליח לייבא משתמש'}, {status: 500});
    }
}