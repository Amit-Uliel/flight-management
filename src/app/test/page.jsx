"use client";
import { useState } from 'react';
import styles from './test.module.css';
import OrbitLoadingButton from '@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton';

export default function test() {  
  const [isLoading, setIsLoading] = useState(false);
    return (
      <div className={styles.container}>
        <OrbitLoadingButton
          isLoading={isLoading}
          loadingText={'יוצר טיסה'}
          initialText={'צור טיסה'}
        />

        <button onClick={() => setIsLoading(!isLoading)}>press here</button>
      </div>
    );
}
