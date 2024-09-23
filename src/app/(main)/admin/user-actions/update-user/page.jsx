import UserForm from "./components/userForm/UserForm";
import styles from './UpdateUser.module.css';

export default function UpdateUser() {
  return (
    <div className={styles.container}>
      <UserForm/>
    </div>
  )
}
