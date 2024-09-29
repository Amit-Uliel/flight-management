'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './UserForm.module.css';
import useFetch from '@/hooks/useFetch';
import SearchLoader from '@/components/ui/loaders/search/SearchLoader';
import { updateUser } from '@/app/actions/UpdateUser';
import Snackbar from '@/components/ui/snackbar/Snackbar';
import OrbitLoadingButton from '@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton';
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
    RAV_ALUF: 'רב אלוף',
};

const roleOptions = [
    { value: 'הטסה', label: 'הטסה' },
    { value: 'מבצעים', label: 'מבצעים' },
    { value: 'טכני', label: 'טכני' },
    { value: 'אדמין', label: 'אדמין' },
];

// Animation variants for slide transitions
const formVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
};

// Snackbar animation variants
const snackbarVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
};

export default function UserForm() {
    const { data: squadrons} = useFetch('/api/squadrons');
    const [militaryId, setMilitaryId] = useState('');
    const [debouncedId, setDebouncedId] = useState(militaryId);
    const [snackbar, setSnackbar] = useState({ message: '', type: '' });
    const [formData, setFormData] = useState({ name: '', role: '', password: '', rank: '', squadronId: '', });
    const [submitLoading, setSubmitLoading] = useState(false);
    const { data, isLoading, error, status } = useFetch(debouncedId ? `/api/users/${debouncedId}` : null);

    // Debounce the militaryId input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedId(militaryId);
        }, 500);

        // Clear the timeout if militaryId changes
        return () => {
            clearTimeout(handler);
        };
    }, [militaryId]);

    // Handle setting user data based on fetch results
    useEffect(() => {
        if (data) {
            setFormData({ 
                name: data.name, 
                role: data.role, 
                password: '',
                rank: data.rank, 
                squadronId: data.squadronId,
            });
        } else if (error) {
            console.error(error);
        }
    }, [data, error]);

    const getErrorMessage = () => {
        if (status === 404) {
            return 'לא נמצא משתמש';
        } else if (status === 500) {
            return 'שגיאת שרת';
        } 
        return 'שגיאה בלתי צפויה';
    };

    const handleInputChange = (e) => {
        setMilitaryId(e.target.value);

        // Reset status and error immediately if input is cleared
        if (e.target.value === '') {
            setDebouncedId('');
        }
    };

    const handleFormChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitLoading(true);

        // Client-side validation for empty fields except password
        if (!formData.name || !formData.role || !formData.rank || !formData.squadronId) {
            setSnackbar({ message: 'יש למלא את כל השדות הנדרשים', type: 'error' });
            setSubmitLoading(false);
            return;
        }

        // Client-side validation
        if (formData.password && formData.password.length < 6) {
            setSnackbar({ message: 'הסיסמה חייבת להכיל לפחות 6 תווים', type: 'error' });
            setSubmitLoading(false);
            return;
        }

        // if the user in not admin and he didn't choose squadron id display an error
        if (formData.role !== 'אדמין' &&  formData.squadronId === '') {
            setSnackbar({ message: 'יש לבחור מספר טייסת עבור משתמש שאינו אדמין.', type: 'error' });
            setSubmitLoading(false);
            return;
        }
    
        // if the user is admin and he chose squadron id display an error
        if (formData.role === 'אדמין' &&  formData.squadronId !== '') {
            setSnackbar({ message: 'אדמין אינו משויך לטייסת.' , type: 'error' });
            setSubmitLoading(false);
            return;
        }
        
        try {
            const data = {
                name: formData.name,
                role: formData.role,
                rank: formData.rank,
                squadronId: formData.squadronId,
                password: formData.password,
            }

            await updateUser(militaryId, data);
            setSnackbar({ message: 'המשתמש עודכן בהצלחה', type: 'success' });
        } catch (error) {
            console.error(error);
            setSnackbar({ message: 'בעיה בעדכון משתמש', type: 'error' });
        } finally {
            setSubmitLoading(false);
        }
    } 

    // Remove snackbar after display duration
    useEffect(() => {
        if (snackbar.message) {
            const timer = setTimeout(() => {
                setSnackbar({ message: '', type: '' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [snackbar]);

    return (
        <div className={styles.userFormBox}>
            <div className={styles.titleBox}>
                <Image
                    src='/update-user.png'
                    width={30}
                    height={30}
                    quality={100}
                    alt="update user"
                />
                <h1 className={styles.title}>עדכון משתמש</h1>
            </div>
            <div className={styles.getUserBox}>
                <label htmlFor="getUser">מספר אישי של המשתמש:</label>
                <div className={styles.inputBox}>
                    <input 
                        type="text" 
                        value={militaryId} 
                        onChange={handleInputChange}
                        className={styles.inputGetUser}
                    />
                    {isLoading && (
                        <div className={styles.loader}>
                            <SearchLoader />
                        </div>
                    )}
                </div>
            </div>
            <AnimatePresence mode='wait'>
                {data ? (
                    <motion.div
                        key={debouncedId}
                        className={styles.formContainer}
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <label>
                                שם:
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name || ''} 
                                    onChange={handleFormChange} 
                                />
                            </label>
                            <label htmlFor="role">
                                תפקיד
                                <select 
                                    id="role" 
                                    name="role" 
                                    value={formData.role} 
                                    onChange={handleFormChange}
                                    className={styles.select}
                                >
                                    <option value="">-- בחר תפקיד --</option>
                                    {roleOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                דרגה:
                                <select 
                                    name="rank"
                                    value={formData.rank || ''} 
                                    onChange={handleFormChange}
                                >
                                    {Object.entries(RANK).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </label>
                            <label htmlFor="squadronId">
                                מספר טייסת
                                <select 
                                    id="squadronId" 
                                    name="squadronId"
                                    value={formData.squadronId} 
                                    onChange={handleFormChange}
                                    className={styles.select}
                                >
                                    <option value=""> בחר טייסת (אדמין לא בוחר טייסת)</option>
                                    {squadrons?.map((squadron) => (
                                        <option key={squadron.squadronId} value={squadron.squadronId}>
                                            {squadron.squadronId}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            {formData.role === 'אדמין' &&  formData.squadronId !== '' && (
                                <p className={styles.adminNote}>אדמין אינו משויך לטייסת*</p>
                            )}
                            <label>
                                שינוי סיסמא:
                                <input 
                                    type="password" 
                                    name="password"
                                    value={formData.password || ''} 
                                    onChange={handleFormChange} 
                                />
                            </label>
                            <OrbitLoadingButton 
                                initialText={'עדכון פרטי משתמש'}
                                loadingText={'מעדכן משתמש'}
                                isLoading={submitLoading}
                                className={styles.submitButton}
                            />
                        </form>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        key="error"
                        className={styles.errorMessage} 
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <div>{getErrorMessage()}</div>
                    </motion.div>
                ) : ''}
            </AnimatePresence>
            <AnimatePresence>
                {snackbar.message && (
                    <motion.div 
                        key="snackbar"
                        className={styles.snackbarBox}
                        variants={snackbarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
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
}