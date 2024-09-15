"use client";

import '@/app/globals.css';
import Image from "next/image";
import styles from './login.module.css';
import LoginForm from "./components/loginForm/LoginForm";
import { motion } from 'framer-motion';

// Variants for logo animation
const logoVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Variants for LoginForm animation
const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.6
    }
  }
};

// Container to apply stagger effect
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export default function Home() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.wrapper}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.logoImages}>
          <motion.div variants={logoVariants}>
            <Image
              className={styles.firstImage}
              src={'/AirForce.png'}
              width={100}
              height={100}
              quality={100}
              alt="Air Force logo"
              priority={true}
            />
          </motion.div>
          <motion.div variants={logoVariants}>
            <Image
              className={styles.lastImage}
              src={'/IDF.png'}
              width={100}
              height={100}
              quality={100}
              alt="IDF logo"
            />
          </motion.div>
        </motion.div>
        <motion.div className={styles.loginFormWrapper} variants={formVariants}>
          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  );
}