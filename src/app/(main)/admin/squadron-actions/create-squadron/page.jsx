'use client';

import OrbitLoadingButton from "@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton";
import styles from './CreateSquadron.module.css';
import { useState, useEffect } from "react";
import { createSquadron } from "@/app/actions/squadrons/createSquadron";
import Snackbar from "@/components/ui/snackbar/Snackbar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const snackbarVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        x: '-50%',
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 0.3,
            ease: 'easeIn'
        }
    }
}

export default function CreateSquadron() {
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ message: '', type: '' });

    const handleCreateSquadron = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const response = await createSquadron(formData);
        if (response.error) {
            setSnackbar({ message: response.error, type: 'error' });
        } else {
            setSnackbar({ message: response.message, type: 'success' });
        }
        setIsLoading(false);
    }

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
        <div className={styles.createSquadronContainer}>
            <div className={styles.titleBox}>
                <Image
                    src='/add-record.png'
                    width={30}
                    height={30}
                    quality={100}
                    alt="add record" 
                />
                <h1 className={styles.title}>יצירת טייסת</h1>
            </div>
            <form className={styles.createSquadronForm} onSubmit={handleCreateSquadron}>
                <div className={styles.inputGroup}>
                    <label htmlFor="squadronId" className={styles.squadronLabel}>מספר טייסת</label>
                    <input type="text" className={styles.squadronInput} id="squadronId" name="squadronId" />
                </div>
                <OrbitLoadingButton 
                    initialText={'צור טייסת'}
                    loadingText={'יוצר טייסת'}
                    isLoading={isLoading}
                    className={styles.submitButton}
                />
            </form>
            <AnimatePresence>
                {snackbar.message && (
                    <motion.div 
                        className={styles.snackbarBox}
                        variants={snackbarVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                    >
                        <Snackbar message={snackbar.message} type={snackbar.type} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
