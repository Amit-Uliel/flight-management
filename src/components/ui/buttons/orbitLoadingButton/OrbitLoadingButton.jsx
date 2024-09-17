import Image from 'next/image';
import styles from './OrbitLoadingButton.module.css';

// loading button
export default function OrbitLoadingButton({ className, initialText, isLoading, loadingText, icon }) {
  return (
    <button className={`${styles.button} ${className}`} type="submit" disabled={isLoading}>
      {isLoading ? (
        <>
          <div className={styles.chaoticOrbit}></div>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{initialText}</span>
          {icon && <Image src={icon} alt='icon' className={styles.icon} quality={100} width={35} height={35} />}
        </>
      )}
    </button>
  )
}
