import Image from 'next/image';

// components import
import Links from './links/Links';

// styles import
import styles from './navbar.module.css';

// the navigation bar
export default function Navbar() {
  return (
    <div className={styles.container}>
        <div>
            <Image
                src={'/AirForce.png'}
                alt='air-force'
                width={80}
                height={80}
                quality={100}
            />
        </div>
        <div>
            <Links />    
        </div>
    </div>
  )
}
