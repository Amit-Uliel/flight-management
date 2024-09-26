'use server';

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createSquadron(formData){

    const squadronId = formData.get('squadronId');

    if(!squadronId){
        return { error: 'אנא מלא את מספר הטייסת' };
    }

    // check for numerical only and length 1-3
    const regex = /^\d{1,3}$/;

    if(!regex.test(squadronId)){
        return { error: 'מספר טייסת צריך להיות מספרים בלבד ובאורך 3 תווים' };
    }
    
    try{
        // convert the squadron id to integer
        const intSquadronId = parseInt(squadronId);

        // check if the squadron already exist in the db
        const squadron = await prisma.squadron.findUnique({
            where: {
                squadronId: intSquadronId,
            }
        });

        // if squadron exist return an error
        if(squadron){
            return { error: 'הטייסת כבר קיימת במערכת' };
        }

        // create the squadron
        await prisma.squadron.create({
            data: {
                squadronId: intSquadronId,
            }
        });

        revalidatePath('/admin/user-actions/create-user');
        return { message: 'טייסת נוצרה בהצלחה' };
    } catch(error) {
        console.error(error);
        return { error: 'יצירת טייסת נכשלה' };    
    }
}