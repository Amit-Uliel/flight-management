import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all the squadrons numbers
export async function GET() {

    try {
        const squadrons = await prisma.squadron.findMany();
        return NextResponse.json(squadrons);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'לא הצליח לייבא מספר טייסות'}, { status: 500 });
    }
}