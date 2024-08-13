import styles from '../styles/card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Card({ title, icon, children }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>
        <FontAwesomeIcon icon={icon} />&nbsp;
        {title}
      </h3>
      {children}
    </div>
  );
}