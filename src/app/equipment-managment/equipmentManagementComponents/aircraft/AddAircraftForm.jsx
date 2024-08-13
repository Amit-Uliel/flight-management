"use client";

import { useState } from "react";
import styles from '../styles/forms.module.css';

export default function AircraftForm() {
  const [tailNumber, setTailNumber] = useState('');
  const [model, setModel] = useState('');
  const [squadron, setSquadron] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAircraftSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validation
    if (!tailNumber || !model || !squadron) {
      setError('נא למלא את כל השדות');
      return;
    }

    try {
      const response = await fetch('/api/aircrafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tailNumber, model, squadron }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error');
      }
  
      const data = await response.json();
      console.log('Aircraft added:', data);
      setSuccessMessage('מטוס נוסף בהצלחה');
      setTailNumber('');
      setModel('');
      setSquadron('');
    } catch (error) {
      console.error('Failed to add aircraft:', error);
      setError(error.message || 'בעיה בהוספת מטוס');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleAircraftSubmit}>
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
        <option value="HERMES_450">הרמס 450</option>
        <option value="HERMES_900">הרמס 900</option>
        <option value="HERMES_1000">הרמס 1000</option>
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

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
}