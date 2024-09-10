"use client";

import { useEffect, useState } from "react";
import styles from './ArmamentInfoBarChart.module.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import useFetch from "@/hooks/useFetch";

const COLORS = ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948'];

const getRectanglePath = (x, y, width, height) => {
    return `M${x},${y} h${width} v${height} h-${width} Z`;
  };
  
  const RectangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getRectanglePath(x, y, width, height)} stroke="none" fill={fill} />;
  };

export default function ArmamentInfoBarChart() {
    const { data: armaments, isLoading, error } = useFetch('/api/armaments');

    return (
        <div className={styles.armamentInfoBarChartBox}>
            <h2 className={styles.title}>כמות חימוש</h2>
            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={'100%'}>
                    <BarChart
                        data={armaments}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis 
                            dataKey="armamentType"
                            tick={{fill: '#fff'}}
                        />
                        <YAxis 
                            width={50} 
                            tick={{fill: '#fff'}}
                            tickCount={6}
                        />
                        <Bar dataKey="quantity" shape={<RectangleBar />} label={{ position: 'top', fill: '#fff' }}>
                            {armaments ? (
                                armaments.map((armament, index) => (
                                    <Cell key={armament.armamentType} fill={COLORS[index % COLORS.length]} />
                                ))
                            ) : ''}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
