import Image from 'next/image';
import Links from './components/links/Links';
import styles from './navbar.module.css';
import Indicator from './components/indicator/Indicator';
import { getRoleName } from '@/utils/getUserDetails';

// the navigation bar
export default async function Navbar() {

  const role = await getRoleName();
  const isAdmin = role === 'אדמין';

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
        <Links isAdmin={isAdmin} />
      </div>
      <div className={styles.indicator}>
        <Indicator />
      </div>
    </div>
  );
}