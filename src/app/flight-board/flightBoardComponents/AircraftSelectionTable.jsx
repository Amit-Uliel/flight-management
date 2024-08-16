"use client";

import { useState, useEffect } from "react";
import styles from './styles/flightForm.module.css';

// Translation function for aircraft models
const translateAircraftModel = (model) => {
    const translations = {
      HERMES_450: 'הרמס 450',
      HERMES_900: 'הרמס 900',
      HERMES_1000: 'הרמס 1000',
    };
    return translations[model] || model;
};

export default function AircraftSelectionTable({ selectedAircraft, setSelectedAircraft, setCameraSelections, setArmamentSelections }) {
    const [availableAircraft, setAvailableAircraft] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailableAircraft = async () => {
            try {
                const response = await fetch('/api/aircrafts/available');
                const data = await response.json();
                setAvailableAircraft(data);
            } catch (error) {
                setError('בעיה ביבוא מטוסים זמינים');
            }
        };

        fetchAvailableAircraft();
    }, []);

    const handleCheckboxChange = (tailNumber) => {
        setSelectedAircraft(prevSelected => {
            if (prevSelected.includes(tailNumber)) {
                // Deselect: Remove from selectedAircraft and from selections
                setArmamentSelections(prev => {
                    const updated = Object.fromEntries(
                        Object.entries(prev).filter(([key]) => key !== tailNumber)
                    );
                    return updated;
                });

                setCameraSelections(prev => {
                    const updated = Object.fromEntries(
                        Object.entries(prev).filter(([key]) => key !== tailNumber)
                    );
                    return updated;
                });

                return prevSelected.filter(num => num !== tailNumber);
            } else {
                // Select: Add to selectedAircraft
                return [...prevSelected, tailNumber];
            }
        });
    };

    return (
        <div>
            <label className={styles.label}>בחר מטוסים</label>
            {error && <p className={styles.error}>{error}</p>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>מספר זנב</th>
                        <th>דגם</th>
                        <th>משקל</th>
                    </tr>
                </thead>
                <tbody>
                    {availableAircraft.map((aircraft) => (
                        <tr key={aircraft.tailNumber}>
                            <td>
                                <input
                                    type="checkbox"
                                    value={aircraft.tailNumber}
                                    checked={selectedAircraft.includes(aircraft.tailNumber)}
                                    onChange={() => handleCheckboxChange(aircraft.tailNumber)}
                                />
                            </td>
                            <td>{aircraft.tailNumber}</td>
                            <td>{translateAircraftModel(aircraft.model)}</td>
                            <td>{aircraft.weight} ק"ג</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}