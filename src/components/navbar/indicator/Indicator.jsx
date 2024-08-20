"use client";

import styles from './indicator.module.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Indicator() {
    
    const roleName = "הטסה";

    const handleSignOut = () => {
        // Handle sign-out logic here
        // session clearance
        // redirect to login page
        alert('Signed out');
    };

    return (
        <div className={styles.container}> 
            <div className={styles.roleContainer}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <span className={styles.roleName}>{roleName}</span>
            </div>
            <div className={styles.dropdown}>
                <button className={styles.signOutButton} onClick={handleSignOut}>
                    יציאה
                </button>
            </div>
        </div>
    )
}