'use client';

import { useState } from 'react';
import { login } from '../../actions/login';
import styles from './styles/LoginForm.module.css';
import OrbitLoadingButton from '@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton';

export default function LoginForm() {
  const [militaryId, setMilitaryId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Create a FormData object from the form inputs
    const formData = new FormData(event.target);

    // Simulate form validation or authentication process
    if (!militaryId || !password) {
      setError('נא למלא את כל השדות');
      return;
    }

    try {
      setIsLoading(true);
      await login(formData); // Call login function with formData
    } catch (error) {
      console.error(error);
      setError('מספר אישי או סיסמא אינם נכונים'); // Set error message on failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>התחברות</h2>
      <label htmlFor="militaryId" className={styles.label}>מספר אישי:</label>
      <input
        id="militaryId"
        name="militaryId"
        type="text"
        value={militaryId}
        onChange={(e) => setMilitaryId(e.target.value)}
        className={styles.input}
      />
      <label htmlFor="password" className={styles.label}>סיסמא:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <span className={`${styles.error} ${error ? styles.active : ''}`}>{error}</span>
      <OrbitLoadingButton
        className={styles.button}
        initialText = {'התחבר'}
        isLoading={isLoading}
        loadingText={'מתחבר'}
      />
    </form>
  );
}