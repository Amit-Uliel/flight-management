import React from 'react';
import Navbar from "@/components/navbar/Navbar";
import '../globals.css';

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}    
        </>  
    );
}