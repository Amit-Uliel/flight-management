// styles
import styles from './flightBoard.module.css';

// components
import Table from '@/app/flight-board/flightBoardComponents/table/Table';
import AddButton from './flightBoardComponents/AddButton.jsx';
import Legend from './flightBoardComponents/Legend';

export default function FlightBoard() {
  const sampleData1 = {
    id: 'MN-1',
    squadron: '161',
    tailNumber: '456',
    missionName: 'search and destroy',
    deliveryDate: '2024-05-02',
    deliveryTime: '09:00',
    devoted: false,
    propulsion: '10:00',
    takeoff: '20:24',
    landed: false,
    landing: '12:00',
    payload: 'Type A',
    armament: 'Bomb',
    notes: 'לעדכן סיום'
  };

  const sampleData2 = {
    id: 'MN-2',
    squadron: '166',
    tailNumber: '789',
    missionName: 'patrol',
    deliveryDate: '2024-05-03',
    deliveryTime: '08:00',
    devoted: false,
    propulsion: '09:30',
    takeoff: '10:00',
    landed: false,
    landing: '11:00',
    payload: 'Type B',
    armament: 'None',
    notes: 'לבדוק דלק לפני טיסה'
  };

  const data = [sampleData1, sampleData2];

  return (
    <main className={styles.main}>
      <div className={styles.container}> 
        <Legend />
        <AddButton />   
        <Table data={data} />
      </div>
    </main>
  )
}
