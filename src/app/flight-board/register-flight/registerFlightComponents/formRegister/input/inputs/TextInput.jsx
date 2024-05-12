import styles from '../../formRegisterFlight.module.css';

export default function TextInput({ onChange, value, name, label }) {
  return (
    <div className={styles.inputWrapper}>
        <label className={styles.label}>{label}</label>
        <input
            type="text"
            className={styles.input}
            name={name}
            value={value}
            onChange={onChange}
        />
    </div>
  )
}
