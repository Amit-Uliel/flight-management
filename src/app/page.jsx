import "./globals.css";
import Image from "next/image";
import styles from './login.module.css';

// components
import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.logosImages}>
        <Image
          src={'/AirForce.png'}
          width={100}
          height={100}
          alt="Air Force logo"
        />
        <Image className={styles.lastImage}
          src={'/IDF.jpg'}
          width={100}
          height={100}
          alt="IDF logo"
        />
      </div>
      
      {/* login form */}
      <div className={styles.flexForm}>
        <h2 className={styles.h2title}>התחברות</h2>
        <LoginForm />
      </div>

      <div className={styles.f35Images}>
        <Image
            src={'/F35.png'}
            width={200}
            height={50}
            alt="IDF logo"
        />
        <Image 
          src={'/F35.png'}
          width={400}
          height={100}
          alt="F35"
        />
      </div>
    </main>
  );
}
