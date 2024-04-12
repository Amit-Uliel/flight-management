'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './navbar.module.css';

// i will need to implement the get user role so i can
// display the right role based links
// *i will do that with session*
export default function Navbar(){
    
    // later i will use it to apply 'active' css
    const pathname = usePathname();
    
    const addRoleLinks = () => {
        
        if (pathname.includes('/flight')) {
            return (
                <li className={styles.navbarItem}>
                    <Link 
                        className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
                        href="/flight"
                    >
                        flight
                    </Link>
                </li>
            );
        } 
        else if (pathname.includes('/operations')) {
            return (
                <li className={styles.navbarItem}>
                    <Link 
                        className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
                        href="/operations"
                    >
                        operations
                    </Link>
                </li>
            );
        } 
        else if (pathname.includes('/technical')) {
            return (
                <li className={styles.navbarItem}>
                    <Link 
                        className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
                        href="/technical"
                    >
                        technical
                    </Link>
                </li>
            );
        } 
    }
     
    if(pathname === '/')
    {
        return '';
    }

    else
    {
        return(
            <nav className={styles.navbar}>
                <ul className={styles.navbarList}>
                    <li className={`${styles.logoutLinkItem} ${styles.navbarItem}`}>
                        <Link 
                            className={`${styles.link} ${styles.hover}`}
                            href={'/'}
                        >
                            {/* i will implement here whoAmI() so i can show the user 
                                to where he has connected and when he hover then options */}
                            יציאה
                        </Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link 
                            className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
                            href={'#'}
                        >
                            היסטוריה
                        </Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link 
                            className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
                            href={'#'}
                        >
                            תליית חימוש
                        </Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link 
                            className={`${styles.link} ${pathname === '#' ? styles.active: styles.hover}`}
                            href={'#'}
                        >
                            חישוב דלק
                        </Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link 
                            className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
                            href={'#'}
                        >
                            ראשי
                        </Link>
                    </li>
                    {addRoleLinks()}
                </ul>
            </nav>
        );
    } 
}