import styles from './historyCard.module.css';

export default function HistoryCard({ flight }) {

    const labels = [
        "מספר טיסה",
        "טייסת",
        "מספר זנב",
        "שם משימה",
        "תאריך מסירה",
        "שעת מסירה",
        "הנעה",
        "המראה",
        "נחיתה",
        "מטעד",
        "חימוש",
        "הערות"
    ];

    const values = [
        flight.flightNumber,
        flight.squadron,
        flight.tailNumber,
        flight.missionName,
        flight.deliveryDate,
        flight.deliveryTime,
        flight.propulsion,
        flight.takeoff,
        flight.landing,
        flight.payload,
        flight.armament,
        flight.notes
    ];

  return (
    <div className={styles.container}>
        <h3 className={styles.title}>מספר טיסה</h3>
        {labels.map((label, index) => (
            <div className={styles.item} key={index}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{values[index]}</span>
            </div>
        ))}
    </div>
  )
}

