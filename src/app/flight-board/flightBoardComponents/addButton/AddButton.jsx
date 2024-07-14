import styles from './addButton.module.css';
import Link from 'next/link';

export default function AddButton() {
  return (
    <Link href={'./flight-board/register-flight'} class={styles.link}>
      <span class={styles.IconContainer}> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={styles.cart}><path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"></path></svg>
      </span>
      <p class={styles.text}>הוספת טיסה</p>
    </Link>
  )
}
