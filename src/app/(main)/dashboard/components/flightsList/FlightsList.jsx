"use client";

import { useEffect, useState } from 'react';
import styles from './FlightsList.module.css';
import Image from 'next/image';

const COLORS = {
    SCHEDULED: '#fd7e14',  
    IN_FLIGHT: '#3898ff',
    LANDED: '#28a745',
    COMPLETED: '#a2a2a2',
    CANCELED: '#dc3545',
}

export default function FlightsList() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('/api/flights/latest');
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData?.message || 'לא הצליח לייבא מטוסים');
                }
    
                const fetchedFlights = await response.json();
                setFlights(fetchedFlights);
            } catch (error) {
                console.error('Error fetching flights:', error.message);
            }
        };
    
        fetchFlights();
    }, []);

    return (
        <div className={styles.flightsListBox}>
            <div className={styles.titleBox}>
                <Image
                    src="/flight-statuses.png"
                    alt="flight statuses icon"
                    width={38}
                    height={38}
                    quality={100}
                    className={styles.flightStatusesIcon}
                />
                <h2 className={styles.title}>סטטוסי 15 טיסות אחרונות</h2>
            </div>
            <div className={styles.headerRow}>
                <span className={styles.headerId}>מספר טיסה</span>
                <span className={styles.headerMission}>שם משימה</span>
            </div>
            <div className={styles.list}>
                {flights.map((flight) => (
                    <div className={styles.listItem} key={flight.flightId}>
                        <div className={styles.id}>
                            <div className={styles.statusDot} style={{ backgroundColor: COLORS[flight.status] }} />
                            <span className={styles.flightId}>{flight.flightId}</span>
                        </div>
                        <span>{flight.mission.missionName}</span>
                    </div>
                ))}
            </div>
            <hr className={styles.line}/>
            <div className={styles.legend}>
                <div className={styles.scheduled}>
                    <div className={styles.statusDot} style={{ backgroundColor: COLORS['SCHEDULED'] }} />
                    <span>מתקיימת</span>
                </div>
                <div className={styles.inFlight}>
                    <div className={styles.statusDot} style={{ backgroundColor: COLORS['IN_FLIGHT'] }} />
                    <span>באוויר</span>
                </div>
                <div className={styles.landed}>
                    <div className={styles.statusDot} style={{ backgroundColor: COLORS['LANDED'] }} />
                    <span>נחתה</span>
                </div>
                <div className={styles.completed}>
                    <div className={styles.statusDot} style={{ backgroundColor: COLORS['COMPLETED'] }} />
                    <span>הושלמה</span>
                </div>
                <div className={styles.canceled}>
                    <div className={styles.statusDot} style={{ backgroundColor: COLORS['CANCELED'] }} />
                    <span>בוטלה</span>
                </div>
            </div>
        </div>
    )
}

