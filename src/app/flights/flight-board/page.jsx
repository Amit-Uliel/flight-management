"use client";

import styles from './flightBoard.module.css';
import FlightTable from '@/app/flights/flight-board/flightBoardComponents/FlightTable';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FlightBoard() {
  
  const [flights, setFlights] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   const token = document.cookie.split('; ').find(row => row.startsWith('token='));

  //   if (!token) {
  //       router.push('/login');
  //   }
  // }, []);

  useEffect(() => {
    const fetchFlights = async () => {
      try{
        const response = await fetch('/api/flights/flightBoard');

        const data = await response.json();

        if(!response.ok){
          throw new Error(data.error || 'יבוא טיסות נכשל')
        }

        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    }
    
    fetchFlights();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>לוח טיסות</h2>   
        <FlightTable flights={flights} />
      </div>
    </main>
  )
}
