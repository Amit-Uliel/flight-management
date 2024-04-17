'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './navbar.module.css';

// i will need to implement the get user role so i can
// display the right role based links
// * i will do that with session *
export default function Navbar(){
    
    // later i will use it to apply 'active' css
    const pathname = usePathname();
    
    // show the link exclusive to the role of the user that
    // signed in. 
    // * maybe i will change that function to show what is the role
    // of the user that signed in *
    // const addRoleLinks = () => {
        
    //     if (pathname.includes('/flight')) {
    //         return (
    //             <li className={styles.navbarItem}>
    //                 <Link 
    //                     className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
    //                     href="/flight"
    //                 >
    //                     flight
    //                 </Link>
    //             </li>
    //         );
    //     } 
    //     else if (pathname.includes('/operations')) {
    //         return (
    //             <li className={styles.navbarItem}>
    //                 <Link 
    //                     className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
    //                     href="/operations"
    //                 >
    //                     operations
    //                 </Link>
    //             </li>
    //         );
    //     } 
    //     else if (pathname.includes('/technical')) {
    //         return (
    //             <li className={styles.navbarItem}>
    //                 <Link 
    //                     className={`${styles.link} ${pathname === '#' ? styles.active:styles.hover}`}
    //                     href="/technical"
    //                 >
    //                     technical
    //                 </Link>
    //             </li>
    //         );
    //     } 
    // }
     
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
                            className={`${styles.logoutLink}`}
                            href={'/'}
                        >
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
                            className={`${styles.link} ${pathname === '/fuelCalculator' ? styles.active: styles.hover}`}
                            href={'/fuelCalculator'}
                        >
                            חישוב דלק
                        </Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link 
                            className={`${styles.link} ${pathname === '/main' ? styles.active:styles.hover}`}
                            href={'/main'}
                        >
                            ראשי
                        </Link>
                    </li>
                    {/* {addRoleLinks()} */}
                </ul>
            </nav>
        );
    } 
}