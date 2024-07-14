"use client";

import { useEffect, useState } from "react";
import styles from './test.module.css';
import Loading from "@/components/Loading/Loading";

export default function test() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch('/api/users');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        fetchUsers();
    }, []);
  
    if (users.length !== 0) {
        return <Loading />;
    }

  
    return (
      <div className={styles.container}>
        {users.map((user, index) => (
          <div className={styles.item} key={index}>
            <span className={styles.label}>Name: </span>
            <span className={styles.value}>{user.name}</span>
          </div>
        ))}
      </div>
    );
}
