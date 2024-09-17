"use client";

import useFetch from '@/hooks/useFetch';
import styles from './SquadronUsersList.module.css';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
  RAV_ALUF: 'רב אלוף',
};

const supabase = createClient();

export default function SquadronUsersList() {
    const { data: users } = useFetch('/api/users/squadron');
    const { data: userCookie } = useFetch('/api/users/cookies');
    const [imagesUrls, setImagesUrls] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    useEffect(() => {
        const fetchProfileImages = async () => {
            const newImagesUrls = {};

            await Promise.all(users?.map(async (user) => {
                const { data } = supabase
                .storage
                .from('profile-images')
                .getPublicUrl(`${user.militaryId}/profile.jpeg`);

                // Check if the image actually exists
                const response = await fetch(data.publicUrl, { method: 'HEAD' });

                if (response.ok) {
                    newImagesUrls[user.militaryId] = data.publicUrl;
                } else {
                    newImagesUrls[user.militaryId] = '/no-image.png';
                }
            }));

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
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Framer Motion animation variants
  const variants = {
    initial: { opacity: 0, x: '-600px' },
    animate: { opacity: 1, x: '0' },
    exit: { opacity: 0, x: '600px' },
  };

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
                {userCookie && <h2>חיילים בטייסת {userCookie?.squadronId}</h2>}
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
                <AnimatePresence mode='wait'>
                    {currentUsers ? currentUsers.map((user) => (
                        <motion.div
                            key={user.militaryId}
                            className={styles.listItem}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{
                                type: 'tween',
                                ease: 'easeOut',
                                duration: 0.2,
                            }}
                        >
                            <div className={styles.imageBox}>
                                {imagesUrls[user.militaryId] && (
                                    <Image
                                        src={imagesUrls[user.militaryId] || '/no-image.png'}
                                        alt='profile image'
                                        className={styles.profileImage}
                                        width={100}
                                        height={100}
                                        quality={100}
                                    />
                                )}
                            </div>
                            <h3 className={styles.username}>{user.name}</h3>
                            <div className={styles.userDetails}>
                                <span className={styles.rank}>{RANK[user.rank]}</span>
                                <span className={styles.role}>{user.role}</span>
                            </div>
                        </motion.div>
                    )) : null}
                </AnimatePresence>
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