import styles from './card.module.css';
import ArmamentCard from './forms/ArmamentForm';
import PlaneCard from './forms/PlaneForm';
import PodCard from './forms/PodForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faCamera, faBoxesStacked } from '@fortawesome/free-solid-svg-icons';

export default function Card({ type }) {
  switch(type)
  {
    case 'plane':
      return(
        <div className={`${styles.container} ${styles.planeContainer}`}>
          <h3 className={styles.h3}>
            <FontAwesomeIcon icon={faPlane}/>&nbsp;
            הוספת מטוס
          </h3>
          <PlaneCard />
        </div>
      );

    case 'armament':
      return(
        <div className={`${styles.container} ${styles.armamentContainer}`}>
          <h3 className={styles.h3}>
            <FontAwesomeIcon icon={faBoxesStacked}/>&nbsp;
            הוספת חימוש
          </h3>
          <ArmamentCard />
        </div>
      );

    case 'pod':
      return(
        <div className={`${styles.container} ${styles.podContainer}`}>
          <h3 className={styles.h3}>
            <FontAwesomeIcon icon={faCamera}/>&nbsp; 
            הוספת מצלמה
          </h3>
          <PodCard />
        </div>
      );
  }
}
