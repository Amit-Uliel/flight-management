"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './login.module.css';
import users from './_data/users.json';

// login form component
export default function LoginForm() {
    
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // handle user login
    const handleLogin = (e) => {
        e.preventDefault();
    
        // find the user in the json (need to change it to database)
        const user = users.find(user => user.name === username && user.password === password);

        if (user) 
        {
            // Redirect to the corresponding page based on the user's role
            switch (user.role) 
            {
                case "flight":
                    router.push("/flight");
                    break;

                case "technical":
                    router.push("/technical");
                    break;

                case "operations":
                    router.push("/operations");
                    break;

                default:
                    router.push("/"); // Default redirect to login
                    break;
            }
        } 
        else 
        {
            setError("שם משתמש או סיסמא לא נכונים");
            setTimeout(() => setError(""), 5000);
        }
    }
    

    return (
        <form className={`${styles.flexContainer} ${styles.form}`} onSubmit={handleLogin}>
            {/* displays an error if any */}
            <p className={styles.error}>{error}</p>
            {/* user name */}
            <input className={styles.input} 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='שם משתמש'
            />
            {/* password */}
            <input className={`${styles.input} ${styles.inputLastChild}`}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='סיסמא'
            />
            {/* submit button */}
            <button className={styles.button} type="submit">התחבר</button>
        </form>
    )
}
