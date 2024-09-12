'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import styles from '../styles/chart.module.css';

const COLORS = ['#15ffa9', '#eab625', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AircraftsAvailabilityPieChart = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const availableAircrafts = aircrafts.find(aircraft => aircraft.name === 'זמין');
  const unavailableAircrafts = aircrafts.find(aircraft => aircraft.name === 'לא זמין');
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

        setAircrafts([
          { name: 'זמין', value: availableCount },
          { name: 'לא זמין', value: unavailableCount },
        ]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAircrafts();
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <h3 className={styles.title}>מצב זמינות מטוסים</h3>
        <p>מספר מטוסים <span className={styles.availableAircrafts}>זמינים</span>: {availableAircrafts?.value || 'טוען'}</p>
        <p>מספר מטוסים <span className={styles.unavailableAircrafts}>לא זמינים</span>: {unavailableAircrafts?.value || 'טוען'}</p>
        <p className={styles.totalAircrafts}>סך הכל מטוסים: {totalAircrafts || 'טוען'}</p>
      </div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={aircrafts}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {aircrafts.map((aircraft, index) => (
                <Cell key={aircraft.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="top" align='left' layout='horizontal' wrapperStyle={}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AircraftsAvailabilityPieChart;