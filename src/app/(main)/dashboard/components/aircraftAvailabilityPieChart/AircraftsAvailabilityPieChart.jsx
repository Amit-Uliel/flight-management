'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './AircraftsAvailabilityPieChart.module.css';
import Image from 'next/image';

const AircraftsAvailabilityPieChart = () => {
  const [aircraftsAvailability, setAircraftsAvailability] = useState([]);
  const availableAircrafts = aircraftsAvailability.find(aircraftAvailability => aircraftAvailability.name === 'זמין');
  const unavailableAircrafts = aircraftsAvailability.find(aircraftAvailability => aircraftAvailability.name === 'לא זמין');
  const totalAircrafts = availableAircrafts?.value + unavailableAircrafts?.value;

  useEffect(() => {
    // fetch aircrafts
    const fetchAircrafts = async () => {
      try {
        const response = await fetch('/api/aircrafts');
        
        if(!response.ok){
          throw new Error("Failed to fetch aircrafts")
        }

        const data = await response.json();

        // Calculate available and unavailable aircraft counts
        const availableCount = data.filter(aircraft => aircraft.isAvailable).length;
        const unavailableCount = data.filter(aircraft => !aircraft.isAvailable).length;

        setAircraftsAvailability([
          { name: 'זמין', value: availableCount, color: '#A0E7E5'},
          { name: 'לא זמין', value: unavailableCount, color: '#FF5765' },
        ]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAircrafts();
  },[])

  return (
    <div className={styles.aircraftsAvailabilityPieChartBox}>
      <div className={styles.titleBox}>
        <Image
          src="/uav.png"
          alt="uav icon"
          width={38}
          height={38}
          quality={100}
          className={styles.uavIcon}
        />
        <h2 className={styles.title}>מצב זמינות מטוסים</h2>
      </div>
      <div className={styles.chart}>
      {totalAircrafts ? (
        <div className={styles.totalAircraftsContainer}>
          <p>סך הכל מטוסים</p>
          <p className={styles.totalAircraftsValue}>{totalAircrafts}</p>
        </div>
      ) : ''}
        <ResponsiveContainer width="100%" height={'100%'}>
          <PieChart>
            <Pie
              data={aircraftsAvailability}
              labelLine={false}
              innerRadius={'70%'}
              outerRadius={'90%'}
              legendType='line'
              dataKey="value"
            >
              {aircraftsAvailability.map((aircraftAvailability) => (
                <Cell key={aircraftAvailability.name} fill={aircraftAvailability.color} stroke='#fff' strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.options}>
        {aircraftsAvailability.map((aircraftAvailability) => (
          <div className={styles.option} key={aircraftAvailability.name}>
            <div className={styles.title}>
              <div className={styles.dot} style={{backgroundColor: aircraftAvailability.color}} />
              <span>{aircraftAvailability.name}</span>
            </div>
            <span>{aircraftAvailability.value}</span>
          </div>
        ))}  
      </div>
    </div>
  );
};

export default AircraftsAvailabilityPieChart;