'use client';

import styles from './AdminActions.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const boxesContainerVariants = {
    hidden: { 
        opacity: 0, 
        y: 20 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: {
            staggerChildren: 0.3,
            ease: 'easeInOut',
        } 
    },
}

const boxVariants = {
    hidden: { 
        opacity: 0, 
        y: 20 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    },
    hover: { 
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    }
}

export default function Admin() {
  return (
    <motion.div className={styles.AdminActionsBox}
        variants={boxesContainerVariants}
        initial='hidden'
        animate='visible'
    >
        <motion.div className={`${styles.box} ${styles.box1}`}
            variants={boxVariants}
            whileHover="hover"
        >
            <Link href={'/admin/user-actions/create-user'}
                className={styles.link}
            >
                <Image
                    src={'/create-user.png'}
                    width={50}
                    height={50}
                    quality={100}
                    alt='רישום משתמש'
                    className={styles.icon}
                />
                <span>רישום משתמש</span>
            </Link>
        </motion.div>
        <motion.div className={`${styles.box} ${styles.box2}`}
            variants={boxVariants}
            whileHover="hover"
        >
            <Link href={'/admin/user-actions/update-user'}
                className={styles.link}
            >
                <Image
                    src={'/update-user.png'}
                    width={50}
                    height={50}
                    quality={100}
                    alt='עדכון משתמש'
                    className={styles.icon}
                />
                <span>עדכון משתמש</span>
            </Link>
        </motion.div>
        <motion.div className={`${styles.box} ${styles.box3}`}
            variants={boxVariants}
            whileHover="hover"
        >
            <Link href={'/admin/user-actions/delete-user'}
                className={styles.link}
            >
                <Image
                    src={'/recycle-bin.png'}
                    width={50}
                    height={50}
                    quality={100}
                    alt='מחיקת משתמש'
                    className={styles.icon}
                />
                <span>מחיקת משתמש</span>
            </Link>
        </motion.div>
        <motion.div className={`${styles.squadronBox}`} variants={boxesContainerVariants}>
            <motion.div className={`${styles.box} ${styles.box4}`}
                variants={boxVariants}
                whileHover="hover"
            >
                <Link href={'/admin/squadron-actions/create-squadron'}
                    className={styles.link}
                >
                    <Image
                        src={'/add-record.png'}
                        width={50}
                        height={50}
                        quality={100}
                        alt='הוספת רשומה'
                        className={styles.icon}
                    />
                    <span>יצירת טייסת</span>
                </Link>
            </motion.div>
            <motion.div className={`${styles.box} ${styles.box5}`}
                variants={boxVariants}
                whileHover="hover"
            >
                <Link href={'/admin/squadron-actions/delete-squadron'}
                    className={styles.link}
                >
                    <Image
                        src={'/torn-paper.png'}
                        width={50}
                        height={50}
                        quality={100}
                        alt='מחיקת רשומה'
                        className={styles.icon}
                    />
                    <span>מחיקת טייסת</span>
                </Link>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}
