import styles from './addEquipment.module.css';
import Card from './card/Card';

export default function addEquipment() {
  return (
    <main>
        <div className={styles.container}>
            <Card type={'plane'} />
            <Card type={'armament'} />
            <Card type={'pod'} />
        </div>
    </main>
  )
}
