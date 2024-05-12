import styles from './registerFlight.module.css';
import Link from 'next/link';

// icons import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

// components
import FormRegisterFlight from './registerFlightComponents/formRegister/FormRegisterFlight.jsx';

export default function RegisterFlight() {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
          <Link href={'/flight-board'} className={styles.link}>חזרה</Link>
          <h2 className={styles.title}>
            הוספת טיסה <FontAwesomeIcon className={styles.icon} icon={faPlaneDeparture} />
          </h2>
          <FormRegisterFlight/>
        </div>
    </main>
  )
}