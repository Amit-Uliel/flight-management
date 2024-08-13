"use client";

import { useState } from 'react';
import styles from '../styles/forms.module.css';

export default function DeleteAircraftForm() {
    const [tailNumber, setTailNumber] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle aircraft deletion
    const handleDeleteAircraft = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // Validate input
        if (!/^\d+$/.test(tailNumber)) {
            setError('מספר הזנב חייב להיות מספרי');
            return;
        }

        // Ask for user confirmation before proceeding
        const isConfirmed = window.confirm(`האם אתה בטוח שברצונך למחוק את המטוס עם מספר הזנב ${tailNumber}?`);
        if (!isConfirmed) return;

        setIsLoading(true);

        try {
            const response = await fetch(`/api/aircrafts/${tailNumber}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete aircraft');
            }

            setSuccessMessage('המטוס נמחק בהצלחה');
            setTailNumber('');
        } catch (error) {
            console.error('Error deleting aircraft:', error);
            setError(error.message || 'Failed to delete aircraft');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteAircraft}>
            <label className={styles.label} htmlFor="tailNumber">הכנס מספר זנב למחיקה</label>
            <input
                className={styles.input}
                type="text"
                id="tailNumber"
                value={tailNumber}
                onChange={(e) => setTailNumber(e.target.value)}
                placeholder="מספר זנב"
            />

            <button className={styles.button} type="submit" disabled={!tailNumber}>
                {isLoading ? 'מוחק...' : 'מחק מטוס'}
            </button>

            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}