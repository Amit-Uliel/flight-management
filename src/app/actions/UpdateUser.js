'use server';

import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Function to update user
export async function updateUser(militaryId, data) {
    try {
        // Retrieve the user's UUID directly from the database
        const user = await prisma.user.findUnique({
            where: {
                militaryId,
            },
            select: {
                uuid: true,
            },
        });

        if (!user || !user.uuid) {
            throw new Error('User not found');
        }

        // Update password if provided
        if (data.password) {
            const { error: passwordError } = await supabase.auth.admin.updateUserById(user.uuid, {
                password: data.password,
            });
            if (passwordError) {
                throw new Error(`Password update failed: ${passwordError.message}`);
            }
        }

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

        return updatedUser;
    } catch (error) {
        throw new Error(`User update failed: ${error.message}`);
    }
}