import styles from '../../../../styles/tableCell.module.css';

// font awasome icon import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

export default function IdCell({ id, hovered, onClick }) {
  return (
    <td className={styles.td}>
        {hovered ? (
            <>
                <span className={styles.id}>{id}</span>
                <div className={styles.iconWrapper}>
                    <FontAwesomeIcon onClick={onClick} className={styles.icon} icon={faPenSquare} />
                </div>
                {!onClick && <span className={styles.tooltip}>בטלו את מסור כדי לערוך</span>}
            </>
        )
        : (id)}
    </td>
  )
}
