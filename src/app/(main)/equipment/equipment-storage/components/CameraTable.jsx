"use client";

import { useState } from 'react';
import styles from '../styles/EquipmentStorage.module.css';

export default function CameraTable({ cameras }) {
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const itemsPerPage = 9; // Number of items to display per page

    // Calculate total pages
    const totalPages = Math.ceil(cameras.length / itemsPerPage);

    // Calculate the data to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cameras.slice(indexOfFirstItem, indexOfLastItem);

    // Handler for page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.tableContainer}>
            <h2>מצלמות</h2>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>סוג מצלמה</th>
                        <th>משקל</th>
                        <th>כמות</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Use `currentItems` instead of `cameras` to display paginated data */}
                    {currentItems.map((camera) => (
                        <tr key={camera.cameraType}>
                        <td>{camera.cameraType}</td>
                        <td>{camera.weight}</td>
                        <td>{camera.quantity}</td>
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