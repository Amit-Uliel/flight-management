import styles from './styles/MissionStatusModal.module.css';

const MissionStatusModal = ({ onSelect }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>בחירת סטטוס משימה</h2>
        <p className={styles.cancelExplanation}><strong className={styles.cancelWord}>ביטול</strong> יעדכן את המשימה כמבוטלת <span className={styles.underline}>ולא יהיה אפשר</span> לבחור בה שוב דרך רישום טיסות.</p>
        <p className={styles.onholdExplanation}>
            <strong className={styles.onholdWord}>המתנה</strong> יעדכן את המשימה כממתינה <span className={styles.underline}>ויהיה אפשר</span> לבחור בה שוב דרך רישום טיסות.
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={() => onSelect('ONHOLD')} className={styles.onHoldButton}>
            המתנת משימה
          </button>
          <button onClick={() => onSelect('CANCELED')} className={styles.canceledButton}>
            ביטול משימה
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionStatusModal;