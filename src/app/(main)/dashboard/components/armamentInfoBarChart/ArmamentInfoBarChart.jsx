"use client";

import styles from './ArmamentInfoBarChart.module.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const COLORS = ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948'];
const ITEMS_PER_PAGE = COLORS.length;

const getRectanglePath = (x, y, width, height) => {
    return `M${x},${y} h${width} v${height} h-${width} Z`;
};
  
const RectangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getRectanglePath(x, y, width, height)} stroke="none" fill={fill} />;
};

  // Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.customTooltip}>
                <p className={styles.label}><strong>שם חימוש:</strong> {label}</p>
                <p className={styles.value}><strong>כמות:</strong> {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

export default function ArmamentInfoBarChart() {
    const { data: armaments, isLoading, error } = useFetch('/api/armaments');
    const [currentPage, setCurrentPage] = useState(0);
    const [currentArmaments, setCurrentArmaments] = useState([]);

    useEffect(() => {
        if (armaments) {
            const startIndex = currentPage * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            setCurrentArmaments(armaments.slice(startIndex, endIndex));
        }
    }, [armaments, currentPage]);

    const handleNextPage = () => {
        if ((currentPage + 1) * ITEMS_PER_PAGE < armaments.length) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className={styles.armamentInfoBarChartBox}>
            <div className={styles.header}>
                <div className={styles.titleBox}>
                    <Image
                        src="/missles.png"
                        alt="missles icon"
                        width={35}
                        height={35}
                        quality={100}
                        className={styles.misslesIcon}
                    />
                    <h2 className={styles.title}>כמות חימוש</h2>
                </div>
                <div className={styles.paginationControls}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>הקודם</button>
                    <button onClick={handleNextPage} disabled={(currentPage + 1) * ITEMS_PER_PAGE >= armaments?.length}>
                        הבא
                    </button>
                </div>
            </div>
            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={'100%'}>
                    <BarChart
                        data={currentArmaments}
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
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                            dataKey="quantity" 
                            shape={<RectangleBar />} 
                            label={{ position: 'top', fill: '#fff' }}
                        >
                            {currentArmaments.map((armament, index) => (
                                <Cell key={armament.armamentType} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
