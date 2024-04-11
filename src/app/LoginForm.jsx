"use client";
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useState } from 'react';

// login form component
export default function LoginForm() {
    
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // handle user login
    const handleLogin = (e) => {
        e.preventDefault();
        
        const correctCredentials = [
            { username: "amit", password: "1234", role: "hatasa" },
            { username: "matan", password: "5678", role: "techni" },
        ];
    
        const user = correctCredentials.find(user => user.username === username && user.password === password);

        if (user) {
            // Redirect to the corresponding page based on the user's role
            switch (user.role) {
                case "hatasa":
                    router.push("/hatasa");
                    break;
                case "techni":
                    router.push("/techni");
                    break;
                // Add cases for additional roles/pages
                default:
                    router.push("/"); // Default redirect to login
                    break;
            }
        } else {
            setError("שם משתמש או סיסמא לא נכונים");
            setTimeout(() => setError(""), 5000);
        }
    }
    

    return (
        <form className={`${styles.flexForm} ${styles.form}`} onSubmit={handleLogin}>
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
