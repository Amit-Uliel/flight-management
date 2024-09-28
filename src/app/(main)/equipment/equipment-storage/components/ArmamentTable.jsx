"use client";

import styles from '../styles/EquipmentStorage.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ArmamentTable({ armaments }) {
    const [sortedArmaments, setSortedArmaments] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    
    useEffect(() => {
        // Error handling: Ensure armaments is an array
        const armamentsData = Array.isArray(armaments) ? armaments : [];

        try {
            const sortedData = [...armamentsData].sort((a, b) => {
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
            setSortedArmaments(sortedData);
        } catch (error) {
            console.error("Error sorting armaments:", error);
            setSortedArmaments(armamentsData); // Fallback to unsorted data
        }
    }, [armaments, sortCriteria, sortOrder]);

    // Calculate total pages
    const totalPages = Math.ceil(armaments.length / itemsPerPage);

    // Calculate the data to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedArmaments.slice(indexOfFirstItem, indexOfLastItem);

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
            <h2 className={styles.subTitle}>חימושים</h2>
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