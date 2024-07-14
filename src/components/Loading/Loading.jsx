import styles from './loading.module.css';

export default function Loading() {
  return(  
        <div className={styles.div}>
            <span className={styles.circle}></span>
            <div className={styles.divTwo}>
                <span className={styles.firstLetter}>ט</span>
                <span className={styles.secondLetter}>ע</span>
                <span className={styles.thirdLetter}>י</span>
                <span className={styles.forthLetter}>נ</span>
                <span className={styles.fifthLetter}>ה</span>
                <span className={styles.dotOne}></span>
                <span className={styles.dotTwo}></span>
                <span className={styles.dotThree}></span>
            </div>
        </div>
    );
}
