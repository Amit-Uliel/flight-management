"use client"

// hooks
import { useState } from 'react';

// date formatter
import { format } from 'date-fns';

// styles import
import styles from './formRegisterFlight.module.css';
import Input from './input/Input';

export default function FormRegisterFlight() {

  const initialDeliveryDate = new Date(); // Initialize with current date and time
  const initialDeliveryTime = ''; // Initialize with an empty string

  // Format delivery date to Israel date format (dd/mm/yyyy)
  const formattedDeliveryDate = format(initialDeliveryDate, 'dd/MM/yyyy');

  // Format delivery time to Israel 24-hour clock format (HH:mm)
  const formattedDeliveryTime = format(initialDeliveryDate, 'HH:mm');

  const [formData, setFormData] = useState({
    squadron: {
      name: 'טייסת',
      input: '',
    },
    tailNumber: {
      name: 'מספר זנב',
      input: '',
    },
    missionName: {
      name: 'שם משימה',
      input: '',
    },
    deliveryDate: {
      name: 'תאריך מסירה',
      input: '',
      type: 'datePickerInput',
    },
    deliveryTime: {
      name: 'שעת מסירה',
      input: {hours: '', minutes: ''},
      type: 'timeInput',
    },
    takeoff: {
      name: 'המראה',
      input: {hours: '', minutes: ''},
      type: 'timeInput',
    },
    payload: {
      name: 'מטעד',
      input: '',
      type: 'selectInput',
    },
    armament: {
      name: 'חימוש',
      input: '',
    },
    notes: {
      name: 'הערות',
      input: '',
      type: 'textAreaInput',
    },
  });

  // handle changes on inputs except the datepicker
  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        input: value,
      },
    });
  };

  // handle datepicker change
  const handleDateChange = (selectedDate) => {
    const name = 'deliveryDate';
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        input: selectedDate,
      },
    }));
  };

  // add the new flight to db and to the flight board**
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can perform further actions here, like sending the data to a server
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputsWrapper}>
          {Object.entries(formData).map(([key, value]) => (
            <Input 
              key={key} 
              type={value.type}
              value={value.input}
              label={value.name}
              name={key}
              onChange={value.type === 'datePickerInput' ? handleDateChange : handleChange}
            />
          ))}
        </div>
        
        <button type="submit" className={styles.button}>הוספה</button>
      </form>
    </div>
  )
}

