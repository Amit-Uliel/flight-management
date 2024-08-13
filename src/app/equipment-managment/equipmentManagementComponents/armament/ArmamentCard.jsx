import Card from '../Card/Card';
import AddArmamentForm from './AddArmamentForm';
import UpdateArmamentForm from './UpdateArmamentForm';
import DeleteArmamentForm from './DeleteArmamentForm';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons';

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
        update: 'עדכון חימוש',
        delete: 'מחיקת חימוש',
    };

    const title = operationTitles[operation] || 'פעולה לא ידועה';

    return (
        <Card title={title} icon={faBoxesStacked}>
            {renderForm()}
        </Card>
    );
}