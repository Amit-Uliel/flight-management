import styles from './table.module.css'

export default function Table() {
  return (
    <div className={styles.tableWrapper}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.th}>#</th>
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
                <tr className={styles.tr}>
                    <td className={styles.tdNumber}>1</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.tdNumber}>2</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.tdNumber}>3</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                </tr>
                <tr className={styles.tr}>
                    <td className={styles.tdNumber}>4</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                    <td className={styles.td}>xxx</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
