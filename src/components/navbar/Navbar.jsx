import Image from 'next/image';
import Links from './links/Links';
import styles from './navbar.module.css';
import Indicator from './indicator/Indicator';

// the navigation bar
export default function Navbar() {
  return (
    <div className={styles['navbar-container']}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Image
            src={'/AirForce.png'}
            alt='air-force'
            width={80}
            height={80}
            quality={100}
          />
        </div>
        <div className={styles.links}>
          <Links />
        </div>
        <div className={styles.indicator}>
          <Indicator />
        </div>
      </div>
    </div>
  );
}