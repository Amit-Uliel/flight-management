"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './navLink.module.css';
import { useState } from 'react';

export default function NavLink({ item }) {
    const pathName = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div 
            className={styles.navLink} 
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
        >
            {item.dropdown ? (
                <span className={`${styles.link} ${styles.linkSpan} ${pathName.includes(item.path) && styles.active}`}>
                    {item.title}
                </span>
            ) : (
                <Link 
                    href={item.path}
                    className={`${styles.link} 
                        ${pathName === (item.path) && styles.active}`}
                >
                    {item.title}
                </Link>
            )}

            {item.dropdown && (
                <div className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}>
                    {item.dropdown.map((subLink) => (
                        <Link 
                            href={subLink.path} 
                            key={subLink.title} 
                            className={styles.dropdownLink}
                        >
                            {subLink.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}