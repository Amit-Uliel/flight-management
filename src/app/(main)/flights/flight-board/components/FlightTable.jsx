"use client";

import React, { useState, useEffect } from 'react';
import styles from './styles/FlightTable.module.css';
import { useRouter } from 'next/navigation';
import MissionStatusModal from './MissionStatusModal';
import { motion, AnimatePresence } from 'framer-motion';

const statusTranslations = {
    SCHEDULED: "מתוכננת",
    IN_FLIGHT: "בטיסה",
    LANDED: "נחתה",
    CANCELED: "בוטלה",
    COMPLETED: "הושלמה",
};

const variants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
}

const tableRowVariants = {
    hidden: {opacity: 0,},
    visible: {opacity: 1,},
}

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
    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 6;

    // Calculate the range of flights to display
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flightData.slice(indexOfFirstFlight, indexOfLastFlight);
    const totalPages = Math.ceil(flightData.length / flightsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
      

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

        fetchFlights();

    }, []);

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
            <div className={styles.flightTableBox}>
                <motion.h2 
                    className={styles.title}
                    variants={variants}
                    initial='hidden'
                    animate='visible'
                    transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
                >
                    לוח טיסות
                </motion.h2>
                <motion.div className={styles.tableWrapper}
                    variants={variants}
                    initial='hidden'
                    animate='visible'
                    transition={{ duration: 0.4, ease: "easeInOut", delay: 0.8 }}>
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
                            <AnimatePresence mode="wait">
                                {currentFlights.length > 0 ? (
                                    currentFlights.map((flight) => {
                                    const takeoff = formatDate(flight.takeoffTime);
                                    const landing = formatDate(flight.scheduledLandingTime);
                                    return (
                                        <motion.tr key={flight.flightId}
                                            variants={tableRowVariants}
                                            initial='hidden'
                                            animate='visible'
                                            exit='hidden'
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        >
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
                                                    <span className={`${styles.status} ${getStatusClass(flight.status)}`}>
                                                        {statusTranslations[flight.status]}
                                                    </span>
                                                ) : (
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
                                        </motion.tr>
                                    );
                                    })
                                ) : (
                                    <motion.tr
                                        key="noDataRow"
                                        variants={tableRowVariants}
                                        initial='hidden'
                                        animate='visible'
                                        exit='hidden'
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <td colSpan="6">אין נתונים להצגה</td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>
                <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? styles.activePage : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
    };

    export default FlightTable;