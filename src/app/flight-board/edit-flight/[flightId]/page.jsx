
// css
import styles from './edit.module.css';

// components
import EditForm from '../../flightBoardComponents/editForm/EditForm';

export default function Edit({ params, rowData }) {
  return (
    <main>
      <h1>Edit {params.flightId}</h1>
      <EditForm formData={rowData} />
    </main>
  )
}
