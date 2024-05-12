"use client";

import Navbar from "./navbar/Navbar";
import Indicator from "./indicator/Indicator";
import styles from './header.module.css';
import { usePathname } from "next/navigation";

export default function Header() {
  
  const pathname = usePathname();

  return (
      <>
        {(pathname !== '/' && !pathname.includes('/login')) && (
            <header className={styles.header}>
                {/* <Indicator /> */}
                <Navbar />
            </header>
        )}
      </>
  );
}

