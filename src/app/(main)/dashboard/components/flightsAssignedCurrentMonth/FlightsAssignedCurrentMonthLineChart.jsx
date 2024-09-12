"use client";

import Image from 'next/image';
import styles from './FlightsAssignedCurrentMonthLineChart.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useFetch from '@/hooks/useFetch';

export default function FlightsAssignedCurrentMonthLineChart() {
    const { data: chartData, isLoading, error } = useFetch('/api/flights/assigned-current-month');

    // Tooltip custom content formatter in Hebrew
    const renderTooltip = (data) => {
        if (data && data.payload && data.payload.length > 0) {
            const { day, count } = data.payload[0].payload;
            return (
                <div className={styles.customTooltip}>
                    <p>{`יום: ${day}`}</p>
                    <p>{`מספר טיסות: ${count}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.FlightsAssignedCurrentMonthLineChartBox}>
            <div className={styles.titleBox}>
            <Image
                src="/calendar.png"
                alt="calendar icon"
                width={38}
                height={38}
                quality={100}
                className={styles.calendarIcon}
            />
                <h2>טיסות שהוקצו החודש</h2>
            </div>
            {chartData?.length > 0 && (
                <div className={styles.chart}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                            data={chartData}
                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="day" tick={{ fill: '#fff' }} height={20} />
                            <YAxis tick={{ fill: '#fff' }} width={30} />
                            <Tooltip  content={renderTooltip} />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}