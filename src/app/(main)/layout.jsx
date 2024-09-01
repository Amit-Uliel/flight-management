import React from 'react';
import Navbar from "@/components/navbar/Navbar";
import '../globals.css';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>   
        </>  
    );
}