import styles from './dropdown.module.css';
import { useRef, useEffect } from 'react';

export default function Dropdown({ onClose, signOut, isVisible, hasInteracted }) {
    const dropdownRef = useRef(null);

    const dropdownItems = [
        <button className={styles.dropdownButton} onClick={signOut}>יציאה</button>,
        <button className={styles.dropdownButton} onClick={() => alert('Another action')}>עוד פעולה</button>
        // Add more items as needed
    ];

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div 
            ref={dropdownRef} 
            className={`${styles.dropdown} 
                        ${hasInteracted ? isVisible ? styles.slideRight : styles.slideLeft : ''}`}>
            {dropdownItems.map((item, index) => (
                <div key={index} className={styles.dropdownItem}>
                    {item}
                </div>
            ))}
        </div>
    )
}
