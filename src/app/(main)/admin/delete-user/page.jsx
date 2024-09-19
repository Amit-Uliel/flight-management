
import UserDetails from './components/userDetails/UserDetails';
import styles from './DeleteUser.module.css';

export default function DeleteUser() {
    return (
        <div className={styles.container}>
            <UserDetails />
        </div>
    );
}