'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteSquadron(formData){
    const squadronId = formData.get('squadronId');

    if(!squadronId){
        return { error: 'אנא מלא את מספר הטייסת' };
    }

    // check for numerical only and length 1-3
    const regex = /^\d{1,3}$/;

    if(!regex.test(squadronId)){
        return { error: 'מספר טייסת צריך להיות מספרים בלבד ובאורך 3 תווים' };
    }

    try {
        const intSquadronId = parseInt(squadronId);

        // check if the squadron exist
        const squadron = await prisma.squadron.findUnique({
            where:{
                squadronId: intSquadronId,
            }
        });

        // if squadron does not exist 
        if(!squadron){
            return { error: 'הטייסת לא קיימת במערכת' };
        }

        await prisma.squadron.delete({
            where: {
                squadronId: intSquadronId,
            }
        });
        
        return({message: 'הטייסת נמחקה בהצלחה'});
    } catch (error) {
        console.error(error);
        return { error: 'מחיקת טייסת נכשלה' };
    }
}