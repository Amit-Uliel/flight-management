"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/forms.module.css';

export default function UpdateCameraForm() {
    const [cameraTypes, setCameraTypes] = useState([]);
    const [selectedCameraType, setSelectedCameraType] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [updateQuantity, setUpdateQuantity] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [operation, setOperation] = useState('increase');

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
                body: JSON.stringify({
                    quantity: operation === 'increase' ? parseInt(updateQuantity, 10) : -parseInt(updateQuantity, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('בעיה בעדכון מצלמות');
            }

            const data = await response.json();
            setSuccessMessage('מצלמות עודכנו בהצלחה');
            setCurrentQuantity(data.quantity);
            setUpdateQuantity('');
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

            <div className={styles.operationButtons}>
                <button
                    type="button"
                    className={`${styles.operationButton} ${operation === 'increase' && styles.activeButton}`}
                    onClick={() => setOperation('increase')}
                >
                    +
                </button>
                <button
                    type="button"
                    className={`${styles.operationButton} ${operation === 'decrease' && styles.activeButton}`}
                    onClick={() => setOperation('decrease')}
                >
                    -
                </button>
            </div>

            {selectedCameraType && (<p className={styles.currentQuantity}>כמות נוכחית: {currentQuantity}</p>)}

            <label className={styles.label} htmlFor="updateQuantity">
                {operation === 'increase' ? 'הכנס כמות להוספה' : 'הכנס כמות להורדה'}
            </label>
            <input
                className={styles.input}
                type="number"
                id="updateQuantity"
                value={updateQuantity}
                onChange={(e) => setUpdateQuantity(e.target.value)}
                min="1"
            />

            <button className={styles.button} type="submit" disabled={isLoading || !updateQuantity}>
                {isLoading ? 'מעדכן...' : 'עדכון מצלמות'}
            </button>
                
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}