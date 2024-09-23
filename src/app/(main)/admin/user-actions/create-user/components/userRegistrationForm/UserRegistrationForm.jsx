"use client";

import { useState } from 'react';
import styles from './UserRegistrationForm.module.css';
import useFetch from '@/hooks/useFetch';
import { signup } from '@/app/(auth)/actions/login';
import OrbitLoadingButton from '@/components/ui/buttons/orbitLoadingButton/OrbitLoadingButton';
import Image from 'next/image';

const rankOptions = [
    { value: 'TORAI', label: 'טוראי' },
    { value: 'RAV_TORAI', label: 'רב טוראי' },
    { value: 'SAMAL', label: 'סמל' },
    { value: 'SAMAL_RISHON', label: 'סמל ראשון' },
    { value: 'RAV_SAMAL', label: 'רב סמל' },
    { value: 'RAV_SAMAL_MITKADAM', label: 'רב סמל מתקדם' },
    { value: 'RAV_SAMAL_BAKHIR', label: 'רב סמל בכיר' },
    { value: 'RAV_NAGAD_MISNE', label: 'רב נגד משנה' },
    { value: 'RAV_NAGAD', label: 'רב נגד' },
    { value: 'SAGAN', label: 'סגן' },
    { value: 'SEREN', label: 'סרן' },
    { value: 'RAV_SEREN', label: 'רב סרן' },
    { value: 'SAGAN_ALUF', label: 'סגן אלוף' },
    { value: 'ALUF_MISHNE', label: 'אלוף משנה' },
    { value: 'TAT_ALUF', label: 'תת אלוף' },
    { value: 'ALUF', label: 'אלוף' },
    { value: 'RAV_ALUF', label: 'רב אלוף' },
];

const roleOptions = [
    { value: 'הטסה', label: 'הטסה' },
    { value: 'מבצעים', label: 'מבצעים' },
    { value: 'טכני', label: 'טכני' },
    { value: 'אדמין', label: 'אדמין' },
];

export default function UserRegistrationForm() {
    const { data: squadrons} = useFetch('/api/squadrons');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        militaryId: '',
        password: '',
        name: '',
        role: '',
        squadronId: '',
        rank: '',
        profileImage: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage') {
            setFormData((prevData) => ({
                ...prevData,
                profileImage: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        // Client-side validation
        if (!formData.militaryId || !formData.password || !formData.name || !formData.role || !formData.rank || !formData.profileImage) {
            setErrorMessage('אנא מלא את כל השדות הנדרשים.');
            return;
        }
    
        if (formData.password.length < 6) {
            setErrorMessage('הסיסמה חייבת להכיל לפחות 6 תווים.');
            return;
        }
    
        if (formData.role !== 'אדמין' && formData.squadronId === '') {
            setErrorMessage('יש לבחור מספר טייסת עבור משתמש שאינו אדמין.');
            return;
        }
    
        if (formData.role === 'אדמין' && formData.squadronId !== '') {
            setErrorMessage('אדמין אינו משויך לטייסת.');
            return;
        }
    
        try {
            setIsLoading(true);
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
    
            await signup(formDataToSend);
            setSuccessMessage('משתמש נוצר בהצלחה');
        } catch (error) {
            console.error('Error creating user:', error);
            setErrorMessage(error.message || 'אירעה שגיאה ביצירת המשתמש. נסה שוב מאוחר יותר.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.titleBox}>
                <Image
                    src='/create-user.png'
                    width={30}
                    height={30}
                    quality={100}
                    alt="create user"
                />
                <h1 className={styles.formTitle}>יצירת משתמש חדש</h1>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="militaryId" className={styles.label}>מספר אישי</label>
                    <input 
                        type="text" 
                        id="militaryId" 
                        name="militaryId" 
                        value={formData.militaryId} 
                        onChange={handleChange}  
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>סיסמה</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>שם</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="role" className={styles.label}>תפקיד</label>
                    <select 
                        id="role" 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">-- בחר תפקיד --</option>
                        {roleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="squadronId" className={styles.label}>מספר טייסת</label>
                    <select 
                        id="squadronId" 
                        name="squadronId"
                        value={formData.squadronId} 
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value=""> בחר טייסת (אדמין לא בוחר טייסת)</option>
                        {squadrons?.map((squadron) => (
                            <option key={squadron.squadronId} value={squadron.squadronId}>
                                {squadron.squadronId}
                            </option>
                        ))}
                    </select>
                    {formData.role === 'אדמין' && formData.squadronId !== '' && (
                        <p className={styles.adminNote}>אדמין אינו משויך לטייסת*</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="rank" className={styles.label}>דרגה</label>
                    <select 
                        id="rank" 
                        name="rank" 
                        value={formData.rank} 
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">-- בחר דרגה --</option>
                        {rankOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="profileImage" className={styles.label}>תמונת פרופיל</label>
                    <input 
                        type="file" 
                        id="profileImage" 
                        name="profileImage" 
                        accept="image/*"
                        onChange={handleChange}
                        className={styles.fileInput}
                    />
                </div>
                <div className={styles.submitButtonBox}>
                    <OrbitLoadingButton
                        initialText={'צור משתמש'}
                        isLoading={isLoading}
                        loadingText={'יוצר משתמש'}
                        className={styles.submitButton}
                    />
                </div>
            </form>
        </div>
    );
}