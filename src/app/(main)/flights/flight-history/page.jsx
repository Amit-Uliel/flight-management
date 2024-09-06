"use client";

import React, { useEffect, useState } from 'react';
import FlightHistoryTable from './components/FlightHistoryTable';
import styles from './flightHistory.module.css';

const FlightHistory = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlightHistory = async () => {
            try {
                const response = await fetch('/api/flights/history');
                const data = await response.json();
                setFlights(data);
            } catch (error) {
                console.error('Failed to fetch flight history:', error);
            }
        };
    
        fetchFlightHistory();
    }, []);

    return (
        <div className={styles.historyPage}>
            <FlightHistoryTable flights={flights} />
        </div>
    );
};

export default FlightHistory;