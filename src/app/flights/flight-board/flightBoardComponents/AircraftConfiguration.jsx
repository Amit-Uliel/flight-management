import styles from './styles/flightForm.module.css';

export default function AircraftConfiguration({
    tailNumber,
    setArmamentSelections,
    setCameraSelections,
    armamentTypes,
    cameraTypes,
}) {

    // Handle changes in the armament selection
    const handleArmamentChange = (e) => {
        setArmamentSelections(prevSelections => ({
            ...prevSelections,
            [tailNumber]: {
                ...prevSelections[tailNumber],
                armamentType: e.target.value,
                quantity: prevSelections[tailNumber]?.quantity || 0,
            }
        }));
    };

    // Handle changes in the armament quantity
    const handleQuantityChange = (e) => {
        setArmamentSelections(prevSelections => ({
            ...prevSelections,
            [tailNumber]: {
                ...prevSelections[tailNumber],
                quantity: parseInt(e.target.value, 10),
            }
        }));
    };

    // Handle changes in the camera selection
    const handleCameraChange = (e) => {
        setCameraSelections(prevSelections => ({
        ...prevSelections,
        [tailNumber]: {
            cameraType: e.target.value,
        }
        }));
    };

    return (
        <div className={styles.aircraftConfiguration}>
            <h2>תצורה עבור {tailNumber}</h2>

            <label className={styles.label} htmlFor={`armament-${tailNumber}`}>בחר חימוש</label>
            <select
                className={styles.select}
                id={`armament-${tailNumber}`}
                onChange={handleArmamentChange}
            >
                <option value="">בחר חימוש</option>
                {armamentTypes.map((type) => (
                <option key={type.armamentType} value={type.armamentType}>
                    {type.armamentType}
                </option>
                ))}
            </select>

            <label className={styles.label} htmlFor={`quantity-${tailNumber}`}>כמות</label>
            <input
                className={styles.input}
                type="number"
                id={`quantity-${tailNumber}`}
                min="1"
                onChange={handleQuantityChange}
            />

            <label className={styles.label} htmlFor={`camera-${tailNumber}`}>בחר סוג מצלמה</label>
            <select
                className={styles.select}
                id={`camera-${tailNumber}`}
                onChange={handleCameraChange}
            >
                <option value="">בחר סוג מצלמה</option>
                {cameraTypes.map((type) => (
                <option key={type.cameraType} value={type.cameraType}>
                    {type.cameraType}
                </option>
                ))}
            </select>
        </div>
    );
}