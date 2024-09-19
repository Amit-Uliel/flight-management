import UserForm from "./components/userForm/UserForm";
import styles from './UpdateUser.module.css';

export default function UpdateUser() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>עדכון משתמש</h1>
        <UserForm/>
    </div>
  )
}
