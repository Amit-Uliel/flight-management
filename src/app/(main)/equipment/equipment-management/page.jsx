"use client";

import { useState } from 'react';
import styles from './equipmentManagment.module.css';
import AircraftCard from './components/aircraft/AircraftCard';
import ArmamentCard from './components/armament/ArmamentCard';
import CameraCard from './components/camera/CameraCard';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: {
    opacity: 0, 
    x: '-90vw',
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: '90vw',
    transition: { duration: 0.6, ease: "easeInOut" },
  }
}

export default function EquipmentManagment() {
  const [activeTab, setActiveTab] = useState('add');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'add':
        return (
          <motion.div className={styles.tabContent} variants={variants} key='add' initial='enter' animate='center' exit='exit'>
            <div className={styles.cardItem}><AircraftCard operation="add" /></div>
            <div className={styles.cardItem}><ArmamentCard operation="add" /></div>
            <div className={styles.cardItem}><CameraCard operation="add" /></div>
          </motion.div>
        );
      case 'update':
        return (
          <motion.div className={styles.tabContent} key='update' variants={variants} initial='enter' animate='center' exit='exit'>
            <div className={styles.cardItem}><AircraftCard operation="update" /></div>
            <div className={styles.cardItem}><ArmamentCard operation="update" /></div>
            <div className={styles.cardItem}><CameraCard operation="update" /></div>
          </motion.div>
        );
      case 'delete':
        return (
          <motion.div className={styles.tabContent} key='delete' variants={variants} initial='enter' animate='center' exit='exit'>
            <div className={styles.cardItem}><AircraftCard operation="delete" /></div>
            <div className={styles.cardItem}><ArmamentCard operation="delete" /></div>
            <div className={styles.cardItem}><CameraCard operation="delete" /></div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.pageTitle}>ניהול ציוד</h2>
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
          <AnimatePresence mode='wait'>
            {renderTabContent()}
          </AnimatePresence>
      </div>
    </div>
  );
}