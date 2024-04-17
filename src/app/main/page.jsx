// styles
import styles from './main.module.css';

// components
import Table from '@/app/main/_mainComponents/_table/Table';
import AddButton from './_mainComponents/_addButton/AddButton.jsx';

export default function Main() {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <AddButton />
            <Table />
        </div>
    </main>
  )
}
