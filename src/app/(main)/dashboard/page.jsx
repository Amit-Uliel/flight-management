import styles from './dashboard.module.css';
import AircraftsAvailabilityPieChart from './components/aircraftAvailabilityPieChart/AircraftsAvailabilityPieChart';
import FlightsList from './components/flightsList/FlightsList';
import ArmamentInfoBarChart from './components/armamentInfoBarChart/ArmamentInfoBarChart';
import SquadronUsersList from './components/squadronUsersList/SquadronUsersList';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={`${styles.box} ${styles.box1}`}>
        <AircraftsAvailabilityPieChart />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>
        <SquadronUsersList />
      </div>
      <div className={`${styles.box} ${styles.box4}`}>
        <FlightsList />
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