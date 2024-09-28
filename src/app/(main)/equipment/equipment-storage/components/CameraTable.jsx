"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/EquipmentStorage.module.css';
import Image from 'next/image';

export default function CameraTable({ cameras }) {
    const [sortedCameras, setSortedCameras] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const itemsPerPage = 9; // Number of items to display per page

    
    // useEffect to handle sorting whenever sortCriteria or sortOrder changes
    useEffect(() => {
        // Error handling: Ensure cameras is an array
        const camerasData = Array.isArray(cameras) ? cameras : [];

        try {
            const sortedData = [...camerasData].sort((a, b) => {
                if (sortCriteria === 'quantity') {
                    const quantityA = a.quantity ?? 0; // Handle undefined or null values
                    const quantityB = b.quantity ?? 0;
                    return sortOrder === 'asc' ? quantityA - quantityB : quantityB - quantityA;
                } else if (sortCriteria === 'weight') {
                    const weightA = a.weight ?? 0;
                    const weightB = b.weight ?? 0;
                    return sortOrder === 'asc' ? weightA - weightB : weightB - weightA;
                }
                return 0; // No sorting
            });
            setSortedCameras(sortedData);
        } catch (error) {
            console.error("Error sorting cameras:", error);
            setSortedCameras(camerasData); // Fallback to unsorted data
        }
    }, [cameras, sortCriteria, sortOrder]);

    // Calculate total pages
    const totalPages = Math.ceil(cameras.length / itemsPerPage);

    // Calculate the data to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedCameras.slice(indexOfFirstItem, indexOfLastItem);

    // Handler for page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    }

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    }

    return (
        <div className={styles.tableContainer}>
            <h2 className={styles.subTitle}>מצלמות</h2>
            <div className={styles.sortContainer}>
                <label className={styles.sortByLabel} htmlFor="sort">
                    <Image
                        src="/sort.png"
                        alt="sortBy icon"
                        width={22}
                        height={22}
                        quality={100}
                        className={styles.sortByIcon}
                    />
                    <span>מיין לפי:</span>
                </label>
                <select className={styles.sortBySelect} id="sort" value={sortCriteria} onChange={handleSortChange}>
                    <option value="">-- בחר --</option>
                    <option value="weight">משקל</option>
                    <option value="quantity">כמות</option>
                </select>
                <button className={styles.sortOrderButton} onClick={toggleSortOrder}>
                    סדר: {sortOrder === 'asc' ? 'עולה' : 'יורד'}
                </button>
            </div>
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