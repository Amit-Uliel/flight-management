"use client";
import { useState } from 'react';
import styles from './test.module.css';
import RadarLoader from '@/components/ui/loaders/RadarLoader';

export default function Test() {  
  const [isLoading, setIsLoading] = useState(false);
    return (
      <div className={styles.container}>
        <RadarLoader />
      </div>
    );
}
