"use client";

import { useState, useEffect } from 'react';
import AircraftSelectionTable from './AircraftSelectionTable';
import AircraftConfiguration from './AircraftConfiguration';
import styles from './styles/flightForm.module.css';
import OrbitLoadingButton from '@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton';

export default function FlightForm() {
    const [missionName, setMissionName] = useState('');
    const [selectedAircraft, setSelectedAircraft] = useState([]);
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

    // Print armamentSelections whenever it changes
    useEffect(() => {
        console.log('Armament Selections updated:', armamentSelections);
    }, [armamentSelections]);

    // Print cameraSelections whenever it changes
    useEffect(() => {
        console.log('Camera Selections updated:', cameraSelections);
    }, [cameraSelections]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);
    
        try {
            // Create the mission
            const missionResponse = await fetch('/api/missions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    missionName,
                }),
            });
    
            if (!missionResponse.ok) {
                throw new Error('Failed to create mission');
            }
    
            const missionData = await missionResponse.json();
            const missionId = missionData.missionId;
    
            // Create assignments for each selected aircraft
            const assignmentPromises = selectedAircraft.map(async (tailNumber) => {
                const assignmentResponse = await fetch('/api/assignments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tailNumber,
                        missionId,
                        takeOffTime: takeoffTime,
                        scheduledLandingTime: scheduledLandingTime,
                        cameraType: cameraSelections[tailNumber]?.cameraType || null,
                    }),
                });
    
                if (!assignmentResponse.ok) {
                    throw new Error(`Failed to create assignment for aircraft ${tailNumber}`);
                }

                const assignmentData = await assignmentResponse.json();
                const assignmentId = assignmentData.id;

                // Create AssignmentArmamentUsage for selected armaments
                if (armamentSelections[tailNumber]) {
                    const { armamentType, quantity } = armamentSelections[tailNumber];
                    if (armamentType && quantity) {
                        const armamentUsageResponse = await fetch('/api/assignmentArmamentUsages', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                assignmentId,
                                tailNumber,
                                armamentType,
                                quantity,
                            }),
                        });
    
                        if (!armamentUsageResponse.ok) {
                            throw new Error(`Failed to create armament usage for aircraft ${tailNumber}`);
                        }

                        // Reduce the quantity of the selected armament
                        const reduceArmamentResponse = await fetch(`/api/armaments/${armamentType}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                quantity: -quantity,  // Subtract the used quantity
                            }),
                        });

                        if (!reduceArmamentResponse.ok) {
                            throw new Error(`Failed to reduce quantity of armament ${armamentType}`);
                        }
                    }
                }

                // Reduce camera quantity
                const cameraType = cameraSelections[tailNumber]?.cameraType;
                if (cameraType) {
                    const reduceCameraResponse = await fetch(`/api/cameras/${cameraType}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quantity: -1,  // Subtract one camera from inventory
                        }),
                    });

                    if (!reduceCameraResponse.ok) {
                        throw new Error(`Failed to reduce quantity of camera type ${cameraType}`);
                    }
                }
    
                // Update aircraft availability to false
                await fetch(`/api/aircrafts/available/${tailNumber}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        isAvailable: false,
                    }),
                });
            });
    
            // Wait for all assignment-related operations to complete
            await Promise.all(assignmentPromises);
    
            // Step 5: Create the flight
            const flightResponse = await fetch('/api/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    missionId,
                    takeoffTime,
                    scheduledLandingTime,
                    notes,
                }),
            });
    
            if (!flightResponse.ok) {
                throw new Error('Failed to create flight');
            }
    
            setSuccessMessage('Flight created successfully');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="missionName">שם המשימה</label>
            <input
                className={styles.input}
                type="text"
                id="missionName"
                value={missionName}
                onChange={(e) => setMissionName(e.target.value)}
            />

            <AircraftSelectionTable
                selectedAircraft={selectedAircraft}
                setSelectedAircraft={setSelectedAircraft}
                armamentSelections={armamentSelections}
                setArmamentSelections={setArmamentSelections}
                cameraSelections={cameraSelections}
                setCameraSelections={setCameraSelections}
            />

            {selectedAircraft.map((tailNumber) => (
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
                style={{ width: '150px' }}
            />
            
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </form>
    );
}