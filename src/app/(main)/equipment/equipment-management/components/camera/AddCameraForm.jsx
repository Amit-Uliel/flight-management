"use client";

import { useState } from "react";
import styles from '../styles/forms.module.css';

export default function CameraForm() {
  const [cameraType, setCameraType] = useState(''); // Changed to input field
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState(''); // New state for weight
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCameraSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Default quantity to 1 if not specified
    const quantityValue = quantity ? parseInt(quantity, 10) : 1;

    // Validate quantity
    if (isNaN(quantityValue) || quantityValue < 1) {
      setError('כמות חייבת להיות 1 או יותר');
      return;
    }

    // Validate weight
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setError('יש להזין משקל חוקי (ב-ק"ג)');
      return;
    }

    try {
      const response = await fetch('/api/cameras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: cameraType, weight: weightValue, quantity: quantityValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error( data.error || `Error: ${response.statusText}`);
      }

      console.log('Camera added:', data);
      setSuccessMessage('מצלמה נוספה בהצלחה');
      setCameraType('');
      setQuantity('');
      setWeight('');
    } catch (error) {
      console.error('Failed to add camera:', error);
      setError(error.message || 'בעיה בהוספת מצלמה');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleCameraSubmit}>
      <label className={styles.label} htmlFor="cameraType">סוג מצלמה</label>
      <input
        className={styles.input}
        id="cameraType"
        type="text"
        placeholder="הכנס סוג מצלמה"
        value={cameraType}
        onChange={(e) => setCameraType(e.target.value)}
      />

      <label className={styles.label} htmlFor="weight">משקל ליחידה (ק&quot;ג)</label>
      <input
        className={styles.input}
        id="weight"
        type="number"
        placeholder="הכנס משקל"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        min="0.1"
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

      <button className={styles.button} type="submit">הוספת מצלמה</button>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
}