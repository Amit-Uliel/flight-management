'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout(){
    const supabase = createClient();
    const cookieStore = cookies();

    const { error } = await supabase.auth.signOut();

    if(error){
        redirect('/error')
    }

    cookieStore.getAll().forEach(cookie => cookieStore.delete(cookie.name));

    revalidatePath('/', 'layout');
    redirect('/login');
}