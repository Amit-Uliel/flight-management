import Card from '../Card/Card';
import AddCameraForm from './AddCameraForm';
import DeleteCameraForm from './DeleteCameraForm';
import UpdateCameraForm from './UpdateCameraForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/warningIcons.module.css';

export default function CameraCard({ operation }) {
  const renderForm = () => {
    switch (operation) {
      case 'add':
        return <AddCameraForm />;
      case 'update':
        return <UpdateCameraForm />;
      case 'delete':
        return <DeleteCameraForm />;
      default:
        return null;
    }
  };

  // Map operations to their corresponding Hebrew titles
  const operationTitles = {
    add: 'הוספת מצלמה',
    update: 'עדכון מלאי מצלמה',
    delete: 'מחיקת מצלמה',
  };

  // Get the title based on the operation, or use a default title if the operation is not recognized
  const title = operationTitles[operation] || 'פעולה לא ידועה';

  return (
    <Card title={title} icon={faCamera}>
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