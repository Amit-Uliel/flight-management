"use client";

import { useState } from "react";

export default function EditForm({ formData }) {
    const [squadron, setSquadron] = useState(rowData.squadron);
    const [tailNumber, setTailNumber] = useState(rowData.tailNumber);
    const [missionName, setMissionName] = useState(rowData.missionName);
    const [deliveryDate, setDeliveryDate] = useState(rowData.deliveryDate);
    const [deliveryTime, setDeliveryTime] = useState(rowData.deliveryTime);
    const [propulsion, setPropulsion] = useState(rowData.propulsion);
    const [takeoff, setTakeoff] = useState(rowData.takeoff);
    const [landing, setLanding] = useState(rowData.landing);
    const [payload, setPayload] = useState(rowData.payload);
    const [armament, setArmament] = useState(rowData.armament);
    const [notes, setNotes] = useState(rowData.notes);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Squadron:
                <input type="text" value={squadron} onChange={(e) => setSquadron(e.target.value)} />
            </label>
            <label>
                Tail Number:
                <input type="text" value={tailNumber} onChange={(e) => setTailNumber(e.target.value)} />
            </label>
            <label>
                Mission Name:
                <input type="text" value={missionName} onChange={(e) => setMissionName(e.target.value)} />
            </label>
            <label>
                Delivery Date:
                <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            </label>
            <label>
                Delivery Time:
                <input type="time" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
            </label>
            <label>
                Propulsion:
                <input type="text" value={propulsion} onChange={(e) => setPropulsion(e.target.value)} />
            </label>
            <label>
                Takeoff:
                <input type="text" value={takeoff} onChange={(e) => setTakeoff(e.target.value)} />
            </label>
            <label>
                Landing:
                <input type="text" value={landing} onChange={(e) => setLanding(e.target.value)} />
            </label>
            <label>
                Payload:
                <input type="text" value={payload} onChange={(e) => setPayload(e.target.value)} />
            </label>
            <label>
                Armament:
                <input type="text" value={armament} onChange={(e) => setArmament(e.target.value)} />
            </label>
            <label>
                Notes:
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}
