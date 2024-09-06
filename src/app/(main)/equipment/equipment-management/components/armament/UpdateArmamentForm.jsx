"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/forms.module.css';

export default function UpdateArmamentForm() {
    const [armamentTypes, setArmamentTypes] = useState([]);
    const [selectedArmamentType, setSelectedArmamentType] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [updateQuantity, setUpdateQuantity] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [operation, setOperation] = useState('increase'); // Track the current operation

    // Fetch all armament types from the database when the component mounts
    useEffect(() => {
        const fetchArmamentTypes = async () => {
            try {
                const response = await fetch('/api/armaments/types');
                const data = await response.json();
                setArmamentTypes(data);
            } catch (error) {
                setError('בעיה ביבוא סוגי חימוש');
            }
        };

        fetchArmamentTypes();
    }, []);

    // Fetch the current quantity when an armament type is selected
    useEffect(() => {
        if (selectedArmamentType) {
            const fetchCurrentQuantity = async () => {
                try {
                    const response = await fetch(`/api/armaments/${selectedArmamentType}`);
                    const data = await response.json();
    
                    if (response.ok) {
                        setCurrentQuantity(data.quantity); // Set the quantity from the API response
                    } else {
                        throw new Error(data.error || 'בעיה ביבוא כמות חימוש');
                    }
                } catch (error) {
                    setError(error.message);
                }
            };
    
            fetchCurrentQuantity(); // Fetch the current quantity when an armament type is selected
        }
    }, [selectedArmamentType]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/armaments/${selectedArmamentType}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: operation === 'increase' ? parseInt(updateQuantity, 10) : -parseInt(updateQuantity, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('בעיה בעדכון חימוש');
            }

            const data = await response.json();
            setSuccessMessage('חימוש עודכן בהצלחה');
            setCurrentQuantity(data.quantity);
            setUpdateQuantity('');
        } catch (error) {
            console.error('Error updating armament:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleUpdate}>
            <label className={styles.label} htmlFor="armamentType">בחר סוג חימוש</label>
            <select
                className={styles.input}
                id="armamentType"
                value={selectedArmamentType}
                onChange={(e) => setSelectedArmamentType(e.target.value)}
            >
                <option value="">בחר סוג חימוש</option>
                {armamentTypes.map((type) => (
                    <option key={type.armamentType} value={type.armamentType}>
                        {type.armamentType}
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

            {selectedArmamentType && (<p className={styles.currentQuantity}>כמות נוכחית: {currentQuantity}</p>)}

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
                {isLoading ? '...מעדכן' : 'עדכון חימוש'}
            </button>   
            
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}