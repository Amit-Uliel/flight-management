// "use client";

import Image from 'next/image';
import Links from './components/links/Links';
import styles from './navbar.module.css';
import Indicator from './components/indicator/Indicator';

// the navigation bar
export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Image
        className={styles.logo}
        src={'/AirForce.png'}
        alt='air-force'
        width={80}
        height={80}
        quality={100}
        priority={true}
      />
      <div className={styles.links}>
        <Links />
      </div>
      <div className={styles.indicator}>
        <Indicator />
      </div>
    </div>
  );
}