"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/EquipmentStorage.module.css';

export default function AircraftTable() {
    const [aircrafts, setAircrafts] = useState([]);

    useEffect(() => {
        const fetchAircrafts = async () => {
            try {
                const response = await fetch('/api/aircrafts');
                const data = await response.json();
                setAircrafts(data);
            } catch (error) {
                console.error('Failed to fetch aircrafts:', error);
            }
        };

        fetchAircrafts();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <h2>מטוסים</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>מספר זנב</th>
                        <th>דגם</th>
                        <th>משקל</th>
                        <th>זמינות</th>
                    </tr>
                </thead>
                <tbody>
                    {aircrafts.map((aircraft) => (
                        <tr key={aircraft.tailNumber}>
                            <td>{aircraft.tailNumber}</td>
                            <td>{aircraft.model}</td>
                            <td>{aircraft.weight}</td>
                            <td>{aircraft.isAvailable ? 'זמין' : 'לא זמין'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}