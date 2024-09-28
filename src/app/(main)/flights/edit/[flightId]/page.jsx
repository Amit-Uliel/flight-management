"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './EditFlight.module.css';
import OrbitLoadingButton from '@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton';
import RadarLoader from '@/components/ui/loaders/RadarLoader';

export default function EditFlightPage() {
    const { flightId } = useParams();
    const router = useRouter();
    const [flightData, setFlightData] = useState(null);
    const [takeoffTime, setTakeoffTime] = useState('');
    const [scheduledLandingTime, setScheduledLandingTime] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFlightDetails = async () => {
            try {
                const response = await fetch(`/api/flights/details/${flightId}`);
                const data = await response.json();
                setFlightData(data);
    
                // Convert date strings to the correct format for datetime-local inputs
                setTakeoffTime(formatDateTimeForInput(data.takeoffTime));
                setScheduledLandingTime(formatDateTimeForInput(data.scheduledLandingTime));
                setNotes(data.notes);
            } catch (error) {
                console.error('Failed to fetch flight details:', error);
            }
        };
    
        fetchFlightDetails();
    }, [flightId]);
    
    // Function to format date for datetime-local input
    const formatDateTimeForInput = (dateString) => {
        const date = new Date(dateString);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`/api/flights/${flightId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    takeoffTime,
                    scheduledLandingTime,
                    notes,
                }),
            });

            if (response.ok) {
                alert('טיסה נערכה בהצלחה!');
                router.push(`/flights/details/${flightId}`);
            } else {
                alert('בעיה בעריכת טיסה');
            }
        } catch (error) {
            console.error('Failed to update flight:', error);
            alert('בעיה בעריכת טיסה');
        } finally {
            setIsLoading(false);
        }
    };

    if (!flightData) {
        return <div className={styles.loaderContainer}> <RadarLoader /></div>;
    }

    return (
        <div className={styles.editFlightContainer}>
            <h1 className={styles.title}>עריכת טיסה {flightData.flightId}</h1>
            <form className={styles.form} onSubmit={handleSaveChanges}>
                <label className={styles.label} htmlFor="takeoffTime">זמן המראה</label>
                <input
                    className={styles.input}
                    type="datetime-local"
                    id="takeoffTime"
                    value={takeoffTime}
                    onChange={(e) => setTakeoffTime(e.target.value)}
                />

                <label className={styles.label} htmlFor="scheduledLandingTime">זמן נחיתה מתוכנן</label>
                <input
                    className={styles.input}
                    type="datetime-local"
                    id="scheduledLandingTime"
                    value={scheduledLandingTime}
                    onChange={(e) => setScheduledLandingTime(e.target.value)}
                />

                <label className={styles.label} htmlFor="notes">הערות</label>
                <textarea
                    className={styles.textarea}
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <OrbitLoadingButton
                    className={styles.submitButton}
                    initialText="שמור שינויים"
                    loadingText="שומר שינויים"
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
}