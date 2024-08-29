import styles from './dashboard.module.css';
import Card from './dashboardComponents/card/Card';

export default function Dashboard() {
  return (
      <div className={styles.container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
  )
}