import Calculator from './Calculator'
import styles from './calculator.module.css'

// font awasome icon import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';

export default function FuelCalculator() {
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <FontAwesomeIcon className={styles.icon} icon={faGasPump} />  חישוב דלק
      </h2>
      <Calculator/>
    </div>
  )
}
