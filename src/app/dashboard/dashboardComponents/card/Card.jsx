import styles from './card.module.css';
import LineChartComponent from '../charts/LineChart';

export default function Card() {
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>כותרת</h3>
        <LineChartComponent />
        
    </div>
  )
}
