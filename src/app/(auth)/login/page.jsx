import '@/app/globals.css';
import Image from "next/image";
import styles from './login.module.css';

// Images import
import clouds from '@/../public/clouds.png'

// components
import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* logo images - air force & IDF */}
        <div className={styles.logosImages}>
          <Image
            src={'/AirForce.png'}
            width={100}
            height={100}
            quality={100}
            alt="Air Force logo"
          />
          <Image className={styles.lastImage}
            src={'/IDF.png'}
            width={100}
            height={100}
            quality={100}
            alt="IDF logo"
          />
        </div>
        {/* login form */}
        <div className={styles.flexContainer}>
          <h2 className={styles.h2title}>התחברות</h2>
          <LoginForm />
        </div>
      </div>

      <div className={styles.f35Images}>
        <Image
          className={styles.f35Image1}
          src={'/F35.png'}
          width={400}
          height={100}
          quality={100}
          alt="F35"
          style={{
            position: 'absolute',
            right: '0',
            bottom: '0',
            zIndex: '1',
          }}
        />
        <Image
          className={styles.f35Image2}
          src={'/F35.png'}
          width={280}
          height={70}
          quality={100}
          alt="F35"
          style={{
            position: 'absolute',
            transform: 'translate(120px, 140px)',
            right: '0',
            bottom: '0',
          }}
        />
      </div>
      <Image 
        src={clouds}
        fill
        quality={100}
        placeholder="blur"
        alt="Clouds"
        style={{
          position: 'absolute',
          left: '0',
          bottom: '-20%',
          zIndex: '-1',
          objectFit: 'cover',
        }}
      />
    </main>
  );
}
