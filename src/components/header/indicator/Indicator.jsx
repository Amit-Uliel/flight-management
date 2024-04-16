import styles from './indicator.module.css'
import Image from 'next/image';

// font awasome icon import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Indicator() {
    
    // will use sessions
    const roleName = "הטסה";

    return (
        <div className={styles.div}>
            <Image
                src={'/AirForce.png'}
                width={60}
                height={60}
                quality={100}
            />
            <div className={styles.roleContainer}>
                <FontAwesomeIcon
                    icon={faUser}
                />
                <span className={styles.roleName}>
                    {roleName}
                </span>
            </div>
        </div>
    )
}
