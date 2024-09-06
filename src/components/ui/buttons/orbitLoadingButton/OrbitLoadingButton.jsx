import styles from './OrbitLoadingButton.module.css';

// loading button
export default function OrbitLoadingButton({ className, initialText, isLoading, loadingText }) {
  return (
    <button className={`${styles.button} ${className}`} type="submit" disabled={isLoading}>
      {isLoading ? (
        <>
            <div className={styles.chaoticOrbit}></div>
            <span>{loadingText}</span>
        </>
      ) : (
        <span>{initialText}</span>
      )}
    </button>
  )
}
