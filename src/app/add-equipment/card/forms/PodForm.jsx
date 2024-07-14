"use client";

import { useState } from "react";
import styles from './forms.module.css';

export default function PodForm() {

  const [pod, setPod] = useState('');

  const handlePodSubmit = () => {

  }

  return (
    <form className={styles.form} onSubmit={handlePodSubmit}>
      <label className={styles.label} htmlFor="pods">סוג מצלמה</label>
      <select
        className={styles.input}
        id="pods"
        value={pod}
        onChange={(e) => setPod(e.target.value)}
      >
        <option value="">בחר סוג מצלמה</option>
        <option value="night-vision">ראיית לילה</option>
        <option value="black-white">שחור-לבן</option>
        <option value="thermal">תרמית</option>
      </select>

      <button className={styles.button} type="submit">הוספת מצלמה</button>
    </form>
  )
}
