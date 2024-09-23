'use client';

import { deleteSquadron } from "@/app/actions/squadrons/deleteSquadron";
import { useState, useEffect } from "react";
import styles from './DeleteSquadron.module.css';
import OrbitLoadingButton from "@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton";
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

export default function DeleteSquadron() {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', type: '' });

  const handleDeleteSquadron = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.target);
      const response = await deleteSquadron(formData);
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
    <div className={styles.deleteSquadronContainer}>
      <div className={styles.titleBox}>
        <Image
          src='/torn-paper.png'
          width={30}
          height={30}
          quality={100}
          alt="torn paper" 
        />
        <h1 className={styles.title}>מחיקת טייסת</h1>
      </div>
      <form className={styles.deleteSquadronForm} onSubmit={handleDeleteSquadron}>
        <div className={styles.inputGroup}>
          <label htmlFor="squadronId" className={styles.squadronLabel}>מספר טייסת</label>
          <input type="text" className={styles.squadronInput} id="squadronId" name="squadronId" />
        </div>
        <OrbitLoadingButton 
          initialText={'מחק טייסת'}
          loadingText={'מוחק טייסת'}
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
