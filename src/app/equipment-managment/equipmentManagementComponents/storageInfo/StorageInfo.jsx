"use client";

import { useEffect, useState } from 'react';
import styles from '../styles/storageInfo.module.css';

export default function StorageInfo() {
  const [storageInfo, setStorageInfo] = useState({
    aircraft: 0,
    armament: 0,
    camera: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aircraftResponse = await fetch('/api/aircrafts?operation=storage');
        const armamentResponse = await fetch('/api/armaments?operation=storage');
        const cameraResponse = await fetch('/api/cameras?operation=storage');

        const aircraftData = await aircraftResponse.json();
        const armamentData = await armamentResponse.json();
        const cameraData = await cameraResponse.json();

        setStorageInfo({
          aircraft: aircraftData.quantity || 0,
          armament: armamentData.quantity || 0,
          camera: cameraData.quantity || 0,
        });
      } catch (error) {
        console.error('Failed to fetch storage data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.storageInfo}>
      <h2>מידע על מלאי</h2>
      <div className={styles.storageGrid}>
        <div className={styles.storageItem}>
          <h3 className={styles.title}>מטוסים</h3>
          <p>{storageInfo.aircraft} במלאי</p>
        </div>
        <div className={styles.storageItem}>
          <h3 className={styles.title}>חימושים</h3>
          <p>{storageInfo.armament} במלאי</p>
        </div>
        <div className={styles.storageItem}>
          <h3 className={styles.title}>מצלמות</h3>
          <p>{storageInfo.camera} במלאי</p>
        </div>
      </div>
    </section>
  );
}