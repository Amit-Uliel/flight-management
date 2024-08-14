"use client";

import { useState } from 'react';
import styles from './equipmentManagment.module.css';
import AircraftCard from './equipmentManagementComponents/aircraft/AircraftCard';
import ArmamentCard from './equipmentManagementComponents/armament/ArmamentCard';
import CameraCard from './equipmentManagementComponents/camera/CameraCard';
import StorageInfo from './equipmentManagementComponents/storageInfo/StorageInfo';

export default function EquipmentManagment() {
  const [activeTab, setActiveTab] = useState('add');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'add':
        return (
          <div className={styles.tabContent}>
            <div className={styles.cardItem}><AircraftCard operation="add" /></div>
            <div className={styles.cardItem}><ArmamentCard operation="add" /></div>
            <div className={styles.cardItem}><CameraCard operation="add" /></div>
          </div>
        );
      case 'update':
        return (
          <div className={styles.tabContent}>
            <div className={styles.cardItem}><AircraftCard operation="update" /></div>
            <div className={styles.cardItem}><ArmamentCard operation="update" /></div>
            <div className={styles.cardItem}><CameraCard operation="update" /></div>
          </div>
        );
      case 'delete':
        return (
          <div className={styles.tabContent}>
            <div className={styles.cardItem}><AircraftCard operation="delete" /></div>
            <div className={styles.cardItem}><ArmamentCard operation="delete" /></div>
            <div className={styles.cardItem}><CameraCard operation="delete" /></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <StorageInfo />
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'add' ? styles.activeTabButton : ''}`}
            onClick={() => setActiveTab('add')}
          >
            פעולות הוספה
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'update' ? styles.activeTabButton : ''}`}
            onClick={() => setActiveTab('update')}
          >
            פעולות עדכון
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'delete' ? styles.activeTabButton : ''}`}
            onClick={() => setActiveTab('delete')}
          >
            פעולות מחיקה
          </button>
        </div>
        {renderTabContent()}
      </div>
    </main>
  );
}