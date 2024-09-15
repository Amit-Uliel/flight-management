'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './AircraftsAvailabilityPieChart.module.css';
import Image from 'next/image';
import useFetch from '@/hooks/useFetch';

const AircraftsAvailabilityPieChart = () => {
  const { data: aircrafts } = useFetch('api/aircrafts/squadron');
  const { data: userCookie } = useFetch('/api/users/cookies');
  const [aircraftsAvailability, setAircraftsAvailability] = useState([]);
  const [totalAircrafts, setTotalAircrafts] = useState(0);

  useEffect(() => {
    if (aircrafts) {
      const available = aircrafts.filter(aircraft => aircraft.isAvailable);
      const unavailable = aircrafts.filter(aircraft => !aircraft.isAvailable);

      setAircraftsAvailability([
        { name: 'זמין', value: available.length, color: '#A0E7E5' },
        { name: 'לא זמין', value: unavailable.length, color: '#FF5765' },
      ]);

      // Set the total aircraft count
      setTotalAircrafts(available.length + unavailable.length);
    }
  }, [aircrafts]);

  return (
    <div className={styles.aircraftsAvailabilityPieChartBox}>
      <div className={styles.titleBox}>
        <Image
          src="/uav.png"
          alt="uav icon"
          width={35}
          height={35}
          quality={100}
          className={styles.uavIcon}
        />
        {userCookie && <h2 className={styles.title}>מצב זמינות מטוסים {userCookie?.squadronId}</h2>}
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
              data={aircraftsAvailability.length > 0 ? aircraftsAvailability : []}
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