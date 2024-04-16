import Calculator from './Calculator'
import styles from './calculator.module.css'

export default function FuelCalculator() {
  
    return (
    <main className={styles.main}>
      <h2 className={styles.title}>חישוב דלק</h2>
      <div className={styles.container}>
        <Calculator/>
      </div>
    </main>
  )
}
