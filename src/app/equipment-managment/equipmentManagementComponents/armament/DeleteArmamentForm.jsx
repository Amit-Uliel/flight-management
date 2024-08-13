"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/forms.module.css';

export default function DeleteArmamentForm() {
    const [armamentType, setArmamentType] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [armamentTypes, setArmamentTypes] = useState([]);

    // Fetch all armament types from the database when the component mounts
    const fetchArmamentTypes = async () => {
        try {
            const response = await fetch('/api/armaments/types');
            const data = await response.json();

            if (response.ok) {
                setArmamentTypes(data);
            } else {
                throw new Error(data.error || 'בעיה ביבוא סוגי חימוש');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Fetch armament types when the component mounts
    useEffect(() => {
        fetchArmamentTypes();
    }, []);

    // Handle armament deletion
    const handleDeleteArmament = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // Confirm deletion
        const isConfirmed = window.confirm(`האם אתה בטוח שברצונך למחוק את סוג החימוש ${armamentType}?`);
        if (!isConfirmed) return;

        setIsLoading(true);

        try {
            const response = await fetch(`/api/armaments/${armamentType}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'מחיקת חימוש נכשלה');
            }

            setSuccessMessage('חימוש נמחק בהצלחה');
            setArmamentType('');

            // Refetch the armament types to update the dropdown after deletion
            fetchArmamentTypes();
        } catch (error) {
            console.error('Error deleting armament:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteArmament}>
            <label className={styles.label} htmlFor="armamentType">סוג חימוש</label>
            <select
                className={styles.input}
                id="armamentType"
                value={armamentType}
                onChange={(e) => setArmamentType(e.target.value)}
            >
                <option value="">בחר סוג חימוש</option>
                {armamentTypes.map((type) => (
                    <option key={type.armamentType} value={type.armamentType}>
                        {type.armamentType}
                    </option>
                ))}
            </select>

            <button className={styles.button} type="submit" disabled={!armamentType}>
                {isLoading ? 'מוחק...' : 'מחק חימוש'}
            </button>

            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}