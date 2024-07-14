"use client";

import styles from './flightHistory.module.css';
import HistoryCard from './flightHistoryComponents/historyCard/HistoryCard';
import React, { useEffect, useState } from 'react';

export default function FlightHistory() {

  const [flights, setFlights] = useState([]);

  // useEffect(() => {
  //   const fetchFlightInfo = async () => {
  //     try {
  //       const response = await fetch('/api/flight-details');
  //       const data = await response.json();
  //       setFlights(data);
  //     } catch (error) {
  //       console.error('Error fetching flight details:', error);
  //     }
  //   };

  //   fetchFlightInfo();
  // }, []);

  if (flights.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className={styles.container}>
        <HistoryCard />
        <HistoryCard />
      </div>
    </main>
  );
}
