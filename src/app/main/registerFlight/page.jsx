import styles from './registerFlight.module.css';

// components
import FormRegisterFlight from './_registerFlightComponents/FormRegisterFlight.jsx';

export default function CreateRow() {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
          <h2 className={styles.title}>הוספת טיסה</h2>
            <FormRegisterFlight/>
        </div>
    </main>
  )
}
