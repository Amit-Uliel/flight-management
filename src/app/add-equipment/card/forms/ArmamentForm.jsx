"use client";

import { useState } from "react";
import styles from './forms.module.css';

export default function ArmamentForm() {

  const [armament, setArmament] = useState('');

  const handleArmamentSubmit = () => {

  }

  return (
    <form className={styles.form} onSubmit={handleArmamentSubmit}>

      <label className={styles.label} htmlFor="armaments">סוג חימוש</label>
      <select
        className={styles.input}
        id="armaments"
        value={armament}
        onChange={(e) => setArmament(e.target.value)}
      >
        <option value="">בחר סוג חימוש</option>
        <option value="yellow">צהוב</option>
        <option value="red">אדום</option>
        <option value="blue">כחול</option>
      </select>

      <button className={styles.button} type="submit">הוספת חימוש</button>

    </form>
  )
}
