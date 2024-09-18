import styles from './Snackbar.module.css';

export default function Snackbar({ message, type }) {
    return (
        <div className={`${styles.snackbar} ${styles[type]}`}>
            {message}
        </div>
    );
}