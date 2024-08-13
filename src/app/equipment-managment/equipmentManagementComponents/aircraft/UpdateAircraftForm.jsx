"use client";

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/forms.module.css';

export default function UpdateAircraftForm() {
    const [tailNumber, setTailNumber] = useState('');
    const [model, setModel] = useState('');
    const [squadron, setSquadron] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchTimeoutRef = useRef(null);  // Ref to hold the timeout ID

    // Fetch aircraft details whenever the tail number changes
    useEffect(() => {
        if (tailNumber.trim() === '') {
            return;
        }

        // Clear the timeout if the user types again within the debounce period
        if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
        }

        // Set a new timeout to fetch data after the debounce period
        fetchTimeoutRef.current = setTimeout(() => {
            const fetchAircraftDetails = async () => {
                setError(null);
                setSuccessMessage(null);
                setIsLoading(true);

                try {
                    const response = await fetch(`/api/aircrafts/${tailNumber}`);
                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'בעיה לא ידועה');
                    }

                    // If successful, set the model and squadron state
                    setModel(data.model);
                    setSquadron(data.squadronId.toString());
                    setSuccessMessage('פרטי מטוס נטענו בהצלחה');
                } catch (error) {
                    console.error('Error fetching aircraft:', error);
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchAircraftDetails();
        }, 500);  // 500ms debounce delay
    }, [tailNumber]);

    // Update aircraft details
    const handleUpdateAircraft = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const isConfirmed = window.confirm('האם אתה בטוח שברצונך לעדכן את המטוס הזה?');
        if (!isConfirmed) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/aircrafts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tailNumber,
                    model, 
                    squadronId: parseInt(squadron, 10),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'בעיה בעדכון מטוס');
            }

            setSuccessMessage('מטוס עודכן בהצלחה');
        } catch (error) {
            console.error('Error updating aircraft:', error);
            setError(error.message || 'Failed to update aircraft');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleUpdateAircraft}>
            <label className={styles.label} htmlFor="tailNumber">הזן מספר זנב</label>
            <input
                className={styles.input}
                type="text"
                id="tailNumber"
                value={tailNumber}
                onChange={(e) => setTailNumber(e.target.value)}
            />

            {isLoading && <p className={styles.loading}>...מחפש את המטוס</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <label className={styles.label} htmlFor="model">מודל</label>
            <select
                className={styles.input}
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!model}
            >
                <option value="">בחר מודל</option>
                <option value="HERMES_450">Hermes 450</option>
                <option value="HERMES_900">Hermes 900</option>
                <option value="HERMES_1000">Hermes 1000</option>
            </select>

            <label className={styles.label} htmlFor="squadron">טייסת</label>
            <select
                className={styles.input}
                id="squadron"
                value={squadron}
                onChange={(e) => setSquadron(e.target.value)}
                disabled={!model}
            >
                <option value="">בחר טייסת</option>
                <option value="161">161</option>
                <option value="166">166</option>
            </select>

            <button className={styles.button} type="submit" disabled={!model || !squadron}>
                {isLoading ? '...מעדכן' : 'עדכון מטוס'}
            </button>
        </form>
    );
}