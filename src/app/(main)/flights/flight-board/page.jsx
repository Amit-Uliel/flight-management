
import styles from './flightBoard.module.css';
import FlightTable from './components/FlightTable';

export default function FlightBoard() {
  return (
    <div className={styles.container}>
      <p className={styles.instructions}>
        לעריכת טיסה, לחצו על מספר הטיסה כדי להיכנס לפרטים. שם תוכלו לערוך את <em>זמן ההמראה</em>, <em>זמן הנחיתה המתוכנן</em> ואת <em>ההערות</em>.
      </p>
      <FlightTable />
    </div>
  );
}