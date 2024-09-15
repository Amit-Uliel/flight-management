import Card from '../card/Card';
import AddAircraftForm from './AddAircraftForm';
import UpdateAircraftForm from './UpdateAircraftForm';
import DeleteAircraftForm from './DeleteAircraftForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/warningIcons.module.css';

export default function AircraftCard({ operation }) {
  const renderForm = () => {
    switch (operation) {
      case 'add':
        return <AddAircraftForm />;
      case 'update':
        return <UpdateAircraftForm />;
      case 'delete':
        return <DeleteAircraftForm />;
      default:
        return null;
    }
  };

  // Map operations to their corresponding Hebrew titles
  const operationTitles = {
    add: 'הוספת מטוס',
    update: 'עדכון מטוס',
    delete: 'מחיקת מטוס',
  };

  // Get the title based on the operation, or use a default title if the operation is not recognized
  const title = operationTitles[operation] || 'פעולה לא ידועה';

  return (
    <Card title={title} icon={faPlane}>
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