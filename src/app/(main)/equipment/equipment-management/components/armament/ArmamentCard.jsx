import Card from '../card/Card';
import AddArmamentForm from './AddArmamentForm';
import UpdateArmamentForm from './UpdateArmamentForm';
import DeleteArmamentForm from './DeleteArmamentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/warningIcons.module.css';

export default function ArmamentCard({ operation }) {
    const renderForm = () => {
        switch (operation) {
            case 'add':
                return <AddArmamentForm />;
            case 'update':
                return <UpdateArmamentForm />;
            case 'delete':
                return <DeleteArmamentForm />;
            default:
                return null;
        }
    };

    // Map operations to their corresponding Hebrew titles
    const operationTitles = {
        add: 'הוספת חימוש',
        update: 'עדכון מלאי חימוש',
        delete: 'מחיקת חימוש',
    };

    const title = operationTitles[operation] || 'פעולה לא ידועה';

    return (
        <Card title={title} icon={faBoxesStacked}>
            {operation === 'delete' && (
                <div className={styles.warnignContainer}>
                    <div className={styles.circle}></div>
                    <FontAwesomeIcon className={styles.triangleExclamation} icon={faTriangleExclamation} />
                </div>
            )}
            {renderForm()}
        </Card>
    );
}