"use client";

import React, { useState, useEffect } from 'react';
import styles from './styles/FlightTable.module.css';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import MissionStatusModal from './MissionStatusModal';

const statusTranslations = {
    SCHEDULED: "מתוכננת",
    IN_FLIGHT: "בטיסה",
    LANDED: "נחתה",
    CANCELED: "בוטלה",
    COMPLETED: "הושלמה",
};

// Format date and time
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return { formattedDate, formattedTime };
};

const getStatusClass = (status) => {
  switch (status) {
    case 'SCHEDULED':
      return styles.statusScheduled;
    case 'IN_FLIGHT':
      return styles.statusInFlight;
    case 'LANDED':
      return styles.statusLanded;
    case 'CANCELED':
      return styles.statusCanceled;
    case 'COMPLETED':
      return styles.statusCompleted;
    default:
      return '';
  }
};

const FlightTable = () => {
    const [flightData, setFlightData] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [currentMissionId, setCurrentMissionId] = useState(null); // Store the current mission ID
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // Fetch initial flights data
        const fetchFlights = async () => {
            try {
                const response = await fetch('/api/flights/flightBoard');
                const data = await response.json();

                if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch flights');
                }

                setFlightData(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights(); // Initial fetch call

        // Subscribe to real-time updates
        const flightSubscription = supabase
        .channel('realtime-flights')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'Flight' },
            (payload) => {
                console.log(payload);
            }
        )
        .subscribe();

        // Cleanup function to unsubscribe from real-time updates
        return () => {
            supabase.removeChannel(flightSubscription);
        };
    }, [supabase]);

    // Function to handle flight status change
    const handleStatusChange = async (flightId, newStatus, missionId) => {
        const userConfirmed = window.confirm(
            `האם אתה בטוח שברצונך לשנות את סטטוס הטיסה ל "${statusTranslations[newStatus]}"?`        );
        if (!userConfirmed) return;
    
        // Check if the new status is CANCELED or COMPLETED
        if (newStatus === 'CANCELED') {
            // Show modal to select mission status
            updateFlightStatusInDatabase(flightId, 'CANCELED');
            setCurrentMissionId(missionId);
            setShowModal(true);
        } else if (newStatus === 'COMPLETED') {
            // If flight status is COMPLETED, automatically set mission status to COMPLETED
            await updateMissionStatusInDatabase(missionId, 'COMPLETED');
    
            // Update flight status and set actualLandingTime to current time
            const actualLandingTime = new Date();
            await updateFlightStatusInDatabase(flightId, 'COMPLETED', actualLandingTime);
        } else {
            // For other statuses, just update the status without changing actualLandingTime
            await updateFlightStatusInDatabase(flightId, newStatus);
        }
    
        // Update local state immediately
        setFlightData((prevFlights) =>
            prevFlights.map((flight) =>
                flight.flightId === flightId ? { ...flight, status: newStatus } : flight
            )
        );
    };

    // Function to handle modal selection
   const handleMissionStatusSelection = async (selectedStatus) => {
        if (currentMissionId) {
            try {
                // Update the mission status first
                await updateMissionStatusInDatabase(currentMissionId, selectedStatus);

                setShowModal(false); // Hide the modal after selection
                setCurrentMissionId(null); // Reset mission ID

            } catch (error) {
                console.error('Failed to update mission or flight status:', error);
            }
        }
    };

    const updateFlightStatusInDatabase = async (flightId, status, actualLandingTime = null) => {
        try {
            const body = { status };
    
            // Include actualLandingTime if provided
            if (actualLandingTime) {
                body.actualLandingTime = actualLandingTime.toISOString();
            }
    
            await fetch(`/api/flights/${flightId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error('Failed to update flight status:', error);
        }
    };

    const updateMissionStatusInDatabase = async (missionId, status) => {
        try {
            await fetch(`/api/missions/${missionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
        } catch (error) {
            console.error('Failed to update mission status:', error);
        }
    };

    const handleFlightClick = (flightId) => {
        router.push(`/flights/details/${flightId}`);
    };

    return (
        <>
            {showModal && (
                <MissionStatusModal
                    onSelect={handleMissionStatusSelection}
                />
            )}
            <table className={styles.flightTable}>
                <thead>
                    <tr>
                        <th>מספר טיסה</th>
                        <th>שם משימה</th>
                        <th>זמן המראה</th>
                        <th>זמן נחיתה מתוכנן</th>
                        <th>הערות</th>
                        <th>סטטוס</th>
                    </tr>
                </thead>
                <tbody>
                    {flightData.length > 0 ? (
                        flightData.map((flight) => {
                        const takeoff = formatDate(flight.takeoffTime);
                        const landing = formatDate(flight.scheduledLandingTime);
                        return (
                            <tr key={flight.flightId}>
                                <td
                                    className={styles.flightId}
                                    onClick={() => handleFlightClick(flight.flightId)}
                                >
                                    {flight.flightId}
                                </td>
                                <td>{flight.mission.missionName}</td>
                                <td>
                                    <div className={styles.dateTimeContainer}>
                                        <span>{takeoff.formattedTime}</span>
                                        <span>{takeoff.formattedDate}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.dateTimeContainer}>
                                        <span>{landing.formattedTime}</span>
                                        <span>{landing.formattedDate}</span>
                                    </div>
                                </td>
                                <td>{flight.notes}</td>
                                <td>
                                    {flight.status === 'COMPLETED' || flight.status === 'CANCELED' ? (
                                        // Display read-only status for completed or canceled flights
                                        <span className={`${styles.status} ${getStatusClass(flight.status)}`}>
                                            {statusTranslations[flight.status]}
                                        </span>
                                    ) : (
                                        // Render the select dropdown for other statuses
                                        <select
                                            className={`${styles.status} ${getStatusClass(flight.status)}`}
                                            value={flight.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    flight.flightId,
                                                    e.target.value,
                                                    flight.mission.missionId
                                                )
                                            }
                                        >
                                            <option value="SCHEDULED">מתקיימת</option>
                                            <option value="IN_FLIGHT">בטיסה</option>
                                            <option value="LANDED">נחתה</option>
                                            <option value="CANCELED">בוטלה</option>
                                            <option value="COMPLETED">הושלמה</option>
                                        </select>
                                    )}
                                </td>
                            </tr>
                        );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6">אין נתונים להצגה</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
    };

    export default FlightTable;