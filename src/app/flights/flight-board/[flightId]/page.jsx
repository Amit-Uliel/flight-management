"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../flightBoardComponents/styles/FlightDetails.module.css';

// Translation dictionaries and date formatting function
const flightStatusTranslation = {
    SCHEDULED: 'מתקיים',
    IN_FLIGHT: 'בטיסה',
    LANDED: 'נחתה',
    COMPLETED: 'הושלם',
    CANCELED: 'בוטלה'
};

const missionStatusTranslation = {
    ONGOING: 'בעיצומה',
    ONHOLD: 'בהמתנה',
    COMPLETED: 'הושלמה',
    CANCELED: 'בוטלה'
};

const aircraftModelTranslation = {
    HERMES_450: 'הרמס 450',
    HERMES_900: 'הרמס 900',
    HERMES_1000: 'הרמס 1000'
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

const FlightDetails = () => {
    const { flightId } = useParams();
    const [flightData, setFlightData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (flightId) {
            fetch(`/api/flights/details/${flightId}`)
                .then((response) => response.json())
                .then((data) => {
                    setFlightData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch flight details:', error);
                    setLoading(false);
                });
        }
    }, [flightId]);

    if (loading) {
        return <div>טוען...</div>;
    }

    if (!flightData) {
        return <div>לא נמצאו פרטי טיסה</div>;
    }

    const { mission } = flightData;

    return (
        <div className={styles.container}>
            <div className={styles.flightDetailsContainer}>
                <h1>פרטי טיסה {flightData.flightId}</h1>

                <div className={styles.section}>
                    <h2>פרטי טיסה</h2>
                    <div className={styles.dateTimeRow}>
                        <p><strong> תאריך המראה:</strong> {formatDateTime(flightData.takeoffTime).formattedDate}</p>
                        <p><strong>זמן המראה:</strong> {formatDateTime(flightData.takeoffTime).formattedTime}</p>
                    </div>
                    <div className={styles.dateTimeRow}>
                        <p><strong>תאריך נחיתה מתוכנן:</strong> {formatDateTime(flightData.scheduledLandingTime).formattedDate}</p>
                        <p><strong>זמן נחיתה מתוכנן:</strong> {formatDateTime(flightData.scheduledLandingTime).formattedTime}</p>
                    </div>
                    <p><strong>סטטוס טיסה:</strong> {flightStatusTranslation[flightData.status]}</p>
                </div>

                {mission && (
                    <div className={styles.section}>
                        <h2>פרטי המשימה</h2>
                        <p><strong>שם המשימה:</strong> {mission.missionName}</p>
                        <p><strong>סטטוס משימה:</strong> {missionStatusTranslation[mission.MissonStatus]}</p>
                        <p><strong>נוצר בתאריך:</strong> {formatDateTime(mission.createdAt).formattedDate} {formatDateTime(mission.createdAt).formattedTime}</p>
                    </div>
                )}

                {mission?.assignments && mission.assignments.length > 0 && (
                    <div className={styles.gridContainer}>
                        {mission.assignments.map((assignment) => (
                            <div key={assignment.assignmentId} className={styles.assignmentSection}>
                                <div className={styles.section}>
                                    <h2>פרטי מטוס (מספר זנב: {assignment.aircraft?.tailNumber || 'N/A'})</h2>
                                    <p><strong>דגם:</strong> {aircraftModelTranslation[assignment.aircraft?.model] || 'N/A'}</p>
                                    <p><strong>משקל:</strong> {assignment.aircraft?.weight ? `${assignment.aircraft.weight} ק"ג` : 'N/A'}</p>
                                    <p><strong>מספר טייסת:</strong> {assignment.aircraft?.squadronId || 'N/A'}</p>
                                    <p><strong>מצלמה:</strong> {assignment.camera?.cameraType || 'N/A'}</p>
                                </div>

                                <div className={styles.section}>
                                    <h2>שימוש בחימוש</h2>
                                    {assignment.AssignmentArmamentUsage.length > 0 ? (
                                        assignment.AssignmentArmamentUsage.map((usage) => (
                                            <div key={usage.assignmentArmamentUsageId} className={styles.usage}>
                                                <p><strong>סוג חימוש:</strong> {usage.armamentType || 'N/A'}</p>
                                                <p><strong>כמות בשימוש:</strong> {usage.quantity || 'N/A'}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>לא נעשה שימוש בחימוש</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightDetails;