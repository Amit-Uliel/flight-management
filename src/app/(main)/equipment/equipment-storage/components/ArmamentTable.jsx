"use client";

import styles from '../styles/EquipmentStorage.module.css';
import { useState } from 'react';

export default function ArmamentTable({ armaments }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Calculate total pages
    const totalPages = Math.ceil(armaments.length / itemsPerPage);

    // Calculate the data to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = armaments.slice(indexOfFirstItem, indexOfLastItem);

    // Handler for page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.tableContainer}>
            <h2>חימושים</h2>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>סוג חימוש</th>
                            <th>משקל</th>
                            <th>כמות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((armament) => (
                            <tr key={armament.armamentType}>
                                <td>{armament.armamentType}</td>
                                <td>{armament.weight}</td>
                                <td>{armament.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`${styles.pageButton} ${
                            currentPage === index + 1 ? styles.activePage : ''
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}