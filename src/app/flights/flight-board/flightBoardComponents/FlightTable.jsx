"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/FlightTable.module.css';
import { useRouter } from 'next/navigation';

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

const FlightTable = ({ flights }) => {
    const [flightData, setFlightData] = useState([]);
    const timeoutRefs = useRef({});
    const router = useRouter();

    useEffect(() => {
        if (flights.length > 0) {
            const updatedFlights = flights.map((flight) => {
                const pendingStatus = localStorage.getItem(`flightPendingStatus-${flight.flightId}`);
                if (pendingStatus) {
                    const { status, timestamp } = JSON.parse(pendingStatus);
                    const elapsed = Date.now() - timestamp;
                    const remainingTime = 5 * 60 * 1000 - elapsed;

                    if (remainingTime > 0) {
                        const timeoutId = setTimeout(() => {
                            completeFlight(flight.flightId);
                        }, remainingTime);

                        timeoutRefs.current[flight.flightId] = timeoutId;
                        flight.status = status; // Display the pending status
                    } else {
                        completeFlight(flight.flightId); // Time has already passed
                    }
                }
                return flight;
            });
            setFlightData(updatedFlights);
        }
    }, [flights]);

    const completeFlight = async (flightId) => {
        await updateFlightStatusInDatabase(flightId, 'COMPLETED');
        setFlightData((prevFlights) =>
            prevFlights.filter((flight) => flight.flightId !== flightId)
        );
        delete timeoutRefs.current[flightId];
        localStorage.removeItem(`flightPendingStatus-${flightId}`);
    };

    const handleStatusChange = async (flightId, newStatus) => {
        const userConfirmed = window.confirm(`Are you sure you want to change the flight status to "${newStatus}"?`);
        if (!userConfirmed) return;
    
        // Clear existing timeout if it exists
        if (timeoutRefs.current[flightId]) {
            clearTimeout(timeoutRefs.current[flightId]);
            delete timeoutRefs.current[flightId];
            localStorage.removeItem(`flightPendingStatus-${flightId}`);
        }
    
        // If the new status is "SCHEDULED" or "IN_FLIGHT", update the database immediately
        if (newStatus === 'SCHEDULED' || newStatus === 'IN_FLIGHT') {
            await updateFlightStatusInDatabase(flightId, newStatus);
        }
    
        // Update flight status in the local state
        setFlightData((prevFlights) =>
            prevFlights.map((flight) =>
                flight.flightId === flightId ? { ...flight, status: newStatus } : flight
            )
        );
    
        // Set timeout for "LANDED" or "CANCELED" statuses
        if (newStatus === 'LANDED' || newStatus === 'CANCELED') {
            const timeoutId = setTimeout(async () => {
                if (newStatus === 'LANDED') {
                    await completeFlight(flightId); // Mark as completed after timeout
                } else if (newStatus === 'CANCELED') {
                    await removeFlight(flightId); // Remove canceled flight after timeout
                }
            }, 5 * 60 * 1000);
    
            timeoutRefs.current[flightId] = timeoutId;
            localStorage.setItem(
                `flightPendingStatus-${flightId}`,
                JSON.stringify({ status: newStatus, timestamp: Date.now() })
            );
        }
    };
    
    const removeFlight = async (flightId) => {
        await updateFlightStatusInDatabase(flightId, 'CANCELED');
        setFlightData((prevFlights) =>
            prevFlights.filter((flight) => flight.flightId !== flightId)
        );
        delete timeoutRefs.current[flightId];
        localStorage.removeItem(`flightPendingStatus-${flightId}`);
    };

    const updateFlightStatusInDatabase = async (flightId, status) => {
        try {
            await fetch(`/api/flights/${flightId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
        } catch (error) {
            console.error('Failed to update flight status:', error);
        }
    };

    const handleFlightClick = (flightId) => {  
        router.push(`/flights/flight-board/${flightId}`);    
    };

    return (
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
                                <td className={styles.flightId} onClick={() => handleFlightClick(flight.flightId)}>
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
                                    <select
                                        className={`${styles.status} ${getStatusClass(flight.status)}`}
                                        value={flight.status}
                                        onChange={(e) => handleStatusChange(flight.flightId, e.target.value)}
                                    >
                                        <option value="SCHEDULED">מתקיים</option>
                                        <option value="IN_FLIGHT">בטיסה</option>
                                        <option value="LANDED">נחתה</option>
                                        <option value="CANCELED">בוטלה</option>
                                    </select>
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
    );
};

export default FlightTable;