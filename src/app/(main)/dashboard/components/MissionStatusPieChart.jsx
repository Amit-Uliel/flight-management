"use client";

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from '../styles/chart.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Colors for different statuses

const MissionStatusPieChart = () => {
  const [missionStatusData, setMissionStatusData] = useState([]);

  // Fetch mission status data from the backend
  useEffect(() => {
    const fetchMissionStatusData = async () => {
      try {
        const response = await fetch('/api/missions/status');
        const data = await response.json();
        setMissionStatusData(data);
      } catch (error) {
        console.error('Failed to fetch mission status data:', error);
      }
    };

    fetchMissionStatusData();
  }, []);

  return (
    <div className={styles.container}>
      <PieChart width={400} height={400}>
        <Pie
          data={missionStatusData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {missionStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MissionStatusPieChart;