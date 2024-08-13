"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/forms.module.css';

export default function UpdateArmamentForm() {
    const [armamentTypes, setArmamentTypes] = useState([]);
    const [selectedArmamentType, setSelectedArmamentType] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [addQuantity, setAddQuantity] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
                body: JSON.stringify({ quantity: parseInt(addQuantity, 10) }),
            });

            if (!response.ok) {
                throw new Error(response.error || 'בעיה בעדכון חימוש');
            }

            const data = await response.json();
            setSuccessMessage('חימוש עודכן בהצלחה');
            setCurrentQuantity(data.quantity);
            setAddQuantity('');
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

            
            {selectedArmamentType && (<p>כמות נוכחית: {currentQuantity}</p>)}

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
                {isLoading ? '...מעדכן' : 'עדכון חימוש'}
            </button>   
            
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}