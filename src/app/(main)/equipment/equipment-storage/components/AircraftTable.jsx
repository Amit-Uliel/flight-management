"use client";

import { useState } from 'react';
import styles from '../styles/EquipmentStorage.module.css';

export default function AircraftTable({ aircrafts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(aircrafts.length / itemsPerPage);

  // Calculate the data to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = aircrafts.slice(indexOfFirstItem, indexOfLastItem);

  // Handler for page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.tableContainer}>
        <h2>מטוסים</h2>
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>מספר זנב</th>
                    <th>דגם</th>
                    <th>משקל</th>
                    <th>זמינות</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((aircraft) => (
                    <tr key={aircraft.tailNumber}>
                    <td>{aircraft.tailNumber}</td>
                    <td>{aircraft.model}</td>
                    <td>{aircraft.weight}</td>
                    <td>{aircraft.isAvailable ? 'זמין' : 'לא זמין'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        {/* Pagination Controls */}
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