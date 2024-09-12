"use client";

import styles from './flightBoard.module.css';
import FlightTable from './components/FlightTable';
import { motion } from 'framer-motion';

const instructionsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FlightBoard() {
  return (
    <div className={styles.container}>
      <motion.p
        className={styles.instructions}
        initial="hidden"
        animate="visible"
        variants={instructionsVariants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        לעריכת טיסה, לחצו על מספר הטיסה כדי להיכנס לפרטים. שם תוכלו לערוך את{' '}
        <span className={styles.highlight}>זמן ההמראה</span>,{' '}
        <span className={styles.highlight}>זמן הנחיתה המתוכנן</span> ואת{' '}
        <span className={styles.highlight}>ההערות</span>.
      </motion.p>
      <FlightTable />
    </div>
  );
}