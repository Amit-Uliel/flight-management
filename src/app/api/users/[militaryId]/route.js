import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

// update user fields
export async function PATCH(req, { params }) {
    const { militaryId } = params;

    try {
        const data = await req.json();

         // Update other user fields with Prisma
         const updatedUser = await prisma.user.update({
            where: {
                militaryId,
            },
            data: {
                name: data.name,
                role: data.role,
                rank: data.rank,
                squadronId: data.squadronId,
            },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'עדכון משתמש נכשל' }, { status: 500 });
    }
}

// delete user details
export async function DELETE(){
}