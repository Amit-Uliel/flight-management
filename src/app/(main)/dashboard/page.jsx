"use client";

import styles from './dashboard.module.css';
import AircraftsAvailabilityPieChart from './components/aircraftAvailabilityPieChart/AircraftsAvailabilityPieChart';
import FlightsList from './components/flightsList/FlightsList';
import ArmamentInfoBarChart from './components/armamentInfoBarChart/ArmamentInfoBarChart';
import SquadronUsersList from './components/squadronUsersList/SquadronUsersList';
import FlightsAssignedCurrentMonthLineChart from './components/flightsAssignedCurrentMonth/FlightsAssignedCurrentMonthLineChart';
import { motion } from 'framer-motion';

const boxVariants = {
  hidden: {
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1, 
    y: 0,
  }
}

const dashboardGridVariants = {
  hidden: {
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.3
    },
  },
}

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <motion.div 
        className={styles.dashboardGrid}
        variants={dashboardGridVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div 
          className={`${styles.box} ${styles.box1}`}
          variants={boxVariants}
        >
          <AircraftsAvailabilityPieChart />
        </motion.div>
        <motion.div 
          className={`${styles.box} ${styles.box2}`}
          variants={boxVariants}
        >
          <SquadronUsersList />
        </motion.div>
        <motion.div 
          className={`${styles.box} ${styles.box4}`}
          variants={boxVariants}
        >
          <FlightsList />
        </motion.div>
        <motion.div 
          className={`${styles.box} ${styles.box7}`}
          variants={boxVariants}
        >
          <ArmamentInfoBarChart />
        </motion.div>
        <motion.div 
          className={`${styles.box} ${styles.box8}`}
          variants={boxVariants}
        >
          <FlightsAssignedCurrentMonthLineChart />
        </motion.div>
      </motion.div>
    </div>
  )
}