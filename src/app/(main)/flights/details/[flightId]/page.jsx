"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './FlightDetails.module.css';
import RadarLoader from '@/components/ui/loaders/RadarLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faX, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';

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

const variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
    }
}

const FlightDetails = () => {
    const { flightId } = useParams();
    const router = useRouter();
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
        return (
            <div className={styles.loaderContainer}>
                <RadarLoader />
            </div>
        );
    }

    if (!flightData || !flightData.flightId) {
        return (
            <div className={styles.notFoundContainer}>
                <FontAwesomeIcon icon={faX} className={styles.xIcon}/>
                <p className={styles.notFoundText}>לא נמצאו פרטי טיסה</p>
            </div>
        );
    }

    const { mission, user } = flightData;

    return (
        <motion.div 
            className={styles.flightDetailsContainer}
            variants={variants}
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <motion.div 
                className={styles.section}
                variants={variants}
                initial='hidden'
                animate='visible'
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
            >
                <h2 className={styles.title}>פרטי טיסה {flightData.flightId}</h2>
                <p><strong>מספר טייסת:</strong> {flightData.squadronId}</p>
                <p><strong>יוצר טיסה:</strong> {user.name}</p>
                <div className={styles.dateTimeRow}>
                    <p><strong> תאריך המראה:</strong> {formatDateTime(flightData.takeoffTime).formattedDate}</p>
                    <p><strong>זמן המראה:</strong> {formatDateTime(flightData.takeoffTime).formattedTime}</p>
                </div>
                <div className={styles.dateTimeRow}>
                    <p><strong>תאריך נחיתה מתוכנן:</strong> {formatDateTime(flightData.scheduledLandingTime).formattedDate}</p>
                    <p><strong>זמן נחיתה מתוכנן:</strong> {formatDateTime(flightData.scheduledLandingTime).formattedTime}</p>
                </div>
                <div className={styles.dateTimeRow}>
                    {flightData.actualLandingTime ? (
                        <>
                            <p><strong>תאריך נחיתה בפועל :</strong> {formatDateTime(flightData.actualLandingTime).formattedDate}</p>
                            <p><strong>זמן נחיתה בפועל:</strong> {formatDateTime(flightData.actualLandingTime).formattedTime}</p>
                        </>
                    ) : (
                        <>
                            <p><strong>תאריך נחיתה בפועל :</strong> לא דווח תאריך נחיתה בפועל</p>
                            <p><strong>זמן נחיתה בפועל:</strong> לא דווח זמן נחיתה בפועל</p>
                        </>
                    )}
                </div>
                <p><strong>סטטוס טיסה:</strong> {flightStatusTranslation[flightData.status]}</p>
                <p><strong>הערות:</strong> {flightData.notes}</p>

                {(flightData.status === 'SCHEDULED' || flightData.status === 'IN_FLIGHT') && (
                    <button
                        className={styles.editButton}
                        onClick={() => router.push(`/flights/edit/${flightData.flightId}`)}
                    >
                        <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare} /> ערוך טיסה
                    </button>
                )}
            </motion.div>

           
            <motion.div 
                className={styles.section}
                variants={variants}
                initial='hidden'
                animate='visible'
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.8 }}
            >
                <h2 className={styles.title}>פרטי המשימה</h2>
                <p><strong>שם המשימה:</strong> {mission.missionName}</p>
                <p><strong>סטטוס משימה:</strong> {missionStatusTranslation[mission.MissionStatus]}</p>
                <p><strong>נוצר בתאריך:</strong> {formatDateTime(mission.createdAt).formattedDate} {formatDateTime(mission.createdAt).formattedTime}</p>
            </motion.div>
            

            {mission?.assignments && mission.assignments.length > 0 && (
                <motion.div 
                    className={styles.tableContainer}
                    variants={variants}
                    initial='hidden'
                    animate='visible'
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 1.2 }}
                >
                    <h2 className={styles.title}>מטוסים שהשתתפו בטיסה</h2>

                    {/* Check if the flight is canceled */}
                    {flightData.status === 'CANCELED' ? (
                        <p className={styles.canceledMessage}>הטיסה בוטלה</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>מספר זנב</th>
                                    <th>דגם</th>
                                    <th>משקל</th>
                                    <th>מספר טייסת</th>
                                    <th>מצלמה</th>
                                    <th>שימוש בחימוש</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mission.assignments.map((assignment) => (
                                    <tr key={assignment.assignmentId}>
                                        <td>{assignment.aircraft?.tailNumber || 'N/A'}</td>
                                        <td>{aircraftModelTranslation[assignment.aircraft?.model] || 'N/A'}</td>
                                        <td>{assignment.aircraft?.weight ? `${assignment.aircraft.weight} ק"ג` : 'N/A'}</td>
                                        <td>{assignment.aircraft?.squadronId || 'N/A'}</td>
                                        <td>{assignment.camera?.cameraType || 'N/A'}</td>
                                        <td>
                                            {assignment.AssignmentArmamentUsage.length > 0 ? (
                                                <ul className={styles.list}>
                                                    {assignment.AssignmentArmamentUsage.map((usage) => (
                                                        <li key={usage.assignmentArmamentUsageId}>
                                                            <strong>סוג:</strong> {usage.armamentType || 'N/A'}, <strong>כמות:</strong> {usage.quantity || 'N/A'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>לא נעשה שימוש בחימוש</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default FlightDetails;