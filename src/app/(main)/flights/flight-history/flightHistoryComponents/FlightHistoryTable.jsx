"use client";

import { useRouter } from 'next/navigation';
import styles from './styles/FlightHistoryTable.module.css';

const FlightHistoryTable = ({ flights }) => {
    const router = useRouter();

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

    return (
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
                {flights.length > 0 ? (
                    flights.map((flight) => {
                        const formattedTakeoffTime = formatDateTime(flight.takeoffTime)
                        const formattedScheduledLandingTime = formatDateTime(flight.scheduledLandingTime);
                        let formattedActualLandingTime;
                        if (flight.actualLandingTime){
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
                        )
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

export default FlightHistoryTable;