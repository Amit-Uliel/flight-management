"use client";

import { useState } from "react";
import styles from './forms.module.css';

export default function PlaneForm() {

  const [tailNumber, setTailNumber] = useState('');
  const [model, setModel] = useState('');
  const [squadron, setSquadron] = useState('');

  const handlePlaneSubmit = () => {
      // insert to db
  }

  return (
    <form className={styles.form} onSubmit={handlePlaneSubmit}>
      <label className={styles.label} htmlFor="tailNumber">מספר זנב</label>
      <input
        className={styles.input}
        type="text"
        id="tailNumber"
        value={tailNumber}
        onChange={(e) => setTailNumber(e.target.value)} 
      />

      <label className={styles.label} htmlFor="models">מודל</label>
      <select
        className={styles.input}
        id="models"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="">בחר מודל</option>
        <option value="hermes_450">הרמס 450</option>
        <option value="hermes_900">הרמס 900</option>
        <option value="hermes_1000">הרמס 1000</option>
      </select>

      <label className={styles.label} htmlFor="squadron">טייסת</label>
      <select
        className={styles.input}
        id="squadron"
        value={squadron}
        onChange={(e) => setSquadron(e.target.value)}
      >
        <option value="">בחר טייסת</option>
        <option value="161">161</option>
        <option value="166">166</option>
      </select>

      <button className={styles.button} type="submit">הוספת מטוס</button>
    </form>
  )
}
