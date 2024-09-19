'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '@/hooks/useFetch';
import { createClient } from '@/utils/supabase/client';
import styles from './UserDetails.module.css';
import Snackbar from '@/components/ui/snackbar/Snackbar';
import SearchLoader from '@/components/ui/loaders/search/SearchLoader';
import Image from 'next/image';
import { deleteUser } from '@/app/actions/DeleteUser';

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

// Initialize Supabase client
const supabase = createClient();

const UserDetails = () => {
    const [militaryId, setMilitaryId] = useState('');
    const [debouncedId, setDebouncedId] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [snackbar, setSnackbar] = useState({ message: '', type: '' });
    const [isDeleting, setIsDeleting] = useState(false);
    const { data, error, isLoading } = useFetch(debouncedId ? `/api/users/${debouncedId}` : null);
    
    // Track if details are currently transitioning
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Debounce the militaryId input
    useEffect(() => {
        const handler = setTimeout(() => {
            // If militaryId is different, trigger exit animation
            if (debouncedId !== militaryId) {
                setIsTransitioning(true); // Start exit animation
                setDebouncedId(''); // Clear current data to trigger exit animation
                setTimeout(() => {
                    setDebouncedId(militaryId); // Set new ID after exit animation completes
                    setIsTransitioning(false); // Reset transition state
                }, 500);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [militaryId]);

    // Fetch the profile image from Supabase Storage
    useEffect(() => {
        if (debouncedId) {
            const fetchProfileImage = async () => {
                const { data: image } = supabase
                    .storage
                    .from('profile-images')
                    .getPublicUrl(`${debouncedId}/profile.jpeg`);

                if (image.publicUrl) {
                    try {
                        const response = await fetch(image.publicUrl, { method: 'HEAD' });

                        if (response.ok) {
                            setProfileImageUrl(image.publicUrl);
                        } else {
                            setProfileImageUrl('/no-image.png');
                        }
                    } catch (error) {
                        console.error('Error fetching image:', error);
                        setProfileImageUrl('/no-image.png');
                    }
                } else {
                    setProfileImageUrl('/no-image.png');
                }
            };

            fetchProfileImage();
        }
    }, [debouncedId]);

    const handleDelete = async () => {
        // Show a confirmation dialog in Hebrew
        const confirmDelete = window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש הזה?');
        if (!confirmDelete) return;

        setIsDeleting(true); // Set deletion loading state
        try {
            await deleteUser(militaryId);
            setSnackbar({ message: 'המשתמש נמחק בהצלחה', type: 'success' });
            setIsTransitioning(true); // Trigger exit animation
        } catch (error) {
            console.error('Error deleting user:', error);
            setSnackbar({ message: error.message || 'שגיאה במחיקת המשתמש', type: 'error' });
        } finally {
            setIsDeleting(false); // Reset deletion loading state
        }
    };

    // Automatically hide the snackbar after 5 seconds
    useEffect(() => {
        if (snackbar.message) {
            const timer = setTimeout(() => {
                setSnackbar({ message: '', type: '' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [snackbar]);

    return (
        <div className={styles.userDetailsContainer}>
            <h1 className={styles.title}>מחיקת משתמש</h1>
            <label htmlFor="getUser" className={styles.getUserLabel}>הזן מספר אישי של המשתמש</label>
            <div className={styles.inputBox}>
                <input 
                    type="text" 
                    id='getUser'
                    value={militaryId} 
                    onChange={(e) => setMilitaryId(e.target.value)}
                    className={styles.inputGetUser}
                />
                {isLoading && (
                    <div className={styles.loader}>
                        <SearchLoader />
                    </div>
                )}
            </div>
            {error && !data && (
                <div className={styles.errorMessage}>לא נמצא פרטי משתמש</div>
            )}
            <AnimatePresence mode="wait">
                {!isTransitioning && data && (
                    <motion.div
                        key={data.id}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.details}>
                            <div className={styles.imageBox}>
                                {profileImageUrl && (
                                    <Image 
                                        src={profileImageUrl}
                                        width={100}
                                        height={100}
                                        quality={100}
                                        alt="Profile Image" 
                                        className={styles.profileImage}
                                    />
                                )}
                            </div>
                            <div className={styles.userDetailItems}>
                                <p className={styles.userDetailItem}>שם: {data.name}</p>
                                <p className={styles.userDetailItem}>תפקיד: {data.role}</p>
                                <p className={styles.userDetailItem}>דרגה: {RANK[data.rank]}</p>
                                <p className={styles.userDetailItem}>מספר טייסת: {data.squadronId}</p>
                            </div>
                            <button className={styles.deleteButton} onClick={handleDelete}>
                                <Image
                                    src={'/recycle-bin.png'}
                                    width={23}
                                    height={23}
                                    quality={100}
                                    className={styles.binIcon}
                                    alt='bin'
                                />                
                                <span>מחק משתמש</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {isDeleting && (
                <div className={styles.deletingLoader}>משתמש נמחק...</div>
            )}
            <AnimatePresence>
                {snackbar.message && (
                    <motion.div 
                        key="snackbar"
                        className={styles.snackbarBox}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Snackbar 
                            message={snackbar.message} 
                            type={snackbar.type}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDetails;