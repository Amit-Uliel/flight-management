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

export default function AircraftSelectionTable({ selectedAircrafts, setSelectedAircrafts, setCameraSelections, setArmamentSelections, availableAircraft }) {

    const [showNoAircraftMessage, setShowNoAircraftMessage] = useState(false);

    useEffect(() => {
        if (availableAircraft.length === 0) {
            const timer = setTimeout(() => {
                setShowNoAircraftMessage(true);
            }, 3000);

            // Cleanup the timer if the component unmounts or availableAircraft changes
            return () => clearTimeout(timer);
        } else {
            setShowNoAircraftMessage(false);
        }
    }, [availableAircraft]);

    const handleCheckboxChange = (tailNumber) => {
        setSelectedAircrafts(prevSelected => {
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
            {showNoAircraftMessage 
                ? // there are no available aircrafts
                <p className={`${styles.error} ${styles.table}`}>אין מטוסים זמינים</p>
                : // there are available aircrafts
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
                                        checked={selectedAircrafts.includes(aircraft.tailNumber)}
                                        onChange={() => handleCheckboxChange(aircraft.tailNumber)}
                                    />
                                </td>
                                <td>{aircraft.tailNumber}</td>
                                <td>{translateAircraftModel(aircraft.model)}</td>
                                <td>{aircraft.weight} ק&quot;ג</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}