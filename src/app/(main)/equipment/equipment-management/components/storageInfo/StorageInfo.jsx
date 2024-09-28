"use client";

import { useEffect, useState } from 'react';
import styles from '../styles/storageInfo.module.css';

export default function StorageInfo() {
  const [storageInfo, setStorageInfo] = useState({
    aircraft: 0,
    armament: 0,
    camera: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aircraftResponse = await fetch('/api/aircrafts/storage');
        const armamentResponse = await fetch('/api/armaments/storage');
        const cameraResponse = await fetch('/api/cameras/storage');

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
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.storageInfo}>
      <h3 className={styles.totalTitle}>סה״כ מלאי</h3>
      <div className={styles.storageGrid}>
        <div className={styles.storageItem}>
          <h3 className={styles.title}>מטוסים</h3>
          <p className={styles.storageItemText}>
            {loading ? 'טוען מידע' : `${storageInfo.aircraft} במלאי`}
          </p>        </div>
        <div className={styles.storageItem}>
          <h3 className={styles.title}>חימושים</h3>
          <p className={styles.storageItemText}>
            {loading ? 'טוען מידע' : `${storageInfo.armament} במלאי`}
          </p>        </div>
        <div className={styles.storageItem}>
          <h3 className={styles.title}>מצלמות</h3>
          <p className={styles.storageItemText}>
            {loading ? 'טוען מידע' : `${storageInfo.camera} במלאי`}
          </p>
        </div>
      </div>
    </section>
  );
}