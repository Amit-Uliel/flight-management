import styles from './formRegisterFlight.module.css';

export default function FormRegisterFlight() {
  return (
    <div className={styles.formWrapper}>
        <form className={styles.form}>
            <div className={styles.inputsWrapper}>
                <input type="text" className={styles.input} placeholder='טייסת'/>
                <input type="text" className={styles.input} placeholder='מספר זנב'/>
                <input type="text" className={styles.input} placeholder='שם משימה'/>
                <input type="text" className={styles.input} placeholder='תאריך מסירה'/>
                <input type="text" className={styles.input} placeholder='שעת מסירה'/>
                <input type="text" className={styles.input} placeholder='מסור'/>
                <input type="text" className={styles.input} placeholder='הנעה'/>
                <input type="text" className={styles.input} placeholder='המראה'/>
                <input type="text" className={styles.input} placeholder='נחת'/>
                <input type="text" className={styles.input} placeholder='נחיתה'/>
                <input type="text" className={styles.input} placeholder='מטעד'/>
                <input type="text" className={styles.input} placeholder='חימוש'/>
            </div>
            <div className={styles.textareaWrapper}>
                <textarea className={styles.textarea} rows="5" placeholder='הערות'></textarea>
            </div>
            <button type="submit" className={styles.button}>הוספה</button>
        </form>
    </div>
  )
}
