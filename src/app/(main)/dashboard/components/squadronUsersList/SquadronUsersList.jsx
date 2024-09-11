"use client";

import useFetch from '@/hooks/useFetch';
import styles from './SquadronUsersList.module.css';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const RANK = {
    TORAI: 'טוראי',
    RAV_TORAI: 'רב טוראי',
    SAMAL: 'סמל',
    SAMAL_RISHON: 'סמל ראשון',
    RAV_SAMAL: 'רב סמל',
    RAV_SAMAL_MITKADAM: 'רב סמל מתקדם',
    RAV_SAMAL_BAKHIR: 'רב סמל בכיר',
    RAV_NAGAD_MISNE: 'רב נגד משנה',
    RAV_NAGAD: 'רב נגד',
    SAGAN: 'סגן',
    SEREN: 'סרן',
    RAV_SEREN: 'רב סרן',
    SAGAN_ALUF: 'סגן אלוף',
    ALUF_MISHNE: 'אלוף משנה',
    TAT_ALUF: 'תת אלוף',
    ALUF: 'אלוף',
    RAV_ALUF: 'רב אלוף'
};

export default function SquadronUsersList() {
    const { data: users, isLoading, error } = useFetch('/api/users/squadron');
    const [imagesUrls, setImagesUrls] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;
    const supabase = createClient();

    // Fetch profile images
    useEffect(() => {
        const fetchProfileImages = () => {
            const newImagesUrls = {};
            users?.forEach(user => {
                const { data, error } = supabase
                    .storage
                    .from('profile-images')
                    .getPublicUrl(`${user.militaryId}/profile.jpeg`);
                if (error) {
                    console.error(error);
                }
                if (data) {
                    newImagesUrls[user.militaryId] = data.publicUrl;
                }
            });
            setImagesUrls(newImagesUrls);
        };
        if (users) {
            fetchProfileImages();
        }
    }, [users]);

    // Pagination Logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users?.length / usersPerPage);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.squadronUsersListBox}>
            <div className={styles.titleBox}>
                <Image
                    src="/rank.png"
                    alt="rank icon"
                    width={38}
                    height={38}
                    quality={100}
                    className={styles.rankIcon}
                />
                <h2 className={styles.title}>חיילים בטייסת</h2>
                <Image
                    src="/magen-david.png"
                    alt="magen david icon"
                    width={38}
                    height={38}
                    quality={100}
                    className={styles.magenDavid}
                />
            </div>
            <div className={styles.list}>
                {currentUsers ? currentUsers.map((user) => (
                    <div className={styles.listItem} key={user.militaryId}>
                        <div className={styles.imageBox}>
                            <img 
                                src={imagesUrls[user.militaryId]}
                                alt=''
                                className={styles.profileImage}
                            />
                        </div>
                        <h3 className={styles.username}>{user.name}</h3>
                        <div className={styles.userDetails}>
                            <span className={styles.rank}>{RANK[user.rank]}</span>
                            <span className={styles.role}>{user.role}</span>
                        </div>
                    </div>
                )) : ''}
            </div>
            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? styles.activePage : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}