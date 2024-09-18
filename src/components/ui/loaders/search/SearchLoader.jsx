import styles from './SearchLoader.module.css';

export default function SearchLoader() {
    return (
        <div className={styles.loader}>
            <div className={`${styles.square} ${styles.sq1}`}></div>
            <div className={`${styles.square} ${styles.sq2}`}></div>
            <div className={`${styles.square} ${styles.sq3}`}></div>
            <div className={`${styles.square} ${styles.sq4}`}></div>
            <div className={`${styles.square} ${styles.sq5}`}></div>
            <div className={`${styles.square} ${styles.sq6}`}></div>
            <div className={`${styles.square} ${styles.sq7}`}></div>
            <div className={`${styles.square} ${styles.sq8}`}></div>
            <div className={`${styles.square} ${styles.sq9}`}></div>
        </div>
    );
}