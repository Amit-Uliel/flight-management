"use client";

import styles from '../styles/card.module.css';

export default function Card({ title, children }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
}