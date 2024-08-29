import styles from '../styles/indicator.module.css';
import { logout } from '../../../../app/(auth)/actions/logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getRoleName, getUserName } from './userInfo';

export default async function Indicator() {  
    const roleName = await getRoleName();
    const userName = await getUserName();

    return (
        <div className={styles.container}> 
            <span className={styles.userName}>
                ברוך הבא, {userName}
            </span>
            <div className={styles.roleContainer}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <span className={styles.roleName}>{roleName}</span>
            </div>
            <div className={styles.dropdown}>
                <form action={logout}>
                    <button type='submit' className={styles.signOutButton}>
                        יציאה
                    </button>
                </form>
            </div>
        </div>
    )
}