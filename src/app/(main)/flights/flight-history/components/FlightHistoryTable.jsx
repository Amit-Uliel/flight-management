"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles/FlightHistoryTable.module.css';

const FlightHistoryTable = ({ flights }) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(flights.length / rowsPerPage);

    // Function to get flights for the current page
    const currentFlights = flights.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleFlightClick = (flightId) => {
        router.push(`/flights/details/${flightId}`);
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('he-IL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const formattedTime = date.toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        return { formattedDate, formattedTime };
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>היסטוריית טיסות</h2>
            <div className={styles.tableWrapper}>
                <table className={styles.flightHistoryTable}>
                    <thead>
                        <tr>
                            <th>מספר טיסה</th>
                            <th>שם משימה</th>
                            <th>זמן המראה</th>
                            <th>זמן נחיתה מתוכנן</th>
                            <th>זמן נחיתה בפועל</th>
                            <th>סטטוס</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFlights.length > 0 ? (
                            currentFlights.map((flight) => {
                                const formattedTakeoffTime = formatDateTime(flight.takeoffTime);
                                const formattedScheduledLandingTime = formatDateTime(flight.scheduledLandingTime);
                                let formattedActualLandingTime;
                                if (flight.actualLandingTime) {
                                    formattedActualLandingTime = formatDateTime(flight.actualLandingTime);
                                }

                                return (
                                    <tr key={flight.flightId}>
                                        <td className={styles.flightId} onClick={() => handleFlightClick(flight.flightId)}>
                                            {flight.flightId}
                                        </td>
                                        <td>{flight.mission?.missionName || 'N/A'}</td>
                                        <td>
                                            <div className={styles.dateTimeContainer}>
                                                <span>{formattedTakeoffTime.formattedDate}</span>
                                                <span>{formattedTakeoffTime.formattedTime}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.dateTimeContainer}>
                                                <span>{formattedScheduledLandingTime.formattedDate}</span>
                                                <span>{formattedScheduledLandingTime.formattedTime}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {flight.actualLandingTime ? (
                                                <div className={styles.dateTimeContainer}>
                                                    <span>{formattedActualLandingTime.formattedDate}</span>
                                                    <span>{formattedActualLandingTime.formattedTime}</span>
                                                </div>
                                            ) : (
                                                'לא דווח זמן נחיתה'
                                            )}
                                        </td>
                                        <td className={styles.status}>{flight.status === 'COMPLETED' ? 'הושלם' : 'בוטלה'}</td>
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
            </div>                
            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    הקודם
                </button>
                <span className={styles.pageIndicator}>
                    עמוד {currentPage} מתוך {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    הבא
                </button>
            </div>
        </div>
    );
};

export default FlightHistoryTable;