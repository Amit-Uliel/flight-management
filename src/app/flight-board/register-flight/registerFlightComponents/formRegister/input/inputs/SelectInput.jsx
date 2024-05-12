import styles from '../../formRegisterFlight.module.css';

export default function SelectInput({ onChange, value, name, label }) {
  return (
    <div className={styles.inputWrapper}>
        <label className={styles.label}>{label}</label>
        <select
            className={`${styles.input} ${styles.select}`}
            name={name}
            value={value}
            onChange={onChange}
        >
            <option value="no">לא</option>
            <option value="yes">כן</option>
        </select>
    </div>
  )
}
