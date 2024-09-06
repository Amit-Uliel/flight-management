
import styles from './flightBoard.module.css';
import FlightTable from './components/FlightTable';

export default function FlightBoard() {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>לוח טיסות</h2>
      <FlightTable  />
    </div>
  );
}