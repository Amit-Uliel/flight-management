import styles from './table.module.css'
import TableRow from './tableRow/TableRow'

export default function Table({ data }) {

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>מספר זיהוי</th>
                        <th className={styles.th}>טייסת</th>
                        <th className={styles.th}>מספר זנב</th>
                        <th className={styles.th}>שם משימה</th>
                        <th className={styles.th}>תאריך מסירה</th>
                        <th className={styles.th}>שעת מסירה</th>
                        <th className={styles.th}>מסור</th>
                        <th className={styles.th}>הנעה</th>
                        <th className={styles.th}>המראה</th>
                        <th className={styles.th}>נחת</th>
                        <th className={styles.th}>נחיתה</th>
                        <th className={styles.th}>מטעד</th>
                        <th className={styles.th}>חימוש</th>
                        <th className={styles.th}>הערות</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {/* i think i will use map to after i fetch all
                        the data i need from the db. i will also add
                        a deletion function to every row. also an edit */}
                    {data.map((row) => (
                        <TableRow key={row.id} rowData={row} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
