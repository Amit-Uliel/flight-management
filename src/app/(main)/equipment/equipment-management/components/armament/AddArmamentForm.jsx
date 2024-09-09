"use client";

import { useState } from "react";
import styles from '../styles/forms.module.css';

export default function ArmamentForm() {
  const [armament, setArmament] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleArmamentSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Default quantity to 1 if not specified
    const quantityValue = quantity ? parseInt(quantity, 10) : 1;
    const weightValue = parseFloat(weight);

    // Validate inputs
    if (!armament) {
      setError('סוג החימוש נדרש');
      return;
    }

    if (isNaN(weightValue) || weightValue <= 0) {
      setError('משקל חייב להיות גדול מ-0');
      return;
    }

    if (isNaN(quantityValue) || quantityValue < 1) {
      setError('כמות חייבת להיות גדולה מ-0');
      return;
    }

    try {
      const response = await fetch('/api/armaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: armament, weight: weightValue, quantity: quantityValue }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Armament added:', data);
      setSuccessMessage('חימוש נוסף בהצלחה');
      setArmament('');
      setWeight('');
      setQuantity('');
    } catch (error) {
      console.error('Failed to add armament:', error);
      setError(error.message || 'בעיה בהוספת חימוש');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleArmamentSubmit}>
      <label className={styles.label} htmlFor="armamentType">סוג חימוש</label>
      <input
        className={styles.input}
        id="armamentType"
        type="text"
        placeholder="הכנס סוג חימוש"
        value={armament}
        onChange={(e) => setArmament(e.target.value)}
      />

      <label className={styles.label} htmlFor="weight">משקל ליחידה (ק&quot;ג)</label>
      <input
        className={styles.input}
        id="weight"
        type="number"
        placeholder="הכנס משקל"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        min="0"
        step="0.1"
      />

      <label className={styles.label} htmlFor="quantity">כמות</label>
      <input
        className={styles.input}
        id="quantity"
        type="number"
        placeholder="השאר ריק כדי להוסיף 1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />

      <button className={styles.button} type="submit">הוספת חימוש</button>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
}