"use client";

import React, { useEffect, useState } from 'react';
import FlightHistoryTable from './flightHistoryComponents/FlightHistoryTable';
import styles from './flightHistory.module.css';

const FlightHistory = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetch('/api/flights/history')
            .then((response) => response.json())
            .then((data) => {
                setFlights(data.filter(flight => flight.status === 'COMPLETED' || flight.status === 'CANCELED'));
            })
            .catch((error) => {
                console.error('Failed to fetch flight history:', error);
            });
    }, []);

    return (
        <div className={styles.historyPage}>
            <h2 className={styles.title}>היסטוריית טיסות</h2>
            <FlightHistoryTable flights={flights} />
        </div>
    );
};

export default FlightHistory;