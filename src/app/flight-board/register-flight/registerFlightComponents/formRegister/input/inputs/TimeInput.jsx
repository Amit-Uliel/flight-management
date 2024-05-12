import styles from '../../formRegisterFlight.module.css';

export default function TimeInput({ label, value, name, onChange }) {

    const handleHoursChange = (e) => {
        const newValue = e.target.value.trim(); // Remove leading and trailing spaces
        if (newValue === '' || (!isNaN(newValue) && parseInt(newValue, 10) >= 0 && parseInt(newValue, 10) <= 23)) {
            // Create a new time object with updated hours
            const newTime = { ...value, hours: newValue === '' ? '' : parseInt(newValue, 10) };
            // Call onChange with the updated time object
            onChange({ target: { name, value: newTime } });
        } else {
            console.log("Invalid hours value");
        }
    };
    
    const handleMinutesChange = (e) => {
        const newValue = e.target.value.trim(); // Remove leading and trailing spaces
        if (newValue === '' || (!isNaN(newValue) && parseInt(newValue, 10) >= 0 && parseInt(newValue, 10) <= 59)) {
            // Create a new time object with updated minutes
            const newTime = { ...value, minutes: newValue === '' ? '' : parseInt(newValue, 10) };
            // Call onChange with the updated time object
            onChange({ target: { name, value: newTime } });
        } else {
            console.log("Invalid minutes value");
        }
    };

    return (
        <div className={styles.inputWrapper}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputTimeWrapper}>
                <input
                    type="number"
                    className={`${styles.input} ${styles.inputTime}`}
                    value={value.hours}
                    min="0"
                    max="23"
                    name={name}
                    placeholder="שעות"
                    onChange={handleHoursChange}
                />
                <span className={styles.colon}>:</span>
                <input
                    type="number"
                    className={`${styles.input} ${styles.inputTime}`}
                    value={value.minutes}
                    min="0"
                    max="59"
                    name={name}
                    placeholder="דקות"
                    onChange={handleMinutesChange}
                />
            </div>
        </div>
    );
}
