import UserRegistrationForm from "./components/userRegistrationForm/UserRegistrationForm";
import styles from './CreateUser.module.css';

export default function CreateUser() {
    return (
        <div className={styles.createUserBox}>
            <div className={styles.formBox}>
                <UserRegistrationForm />
            </div>
        </div>
    );
}