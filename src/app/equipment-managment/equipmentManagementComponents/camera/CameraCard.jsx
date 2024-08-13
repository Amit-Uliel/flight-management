import Card from '../Card/Card';
import AddCameraForm from './AddCameraForm';
import DeleteCameraForm from './DeleteCameraForm';
import UpdateCameraForm from './UpdateCameraForm';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

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
    update: 'עדכון מצלמה',
    delete: 'מחיקת מצלמה',
  };

  // Get the title based on the operation, or use a default title if the operation is not recognized
  const title = operationTitles[operation] || 'פעולה לא ידועה';

  return (
    <Card title={title} icon={faCamera}>
      {renderForm()}
    </Card>
  );
}