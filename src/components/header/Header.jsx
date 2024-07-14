"use client";

import Navbar from "./navbar/Navbar";
import Indicator from "./indicator/Indicator";
import styles from './header.module.css';
import { usePathname } from "next/navigation";

// ! i can use fetch to get user role and then deliever it to the navbar and indicator for further use !

export default function Header() {
  
  const pathname = usePathname();

  return (
      <>
        {(pathname !== '/' && !pathname.includes('/login')) && (
            <header className={styles.header}>
                <Navbar />
                <Indicator />
            </header>
        )}
      </>
  );
}

