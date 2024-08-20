
import styles from './registerFlight.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import FlightForm from '../flight-board/flightBoardComponents/FlightForm';

export default function RegisterFlight() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href={'/flight-board'} className={styles.link}>חזרה</Link>
        <h2 className={styles.title}>
          הוספת טיסה &nbsp; <FontAwesomeIcon className={styles.icon} icon={faPlaneDeparture} />
        </h2>
        <FlightForm />
      </div>
    </main>
  )
}