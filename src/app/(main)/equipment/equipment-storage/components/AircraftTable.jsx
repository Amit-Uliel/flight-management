"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/EquipmentStorage.module.css';
import Image from 'next/image';

// Function to translate aircraft model to Hebrew
const translateAircraftModel = (model) => {
    const translations = {
        HERMES_450: 'הרמס 450',
        HERMES_900: 'הרמס 900',
        HERMES_1000: 'הרמס 1000',
    };
    return translations[model] || model;
};

// Function to extract numerical part from the model string
const extractModelNumber = (model) => {
    const match = model.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

export default function AircraftTable({ aircrafts }) {
    const [sortedAircrafts, setSortedAircrafts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Sort the aircrafts based on the selected criteria
    useEffect(() => {
        const sortAircrafts = () => {
            const sortedData = [...aircrafts].sort((a, b) => {
                if (sortCriteria.includes('model')) {
                    const modelA = extractModelNumber(a.model);
                    const modelB = extractModelNumber(b.model);
                    return sortOrder === 'asc' ? modelA - modelB : modelB - modelA;
                }

                if (sortCriteria.includes('isAvailable')) {
                    return sortOrder === 'asc' ? a.isAvailable - b.isAvailable : b.isAvailable - a.isAvailable;
                }

                return 0; // No sorting
            });

            setSortedAircrafts(sortedData);
        };

        sortAircrafts();
    }, [aircrafts, sortCriteria, sortOrder]);

    // Calculate total pages
    const totalPages = Math.ceil(aircrafts.length / itemsPerPage);

    // Calculate the data to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAircrafts.slice(indexOfFirstItem, indexOfLastItem);

    // Handler for page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle sorting criteria change
    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    // Handle sorting order change
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className={styles.tableContainer}>
            <h2 className={styles.subTitle}>מטוסים</h2>
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
                    <option value="model">דגם</option>
                    <option value="isAvailable">זמינות</option>
                </select>
                <button className={styles.sortOrderButton} onClick={toggleSortOrder}>
                    סדר: {sortOrder === 'asc' ? 'עולה' : 'יורד'}
                </button>
            </div>
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
                            <td>{translateAircraftModel(aircraft.model)}</td>
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