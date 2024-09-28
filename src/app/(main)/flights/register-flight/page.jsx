
import styles from './registerFlight.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import FlightForm from './components/FlightForm';

export default function RegisterFlight() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          רישום טיסה &nbsp; <FontAwesomeIcon className={styles.icon} icon={faPlaneDeparture} />
        </h2>
        <FlightForm />
      </div>
    </div>
  )
}