"use client";

// hooks import
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// styles import
import '../../globals.css';
import styles from './login.module.css';

// data import
import users from '@/app/_data/users.json';

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
                    router.push("/main");
                    break;

                case "technical":
                    router.push("/main");
                    break;

                case "operations":
                    router.push("/main");
                    break;

                default:
                    router.push("/login"); // Default redirect to login
                    break;
            }
        }
        // did not find any user
        else 
        {
            setError("שם משתמש או סיסמא לא נכונים");
            // setTimeout(() => {
            //     setError('');
            // } ,2000);
        }
    }
    

    return (
        <form className={`${styles.flexContainer} ${styles.form}`} onSubmit={handleLogin}>
            {/* displays an error if any */}
            <p className={`${error ? styles.error : ''}`}>
                {error}
            </p>
            {/* user name */}
            <input className={`ibmHebrew ${styles.input}`} 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='שם משתמש'
            />
            {/* password */}
            <input className={`ibmHebrew ${styles.input} ${styles.inputLastChild}`}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='סיסמא'
            />
            {/* submit button */}
            <button className={`ibmHebrew ${styles.button}`} type="submit">התחבר</button>
        </form>
    )
}
