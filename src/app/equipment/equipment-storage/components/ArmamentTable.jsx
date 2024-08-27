"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/EquipmentStorage.module.css';

export default function ArmamentTable() {
    const [armaments, setArmaments] = useState([]);

    useEffect(() => {
        const fetchArmaments = async () => {
            try {
                const response = await fetch('/api/armaments');
                const data = await response.json();
                setArmaments(data);
            } catch (error) {
                console.error('Failed to fetch armaments:', error);
            }
        };

        fetchArmaments();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <h2>חימושים</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>סוג חימוש</th>
                        <th>משקל</th>
                        <th>כמות</th>
                    </tr>
                </thead>
                <tbody>
                    {armaments.map((armament) => (
                        <tr key={armament.armamentType}>
                            <td>{armament.armamentType}</td>
                            <td>{armament.weight}</td>
                            <td>{armament.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}