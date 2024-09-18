import UserForm from "./components/userForm/UserForm";
import styles from './UpdateUser.module.css';

export default function page() {
  return (
    <div className={styles.container}>
        <UserForm/>
    </div>
  )
}
