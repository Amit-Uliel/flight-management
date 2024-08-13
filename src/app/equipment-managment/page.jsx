import styles from './equipmentManagment.module.css';
import AircraftCard from './equipmentManagementComponents/aircraft/AircraftCard';
import ArmamentCard from './equipmentManagementComponents/armament/ArmamentCard';
import CameraCard from './equipmentManagementComponents/camera/CameraCard';
import StorageInfo from './equipmentManagementComponents/storageInfo/StorageInfo';

export default function EquipmentManagment() {
  return (
    <main>
      <div className={styles.container}>
        <StorageInfo />
        <div className={styles.gridContainer}>
          <div className={styles.addOperations}>
            <AircraftCard operation="add" />
            <ArmamentCard operation="add" />
            <CameraCard operation="add" />
          </div>
          <div className={styles.updateOperations}>
            <AircraftCard operation="update" />
            <ArmamentCard operation="update" />
            <CameraCard operation="update" />
          </div>
          <div className={styles.deleteOperations}>
            <AircraftCard operation="delete" />
            <ArmamentCard operation="delete" />
            <CameraCard operation="delete" />
          </div>
        </div>
      </div>
    </main>
  )
}
