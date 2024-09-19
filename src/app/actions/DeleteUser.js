'use server';

import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function deleteUser(militaryId) {
    try {
        // Retrieve the user's UUID from the database
        const user = await prisma.user.findUnique({
            where: { militaryId },
            select: { uuid: true },
        });

        if (!user || !user.uuid) {
            throw new Error('המשתמש לא נמצא או ש-UUID חסר');
        }

        // Delete the user from Supabase Auth
        const { error: authError } = await supabase.auth.admin.deleteUser(user.uuid);
        if (authError) {
            console.error('שגיאה במחיקת המשתמש ממערכת Supabase Auth:', authError.message);
            throw new Error('שגיאה במחיקת המשתמש ממערכת האימות');
        }

        // Delete the user from Prisma database
        await prisma.user.delete({
            where: { militaryId },
        });

        // List all files in the directory
        const { data: files, error: listError } = await supabase
            .storage
            .from('profile-images')
            .list(`${militaryId}`);

        if (listError) {
            console.error('שגיאה בקבלת רשימת הקבצים:', listError.message);
            throw new Error('שגיאה בקבלת רשימת הקבצים מהתיקייה');
        }

        // Create an array of file paths to delete
        const filePaths = files.map(file => `${militaryId}/${file.name}`);

        // Delete all files in the directory
        const { error: storageError } = await supabase
            .storage
            .from('profile-images')
            .remove(filePaths);

        if (storageError) {
            console.error('שגיאה במחיקת הקבצים מ-Supabase Storage:', storageError.message);
            throw new Error('שגיאה במחיקת הקבצים מאחסון Supabase');
        }

        return { message: 'המשתמש נמחק בהצלחה' };
    } catch (error) {
        console.error('שגיאה במחיקת המשתמש:', error.message);
        throw new Error(`שגיאה במחיקת המשתמש: ${error.message}`);
    }
}