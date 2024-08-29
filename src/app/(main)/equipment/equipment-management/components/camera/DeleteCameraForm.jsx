"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/forms.module.css';

export default function DeleteCameraForm() {
    const [cameraType, setCameraType] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cameraTypes, setCameraTypes] = useState([]);

    // Fetch all camera types from the database when the component mounts
    const fetchCameraTypes = async () => {
        try {
            const response = await fetch('/api/cameras/types');
            const data = await response.json();

            if (response.ok) {
                setCameraTypes(data);
            } else {
                throw new Error(data.error || 'בעיה ביבוא סוגי מצלמות');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchCameraTypes();
    }, []);

    // Handle camera deletion
    const handleDeleteCamera = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // Confirm deletion
        const isConfirmed = window.confirm(`האם אתה בטוח שברצונך למחוק את סוג המצלמה ${cameraType}?`);
        if (!isConfirmed) return;

        setIsLoading(true);

        try {
            const response = await fetch(`/api/cameras/${cameraType}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                let errorMessage = 'מחיקת מצלמה נכשלה';
                try {
                    const data = await response.json();
                    errorMessage = data.error || errorMessage;
                } catch (jsonError) {
                    console.error('Failed to parse JSON response', jsonError);
                }
                throw new Error(errorMessage);
            }

            setSuccessMessage('מצלמה נמחקה בהצלחה');
            setCameraType('');

            // Re-fetch the updated list of camera types
            fetchCameraTypes();
        } catch (error) {
            console.error('Error deleting camera:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form className={styles.form} onSubmit={handleDeleteCamera}>
            <label className={styles.label} htmlFor="cameraType">סוג מצלמה</label>
            <select
                className={styles.input}
                id="cameraType"
                value={cameraType}
                onChange={(e) => setCameraType(e.target.value)}
            >
                <option value="">בחר סוג מצלמה</option>
                {cameraTypes.map((type) => (
                    <option key={type.cameraType} value={type.cameraType}>
                        {type.cameraType}
                    </option>
                ))}
            </select>

            <button className={styles.button} type="submit" disabled={!cameraType}>
                {isLoading ? 'מוחק...' : 'מחק מצלמה'}
            </button>

            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}