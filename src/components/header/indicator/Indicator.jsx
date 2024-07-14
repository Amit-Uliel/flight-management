import styles from './indicator.module.css'

// components
import Dropdown from './dropdown/Dropdown';
import { useState } from 'react';

// font awasome icon import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Indicator() {
    
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    
    const roleName = "הטסה";

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setHasInteracted(true);
    };

    const handleSignOut = () => {
        // Handle sign-out logic here
        // session clearance
        // redirect to login page
        alert('Signed out');
    };

    return (
        <div className={styles.container}>
            <div className={styles.relative}>
                <div className={styles.dropdownHider}></div>
                <div className={styles.roleContainer} onClick={toggleDropdown}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className={styles.roleName}>{roleName}</span>
                </div>
                <Dropdown 
                    onClose={() => setDropdownVisible(false)}
                    signOut={handleSignOut}
                    isVisible={isDropdownVisible}
                    hasInteracted={hasInteracted} />
            </div>
        </div>
    )
}
