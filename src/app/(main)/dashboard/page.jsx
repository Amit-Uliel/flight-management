import styles from './styles/dashboard.module.css';
import Card from './components/Card';
import MissionStatusPieChart from './components/MissionStatusPieChart';
import AssignmentTrendLineChart from './components/AssignmentTrendLineChart';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Card title="סטטוסי משימות">
        <MissionStatusPieChart />
      </Card>
      {/* <Card title="Assignment Trend Over Last 3 Months">
        <AssignmentTrendLineChart />
      </Card> */}
    </div>
  )
}