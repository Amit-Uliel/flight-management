import styles from '../../formRegisterFlight.module.css';

// date picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerInput({ onChange, value, name, label }) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
        <DatePicker
            selected={value}
            onChange={onChange}
            name={name}
            className={styles.input}
            dateFormat="dd/MM/yyyy"
        />
    </div>
  )
}
