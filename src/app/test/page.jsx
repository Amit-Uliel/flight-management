"use client";

import { useEffect, useState } from "react";
import styles from './test.module.css';
import { LineChart } from '@mui/x-charts/LineChart';
import Loading from "@/components/loading/Loading";

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
        return (
            <div className={styles.container}>
                <h3 className={styles.title}>כותרת</h3>
                <LineChart
                    className={styles.chart}
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
        )
        //return <Loading />;
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
