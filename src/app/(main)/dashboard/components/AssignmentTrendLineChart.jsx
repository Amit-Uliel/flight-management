"use client";

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// NEED TO CHANGE ONLY FETCH COMPLETED and CANCELLED
const AssignmentTrendLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/assignments/status');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch assignment status data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Assignment Trend Over Last 3 Months</h2>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="SCHEDULED" stroke="#8884d8" />
        <Line type="monotone" dataKey="COMPLETED" stroke="#82ca9d" />
        <Line type="monotone" dataKey="CANCELED" stroke="#ff4d4d" />
        <Line type="monotone" dataKey="ONGOING" stroke="#ffa500" />
      </LineChart>
    </div>
  );
};

export default AssignmentTrendLineChart;