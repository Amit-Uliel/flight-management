import ArmamentTable from './components/ArmamentTable';
import CameraTable from './components/CameraTable';
import AircraftTable from './components/AircraftTable';
import styles from './styles/EquipmentStorage.module.css';

export default function EquipmentStorage() {
    return (
        <div className={styles.storagePage}>
            <h1 className={styles.title}>מלאי ציוד</h1>
            <ArmamentTable />
            <CameraTable />
            <AircraftTable />
        </div>
    );
}
