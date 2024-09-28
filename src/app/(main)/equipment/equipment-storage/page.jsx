"use client";

import ArmamentTable from './components/ArmamentTable';
import CameraTable from './components/CameraTable';
import AircraftTable from './components/AircraftTable';
import styles from './styles/EquipmentStorage.module.css';
import StorageInfo from '../equipment-management/components/storageInfo/StorageInfo';
import { useEffect, useState } from 'react';

export default function EquipmentStorage() {

    const [equipmentToShow, setEquipmentToShow] = useState('aircrafts');
    const [aircraftData, setAircraftData] = useState([]);
    const [cameraData, setCameraData] = useState([]);
    const [armamentData, setArmamentData] = useState([]);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const fetchAircrafts = async () => {
            try {
                const response = await fetch('/api/aircrafts/squadron');
                const data = await response.json();
                setAircraftData(data);
            } catch (error) {
                console.error('Failed to fetch aircrafts:', error);
            }
        };

        const fetchArmaments = async () => {
            try {
                const response = await fetch('/api/armaments');
                const data = await response.json();
                setArmamentData(data);
            } catch (error) {
                console.error('Failed to fetch armaments:', error);
            }
        };

        const fetchCameras = async () => {
            try {
                const response = await fetch('/api/cameras');
                const data = await response.json();
                setCameraData(data);
            } catch (error) {
                console.error('Failed to fetch cameras:', error);
            }
        };

        fetchAircrafts();
        fetchArmaments();
        fetchCameras();
    }, []);

    const handleTabChange = (tabName) => {
        setIsFading(true); // Start fade-out effect
        setTimeout(() => {
          setEquipmentToShow(tabName);
          setIsFading(false); // Start fade-in effect
        }, 300);
    };

    const renderEquipmentStorage = () => {
        switch (equipmentToShow){
            case 'aircrafts':
                return <AircraftTable aircrafts={aircraftData} />;
            case 'armaments':
                return <ArmamentTable armaments={armamentData} />;
            case 'cameras':
                return <CameraTable cameras={cameraData} />;
            default:
                return <p>לא נמצא מלאי עם הציוד המבוקש</p>;
        }
    }

    return (
        <div className={styles.storagePage}>
            <h1 className={styles.title}>מלאי ציוד</h1>
            <StorageInfo />
            <div className={styles.tabs}>
                <button className={`${styles.tabButton} ${equipmentToShow === 'aircrafts' ? styles.active : ''}`}
                    onClick={() => handleTabChange('aircrafts')}
                >
                    מלאי מטוסים
                </button>
                <button className={`${styles.tabButton} ${equipmentToShow === 'armaments' ? styles.active : ''}`}
                    onClick={() => handleTabChange('armaments')}
                >
                    מלאי חימוש
                </button>
                <button className={`${styles.tabButton} ${equipmentToShow === 'cameras' ? styles.active : ''}`}
                    onClick={() => handleTabChange('cameras')}
                >
                    מלאי מצלמות
                </button>
            </div>
            <div className={`${styles.fade} ${isFading ? styles.hidden : ''}`}>
                {renderEquipmentStorage()}
            </div>
        </div>
    );
}
