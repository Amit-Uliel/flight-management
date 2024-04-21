import styles from './registerFlight.module.css';

// icons import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

// components
import FormRegisterFlight from './_registerFlightComponents/FormRegisterFlight.jsx';

export default function RegisterFlight() {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            הוספת טיסה <FontAwesomeIcon icon={faPlaneDeparture} />
          </h2>
            <FormRegisterFlight/>
        </div>
    </main>
  )
}
