import styles from '../../formRegisterFlight.module.css';

export default function TextAreaInput({ onChange, value, name, label }) {
  return (
    <div className={styles.textareaWrapper}>
        <label className={styles.label}>{label}</label>
            <textarea
                className={styles.textarea}
                rows="5"
                name={name}
                value={value}
                onChange={onChange}
            />
    </div>
  )
}
