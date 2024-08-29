"use client";

import { useState, useEffect } from 'react';
import AircraftSelectionTable from './AircraftSelectionTable';
import AircraftConfiguration from './AircraftConfiguration';
import styles from './styles/flightForm.module.css';
import OrbitLoadingButton from '@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton';

export default function FlightForm() {
    const [missionName, setMissionName] = useState('');
    const [availableAircraft, setAvailableAircraft] = useState([]);
    const [selectedAircrafts, setSelectedAircrafts] = useState([]);
    const [armamentSelections, setArmamentSelections] = useState({});
    const [cameraSelections, setCameraSelections] = useState({});
    const [takeoffTime, setTakeoffTime] = useState('');
    const [scheduledLandingTime, setScheduledLandingTime] = useState('');
    const [notes, setNotes] = useState('');
    const [armamentTypes, setArmamentTypes] = useState([]);
    const [cameraTypes, setCameraTypes] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch available aircraft
    const fetchAvailableAircraft = async () => {
        try {
            const response = await fetch('/api/aircrafts/available');
            const data = await response.json();
            setAvailableAircraft(data);
        } catch (error) {
            console.error('Error fetching available aircraft:', error);
        }
    };

    useEffect(() => {
        fetchAvailableAircraft();
    }, []);

    // Fetch available armament and camera types when the component mounts
    useEffect(() => {
        const fetchArmamentTypes = async () => {
            try {
                const response = await fetch('/api/armaments/types');
                const data = await response.json();
                setArmamentTypes(data);
            } catch (error) {
                setError('Failed to fetch armament types');
            }
        };

        const fetchCameraTypes = async () => {
            try {
                const response = await fetch('/api/cameras/types');
                const data = await response.json();
                setCameraTypes(data);
            } catch (error) {
                setError('Failed to fetch camera types');
            }
        };

        fetchArmamentTypes();
        fetchCameraTypes();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);
    
        try {
            // Send all required data
            const response = await fetch('/api/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    missionName,
                    selectedAircrafts,
                    armamentSelections,
                    cameraSelections,
                    takeoffTime,
                    scheduledLandingTime,
                    notes,
                }),
            });
    
            // Parse the response data
            const data = await response.json();

            // Check for errors in the response
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create flight');
            }
    
            // clear all form fields
            setMissionName('');
            setSelectedAircrafts([]);
            setArmamentSelections({});
            setCameraSelections({});
            setTakeoffTime('');
            setScheduledLandingTime('');
            setNotes('');

            // fetch available aircraft again
            fetchAvailableAircraft();

            // show message of successful creation
            setSuccessMessage('טיסה נוצרה בהצלחה !');
        } catch (error) {
            // Handle errors
            setError(error.message);
        } finally {
            // set loading to false, scroll user to the top
            setIsLoading(false);
            window.scrollTo(0, 0);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.parentConfirmationContainer}>
                {(error || successMessage) && (
                    <div className={styles.confirmaionContainer}>
                        {error && <p className={styles.error}>{error}</p>}
                        {successMessage && <p className={styles.success}>{successMessage}</p>}
                    </div>
                )}
            </div>

            <label className={styles.label} htmlFor="missionName">שם המשימה</label>
            <input
                className={styles.input}
                type="text"
                id="missionName"
                value={missionName}
                onChange={(e) => setMissionName(e.target.value)}
            />

            <AircraftSelectionTable
                selectedAircrafts={selectedAircrafts}
                setSelectedAircrafts={setSelectedAircrafts}
                armamentSelections={armamentSelections}
                setArmamentSelections={setArmamentSelections}
                cameraSelections={cameraSelections}
                setCameraSelections={setCameraSelections}
                availableAircraft={availableAircraft}
            />

            {selectedAircrafts.map((tailNumber) => (
                <AircraftConfiguration
                    key={tailNumber}
                    tailNumber={tailNumber}
                    setArmamentSelections={setArmamentSelections}
                    setCameraSelections={setCameraSelections}
                    armamentTypes={armamentTypes}
                    cameraTypes={cameraTypes}
                />
            ))}

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
                initialText="צור טיסה"
                loadingText="יוצר טיסה"
                isLoading={isLoading}
            />
        </form>
    );
}