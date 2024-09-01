import '@/app/globals.css';
import Image from "next/image";
import styles from './login.module.css';
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoImages}>
            <Image className={styles.firstImage}
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
        <LoginForm/>
      </div>
    </div>
  );
}
