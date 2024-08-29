"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/EquipmentStorage.module.css';

export default function CameraTable() {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const response = await fetch('/api/cameras');
                const data = await response.json();
                setCameras(data);
            } catch (error) {
                console.error('Failed to fetch cameras:', error);
            }
        };

        fetchCameras();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <h2>מצלמות</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>סוג מצלמה</th>
                        <th>משקל</th>
                        <th>כמות</th>
                    </tr>
                </thead>
                <tbody>
                    {cameras.map((camera) => (
                        <tr key={camera.cameraType}>
                            <td>{camera.cameraType}</td>
                            <td>{camera.weight}</td>
                            <td>{camera.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}