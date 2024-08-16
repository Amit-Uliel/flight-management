import styles from '../../../styles/tableCell.module.css';
import IdCell from './cells/IdCell';
import CheckboxCell from './cells/CheckboxCell';

function TableCell({ children, type, onClick, onChange, checked, hovered, rowId }) {
    
    switch (type) {
        case 'checkbox':
            return <CheckboxCell onChange={onChange} checked={checked} />;
        case 'id':
            return <IdCell id={rowId} hovered={hovered} onClick={onClick} />;
        default:
            return <td className={styles.td}>{children}</td>;
    }
}

export default TableCell