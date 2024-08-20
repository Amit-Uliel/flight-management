"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../flightBoardComponents/styles/FlightDetails.module.css';

const FlightDetails = () => {
    const searchParams = useSearchParams();
    const flightId = searchParams.get('flightId');
    const [flightData, setFlightData] = useState(null);

    useEffect(() => {
        if (flightId) {
            fetch(`/api/flights/details/${flightId}`)
                .then((response) => response.json())
                .then((data) => setFlightData(data))
                .catch((error) => console.error('Failed to fetch flight details:', error));
        }
    }, [flightId]);

    if (!flightData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.flightDetailsContainer}>
            <h1>Flight ID: {flightData.flightId}</h1>
        </div>
    );
};

export default FlightDetails;