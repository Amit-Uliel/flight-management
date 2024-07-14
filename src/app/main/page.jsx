import styles from './main.module.css';
import Card from './mainComponents/card/Card';

export default function Main() {
  return (
    <main>
      <div className={styles.container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  )
}
