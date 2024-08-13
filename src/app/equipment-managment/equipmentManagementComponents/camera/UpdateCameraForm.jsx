"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/forms.module.css';

export default function UpdateCameraForm() {
    const [cameraTypes, setCameraTypes] = useState([]);
    const [selectedCameraType, setSelectedCameraType] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [addQuantity, setAddQuantity] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all camera types from the database when the component mounts
    useEffect(() => {
        const fetchCameraTypes = async () => {
            try {
                const response = await fetch('/api/cameras/types');
                const data = await response.json();
                setCameraTypes(data);
            } catch (error) {
                setError('בעיה ביבוא סוגי מצלמות');
            }
        };

        fetchCameraTypes();
    }, []);

    // Fetch the current quantity when a camera type is selected
    useEffect(() => {
        if (selectedCameraType) {
            const fetchCurrentQuantity = async () => {
                try {
                    const response = await fetch(`/api/cameras/${selectedCameraType}`);
                    const data = await response.json();
                    if (response.ok) {
                        setCurrentQuantity(data.quantity);
                    } else {
                        throw new Error(data.error || 'בעיה ביבוא כמות מצלמות');
                    }
                } catch (error) {
                    setError(error.message);
                }
            };

            fetchCurrentQuantity();
        }
    }, [selectedCameraType]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/cameras/${selectedCameraType}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: parseInt(addQuantity, 10) }),
            });

            if (!response.ok) {
                throw new Error(response.error || 'בעיה בעדכון מצלמות');
            }

            const data = await response.json();
            setSuccessMessage('מצלמות עודכנו בהצלחה');
            setCurrentQuantity(data.quantity);
            setAddQuantity('');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleUpdate}>
            <label className={styles.label} htmlFor="cameraType">בחר סוג מצלמה</label>
            <select
                className={styles.input}
                id="cameraType"
                value={selectedCameraType}
                onChange={(e) => setSelectedCameraType(e.target.value)}
            >
                <option value="">בחר סוג מצלמה</option>
                {cameraTypes.map((type) => (
                    <option key={type.cameraType} value={type.cameraType}>
                        {type.cameraType}
                    </option>
                ))}
            </select>

            
            {selectedCameraType && (<p>כמות נוכחית: {currentQuantity}</p>)}

            <label className={styles.label} htmlFor="addQuantity">הכנס כמות להוספה</label>
            <input
                className={styles.input}
                type="number"
                id="addQuantity"
                value={addQuantity}
                onChange={(e) => setAddQuantity(e.target.value)}
                min="1"
            />

            <button className={styles.button} type="submit" disabled={isLoading || !addQuantity}>
                {isLoading ? '...מעדכן' : 'עדכון מצלמות'}
            </button>

            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}