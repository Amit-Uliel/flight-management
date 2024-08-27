"use client";

import styles from './indicator.module.css'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Indicator() {
    
    const roleName = "הטסה";
    const router = useRouter();

    const handleSignOut = () => {
        // Clear the JWT token from cookies
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        
        // Redirect to login page
        router.push('/login');
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