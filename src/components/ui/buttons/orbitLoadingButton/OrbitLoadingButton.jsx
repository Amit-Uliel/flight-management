import styles from './OrbitLoadingButton.module.css';

// loading button
export default function OrbitLoadingButton({ initialText, isLoading, loadingText, style = {} }) {
  return (
    <button className={styles.button} style={style} type="submit" disabled={isLoading}>
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
