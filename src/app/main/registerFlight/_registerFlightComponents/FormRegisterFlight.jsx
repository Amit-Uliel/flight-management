"use client"
// hooks
import { useState } from 'react';

// styles import
import styles from './formRegisterFlight.module.css';

export default function FormRegisterFlight() {

  const [formData, setFormData] = useState({
    טייסת: '',
    'מספר זנב': '', 
    'שם משימה': '', 
    'תאריך מסירה': new Date(), // Example date value
    'שעת מסירה': '', 
    מסור: false, // Example boolean value
    הנעה: true, // Example boolean value
    המראה: '', 
    נחת: '', 
    נחיתה: '', 
    מטעד: '', 
    חימוש: '', 
    הערות: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.formWrapper}>
        <form className={styles.form}>
            <div className={styles.inputsWrapper}>

              {/* -- testing -- */}
              {Object.entries(formData).map(([key, value]) => (
                key === 'מסור' || key === 'הנעה' ? (

                  <select
                    key={key}
                    className={styles.select}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  >
                    <option value="no">לא</option>
                    <option value="yes">כן</option>
                  </select>
                ) : key !== 'הערות' && ( // Skip rendering for 'הערות' key
                // Handle non-boolean values
                  <input
                    key={key}
                    type="text"
                    className={styles.input}
                    name={key}
                    value={value}
                    placeholder={key}
                    onChange={handleChange}
                  />
                )
              ))}

 
              {/* -- testing -- */}

                {/* <input type="text" className={styles.input} placeholder='טייסת'/>
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
                <input type="text" className={styles.input} placeholder='חימוש'/> */}
            </div>
            <div className={styles.textareaWrapper}>
                <textarea className={styles.textarea} rows="5" placeholder='הערות'></textarea>
            </div>
            <button type="submit" className={styles.button}>הוספה</button>
        </form>
    </div>
  )
}
