import styles from './dashboard.module.css';
import AircraftsAvailabilityPieChart from './components/aircraftAvailabilityPieChart/AircraftsAvailabilityPieChart';
import FlightsList from './components/flightsList/FlightsList';
import ArmamentInfoBarChart from './components/armamentInfoBarChart/ArmamentInfoBarChart';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={`${styles.box} ${styles.box1}`}>
        <AircraftsAvailabilityPieChart />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>
        box 2
      </div>
      <div className={`${styles.box} ${styles.box3}`}>
        box 3
      </div>
      <div className={`${styles.box} ${styles.box4}`}>
        <FlightsList />
      </div>
      <div className={`${styles.box} ${styles.box5}`}>
        box 5
      </div>
      <div className={`${styles.box} ${styles.box6}`}>
        box 6
      </div>
      <div className={`${styles.box} ${styles.box7}`}>
        <ArmamentInfoBarChart />
      </div>
      <div className={`${styles.box} ${styles.box8}`}>
        box 8
      </div>
      <div className={`${styles.box} ${styles.box9}`}>
        box 9
      </div>
    </div>
  )
}