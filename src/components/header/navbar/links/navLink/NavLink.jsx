"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// styles import
import styles from './navLink.module.css';

export default function navLink({ item }) {

    const pathName = usePathname();

    return (
        <Link 
            href={item.path}
            className={`${styles.link} 
                ${pathName.includes(item.path) && styles.active}`}>
            {item.title}
        </Link>
    )
}
